using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace UserApi.Models
{
    public class Products
    {
        [Key]

        public int Products_id { get; set; }

        public String Category_id_ref { get; set; }

        public String Products_name { get; set; }

        public int Products_price { get; set; }

        public String Products_desc { get; set; }

        public String Products_cover { get; set; }

    }
}
