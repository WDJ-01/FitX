using Microsoft.EntityFrameworkCore;
using UserApi.Models;

namespace UserApi.Data
{
    public class FavoritesDbContext : DbContext
    {
        public FavoritesDbContext(DbContextOptions<FavoritesDbContext> options) : base(options)
        {
        }

        public DbSet<Favorites> Favorites { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Favorites>().ToTable(" Favorites");


        }
    }
}
