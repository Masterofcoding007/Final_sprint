using System;
using System.Collections.Generic;

namespace DigitalBooksWebAPI.Models
{
    public partial class Book
    {
        public int BookId { get; set; }
        public string BookName { get; set; } = null!;
        public int CategoryId { get; set; }
        public decimal Price { get; set; }
        public string Publisher { get; set; } = null!;
        public int UserId { get; set; }
        public DateTime PublishedDate { get; set; }
        public string Content { get; set; } = null!;
        public bool Active { get; set; }
        public DateTime CreatedDate { get; set; }
        public int Createdby { get; set; }
        public DateTime ModifiedDate { get; set; }
        public int Modifiedby { get; set; }
    }
}
