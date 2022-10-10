using System;
using System.Collections.Generic;

namespace DigitalBooksWebAPI.Models
{
    public partial class Purchase
    {
        public int PurchaseId { get; set; }
        public string EmailId { get; set; } = null!;
        public int BookId { get; set; }
        public DateTime PurchaseDate { get; set; }
        public string PaymentMode { get; set; } = null!;
    }
}
