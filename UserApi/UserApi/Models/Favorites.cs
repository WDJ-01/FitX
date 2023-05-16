using System.ComponentModel.DataAnnotations;

namespace UserApi.Models
{
    public class Favorites
    {

        [Key]

        public int Favorites_id { get; set; }
        public string Favorites_products { get; set; }
        public string? Favorites_username { get; set; }
    }
}
