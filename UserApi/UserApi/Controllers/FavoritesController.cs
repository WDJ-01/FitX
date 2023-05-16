using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UserApi.Data;
using UserApi.Models;

namespace UserApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritesController : ControllerBase
    {
        private readonly FavoritesDbContext _context;
        public FavoritesController(FavoritesDbContext favoritesDbContext)
        {
            _context = favoritesDbContext;
        }


        /*[HttpPost("CreateFavorites")]
        //create initial favorites on sign up
        public IActionResult CreateFavorites()
        {
            var userdetails = _context.Users.AsQueryable();
            return Ok(userdetails);
        }*/

        //use in signup - loginController
        private Task<Favorites> CreateFavorites(string username)
        {
            var favorites = new Favorites();

            List<string> fav = new List<string>() ;
            string jsonFavorites = JsonConvert.SerializeObject(fav);

            favorites.Favorites_products = jsonFavorites;
            favorites.Favorites_username = username;

             _context.Favorites.AddAsync(favorites);
             _context.SaveChangesAsync();

            return Task.FromResult(favorites);

        }



    }
}
