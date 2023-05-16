using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace UserApi.Models
{
    public class Products
    {
        [Key]

        public int Products_id { get; set; }

        [JsonProperty("Category_id_ref")]
        public String Category_id_ref { get; set; }

        [JsonProperty("Products_name")]
        public String Products_name { get; set; }

        public int Products_price { get; set; }

        [JsonProperty("Products_desc")]
        public String Products_desc { get; set; }

        [JsonProperty("Products_cover")]
        public String Products_cover { get; set; }

    }
}
