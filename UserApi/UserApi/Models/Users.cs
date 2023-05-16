using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;



namespace UserApi.Models
{
    public class Users
    {
        [Key]

        public int User_id { get; set; }
        public string User_username { get; set; }
        public string? User_firstname { get; set; }
        public string? User_lastname { get; set; }
        public string? User_email { get; set; }
        public string? User_mobile { get; set; }
        public string? User_phone { get; set; }
        public string? User_address { get; set; }
        public string User_password { get; set; }
        public int? User_cart_id { get; set; }
        public int? User_favorites_id { get; set; }
        public string? User_token { get; set; }
        public byte[]? User_password_salt { get; set;}



    }
}
