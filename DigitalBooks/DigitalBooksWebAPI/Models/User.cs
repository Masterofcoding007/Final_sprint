using System;
using System.Collections.Generic;

namespace DigitalBooksWebAPI.Models
{
    public partial class User
    {
        public int UserId { get; set; }
        public string UserName { get; set; } = null!;
        public string EmailId { get; set; } = null!;
        public string Password { get; set; } = null!;
        public int RoleId { get; set; }
        public bool Active { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;



    }
}
