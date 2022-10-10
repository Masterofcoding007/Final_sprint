using System.ComponentModel.DataAnnotations;

namespace DigitalBooksWebAPI.Models
{
    public class UserValidationRequestModel
    {
        [Required] 
        public string UserName { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
