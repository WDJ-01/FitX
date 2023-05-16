using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics.Metrics;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using System.Text;
using UserApi.Data;
using UserApi.Helper;
using UserApi.Models;
using static UserApi.Helper.HashingPassword;

namespace UserApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly UserDbContext _context;
        public LoginController(UserDbContext userDbContext)
        {
            _context = userDbContext;
        }
        [HttpGet("users")]
        public IActionResult GetUsers()
        {
            var userdetails = _context.Users.AsQueryable();
            return Ok(userdetails);
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] Users userObj)
        {
            if (userObj == null)
            {
                return BadRequest();
            }
            if (await CheckIfUsernameExist(userObj.User_username))
            {
                return BadRequest(new { Message = "Username already exist!" });
            }
            if (await CheckIfEmailExist(userObj.User_email))
            {
                return BadRequest(new { Message = "Email already Registered!" });
            }
            else
            {
                var Hash_Salt = HashingPassword.Method(userObj.User_password);
                userObj.User_password = Hash_Salt.HashValue;
                userObj.User_password_salt = Hash_Salt.SaltValue;
                await _context.Users.AddAsync(userObj);
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    StatusCode = 200,
                    Message = "User Added Successfully"
                });

            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Users userObj)
        {
            if (userObj == null)
            {
                return BadRequest();
            }

            var user = await _context.Users.FirstOrDefaultAsync(a => a.User_username == userObj.User_username);
            if (user == null)

                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "User Not Found",
                });


            if (!HashingPassword.VerifyPassword(userObj.User_password, user.User_password, user.User_password_salt))
            {
                return BadRequest(new { Message = "Password is Incorrect" });
            }

            user.User_token = CreatetJwt(user);


            var existingUser = await _context.Users.FirstOrDefaultAsync(a => a.User_username == userObj.User_username);
            existingUser.User_token = user.User_token;
            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Login Successful",
                Token = user.User_token

            });


        }

        [Authorize]
        [HttpGet("getUserInfo")]
        public IActionResult GetAllProducts([FromHeader] string authorization)
        {

            /*var re = Request;
            var headers = re.Headers;
            string token;

            if (Request.Headers.ContainsKey("authorization"))
            {
                 token = Request.Headers.TryGetValue("authorization", out var headerValue);
            }
            return null;*/
            var auth = authorization.Remove(0, 7);

            var user = _context.Users.FirstOrDefaultAsync(a => a.User_token == auth);



            //return Ok(await _context.Users.ToListAsync());
            // return Ok(Authorization);
            return Ok(new

            {   userinfo = user.Result,
                Message = "api works",
                token = auth
            });


        }

        [Authorize]
        [HttpPut("updateUserInfo")]
        public async Task<IActionResult> UpdateUserInfo([FromBody] EditUser userObj, [FromHeader] string authorization)
        {
            if (userObj == null)
            {
                return BadRequest();
            }
            var auth = authorization.Remove(0, 7);

            var user = await _context.Users.FirstOrDefaultAsync(a => a.User_token == auth);
            if (user == null)

                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "User Not Found",
                });

            user.User_firstname = userObj.User_firstname;
            user.User_lastname = userObj.User_lastname;
            user.User_username = userObj.User_username;
            user.User_email = userObj.User_email;
            user.User_mobile = userObj.User_mobile;
            user.User_phone = userObj.User_phone;
            user.User_address = userObj.User_address;



            await _context.SaveChangesAsync();

            return Ok(new
            {
                Message = "Update Successful",

            });


        }

        [Authorize]
        [HttpPut("changePassword")]
        public async Task<IActionResult> changePassword([FromBody] Password passwordObj, [FromHeader] string authorization)
        {

            if (passwordObj == null)
            {
                return BadRequest();
            }

            var auth = authorization.Remove(0, 7);

            var user = await _context.Users.FirstOrDefaultAsync(a => a.User_token == auth);

            if (user == null)

                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "User Not Found",
                });

            if (!HashingPassword.VerifyPassword(passwordObj.User_currentPassword, user.User_password, user.User_password_salt))
            {
                return BadRequest(new { Message = "Current Password is Incorrect" });
            }

            if(!passwordObj.User_newPassword.Equals( passwordObj.User_confirmNewPassword))
            {
                return BadRequest(new
                {
                    Message = "Confirm new passsword",

                });
            }
            var Hash_Salt = HashingPassword.Method(passwordObj.User_newPassword);
            user.User_password = Hash_Salt.HashValue;
            user.User_password_salt = Hash_Salt.SaltValue;
            await _context.SaveChangesAsync();

            return Ok(new
            {
                StatusCode = 200,
                Message = "Password Changed Successfully"
            });


        }












        private Task<bool> CheckIfUsernameExist(string username)
            => _context.Users.AnyAsync(user => user.User_username == username);
        private Task<bool> CheckIfEmailExist(string email)
            => _context.Users.AnyAsync(user => user.User_email == email);

        private string CreatetJwt(Users user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("security...token");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name , user.User_firstname),
                new Claim(ClaimTypes.Surname , user.User_lastname),
                new Claim(ClaimTypes.GivenName , user.User_username),
                new Claim(ClaimTypes.Email , user.User_email),

            });
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);


            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddMonths(1),
                SigningCredentials = credentials
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);

        }
    }
}
