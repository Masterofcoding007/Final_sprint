using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DigitalBooksWebAPI.Models;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using DigitalBooksWebAPI.Services;
using Polly;

namespace DigitalBooksWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchasesController : ControllerBase
    {
        private readonly DigitalBooksContext _context;

        public PurchasesController(DigitalBooksContext context)
        {
            _context = context;
        }

        // GET: api/Purchases
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Purchase>>> GetPurchases()
        {
          if (_context.Purchases == null)
          {
              return NotFound();
          }
            return await _context.Purchases.ToListAsync();
        }

        // GET: api/Purchases/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Purchase>> GetPurchase(int id)
        {
          if (_context.Purchases == null)
          {
              return NotFound();
          }
            var purchase = await _context.Purchases.FindAsync(id);

            if (purchase == null)
            {
                return NotFound();
            }

            return purchase;
        }

        [HttpGet("BookHistory/{emailId}")]
        public List<Purchase> GetPurchaseData(string emailId)
        {
            var purchases =  _context.Purchases.Where(p=> p.EmailId==emailId).ToList();
            return purchases;
        }

        

        // PUT: api/Purchases/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPurchase(int id, Purchase purchase)
        {
            if (id != purchase.PurchaseId)
            {
                return BadRequest();
            }

            _context.Entry(purchase).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PurchaseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Purchases
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Purchase>> PostPurchase(Purchase purchase)
        {
          if (_context.Purchases == null)
          {
              return Problem("Entity set 'DigitalBooksContext.Purchases'  is null.");
          }
            var purchasesList = await _context.Purchases.ToListAsync();
            var purchaseId = 1;
            if (_context.Purchases.Count() != 0)
                purchaseId = purchasesList.Max(x => x.PurchaseId) + 1 ;
            purchase.PurchaseDate = DateTime.Now;
            purchase.PurchaseId = purchaseId;
            _context.Purchases.Add(purchase);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PurchaseExists(purchase.PurchaseId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPurchase", new { id = purchase.PurchaseId }, purchase);
        }

        // DELETE: api/Purchases/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePurchase(int id)
        {
            if (_context.Purchases == null)
            {
                return NotFound();
            }
            var purchase = await _context.Purchases.FindAsync(id);
            if (purchase == null)
            {
                return NotFound();
            }

            _context.Purchases.Remove(purchase);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Get purchased book history
        [HttpGet]
        [Route("GetPurchasedBookHistory")]
        public List<BookHistoryViewModel> GetPurchasedBookHistory(string emailId)
        {
            List<BookHistoryViewModel> lsBookHistory = new List<BookHistoryViewModel>();
            if (_context.Purchases == null)
            {
                return lsBookHistory;
            }

            lsBookHistory = (from book in _context.Books
                             join user in _context.Users
                             on book.UserId equals user.UserId
                             join category in _context.Categories
                             on book.CategoryId equals category.CategoryId
                             join purchase in _context.Purchases
                  on book.BookId equals purchase.BookId
                  into BookPurchaseGroup
                             from pur in BookPurchaseGroup.DefaultIfEmpty()
                             select new
                             {
                                 BookId = book.BookId,
                                 Title = book.BookName,
                                 Author = user.UserName,
                                 Publisher = book.Publisher,
                                 Price = book.Price,
                                 PublishedDate = book.PublishedDate,
                                 CategoryName = category.CategoryName,
                                 //EmailId = user.EmailId
                             }).ToList()
            .Select(x => new BookHistoryViewModel()
            {
                BookId= x.BookId,
                Title = x.Title,
                Author = x.Author,
                Publisher = x.Publisher,
                Price = Convert.ToDouble(x.Price),
                PublishedDate = x.PublishedDate,
                CategoryName = x.CategoryName,
                //EmailId = x.EmailId
            }).ToList();
            var historyRecord = new List<BookHistoryViewModel>();
            var purchaseHistoryBooks = _context.Purchases.Where(p => p.EmailId == emailId).ToList();
            foreach (var purchase in purchaseHistoryBooks)
            {
                if (historyRecord.Count == 0 || historyRecord.Any(hr => hr.BookId != purchase.BookId))
                {
                    var bookHistory = lsBookHistory.FirstOrDefault(x => x.BookId == purchase.BookId);
                    if (bookHistory != null)
                        historyRecord.Add(bookHistory);
                }
                
            }
            lsBookHistory= historyRecord.Distinct().ToList();
            return lsBookHistory.Distinct().ToList();
        }
        // Get All Books With Status Purchase or not
        [HttpGet]
        [Route("GetBooksWithStatus")]
        public List<BookMasterViewModel> GetBooksWithStatus(string emailId)
        {
            List<BookMasterViewModel> lsBookHistory = new List<BookMasterViewModel>();
            if (_context.Purchases == null)
            {
                return lsBookHistory;
            }


            lsBookHistory = (from book in _context.Books
                             join user in _context.Users
                             on book.UserId equals user.UserId
                             join category in _context.Categories
                             on book.CategoryId equals category.CategoryId
                             join purchase in _context.Purchases
                  on book.BookId equals purchase.BookId

                  into BookPurchaseGroup 
                             from pur in BookPurchaseGroup.DefaultIfEmpty()
                             select new
                             {
                                 purchaseId = pur.PurchaseId == null ? 0 : pur.PurchaseId,
                                 bookId = book.BookId,
                                 Title = book.BookName,
                                 //Author = user.FirstName + " " + user.LastName,
                                 Publisher = book.Publisher,
                                 Price = book.Price,
                                 PublishedDate = book.PublishedDate,
                                 CategoryName = category.CategoryName,
                                 
                                 Email = (pur.EmailId == null || pur.EmailId != emailId) ? "NA" : pur.EmailId,
                                 BookContent = book.Content,
                                 //Active = book.Active
                             }).ToList()
            .Select(x => new BookMasterViewModel()
            {
                BookId = x.bookId,
                Title = x.Title,
                //Author = x.Author,
                Publisher = x.Publisher,
                Price = Convert.ToDouble(x.Price),
                PublishedDate = x.PublishedDate,
                CategoryName = x.CategoryName,
                Email = x.Email,
                BookContent = x.BookContent,
                //Active = x.Active
            }).ToList();


            lsBookHistory.RemoveAll(lb => lb.Active == false);
            lsBookHistory = lsBookHistory.Where(x => x.Email == emailId || x.Email == "NA").ToList().Distinct().ToList();
            lsBookHistory = lsBookHistory.GroupBy(x => x.BookId).Select(y => y.First()).ToList();
            
            return lsBookHistory;
        }

        private bool PurchaseExists(int id)
        {
            return (_context.Purchases?.Any(e => e.PurchaseId == id)).GetValueOrDefault();
        }
    }
}
