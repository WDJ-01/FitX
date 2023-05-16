using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using UserApi.Data;
using UserApi.Models;

namespace UserApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductsDbContext _context;
        public ProductsController(ProductsDbContext productsDbContext)
        {
            _context = productsDbContext;
        }
        [HttpGet("products")]
        /*public IActionResult GetProducts()
        {
            var products = _context.Products.AsQueryable();
            return Ok(products);
        }
        */
        public async Task<ActionResult<Products>> GetAllProducts()
        {
            return Ok(await _context.Products.ToListAsync());


        }
    }
}
