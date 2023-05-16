using System.ComponentModel.DataAnnotations;

namespace UserApi.Models
{
    public class EditUser
    {
        [Key]

        public string User_username { get; set; }
        public string User_firstname { get; set; }
        public string User_lastname { get; set; }
        public string User_email { get; set; }
        public string User_mobile { get; set; }
        public string User_phone { get; set; }
        public string User_address { get; set; }

    }
}
