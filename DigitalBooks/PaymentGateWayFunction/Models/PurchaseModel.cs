using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PaymentGateWayFunction.Models
{
    public class PurchaseModel
    {
        public string EmailId { get; set; } = null!;
        public int BookId { get; set; }
        public string PaymentMode { get; set; } = null!;
    }
}
