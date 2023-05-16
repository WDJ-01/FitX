using System.ComponentModel.DataAnnotations;

namespace UserApi.Models
{
    public class Password
    {
        [Key]

        public string User_currentPassword  { get; set; }
        public string User_newPassword { get; set; }
        public string User_confirmNewPassword { get; set; }


    }
}
