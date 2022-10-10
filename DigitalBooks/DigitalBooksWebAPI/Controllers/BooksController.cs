using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DigitalBooksWebAPI.Models;
using DigitalBooksWebAPI.Services;
using Microsoft.AspNetCore.Authorization;

namespace DigitalBooksWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly DigitalBooksContext _context;

        public BooksController(DigitalBooksContext context)
        {
            _context = context;
        }

        // GET: api/Books
        [HttpGet]
        
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
          if (_context.Books == null)
          {
              return NotFound();
          }
            return await _context.Books.ToListAsync();
        }

        // GET: api/Books/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
          if (_context.Books == null)
          {
              return NotFound();
          }
            var book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        // PUT: api/Books/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(int id, Book book)
        {
            if (id != book.BookId)
            {
                return BadRequest();
            }

            _context.Entry(book).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
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

        // POST: api/Books
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Book>> PostBook(Book book)
        {
         
            var books = await _context.Books.ToListAsync();
            var bookId = 1;
            if (books.Count != 0)
                bookId = books.Max(x => x.BookId) + 1;
            book.BookId = bookId;
            _context.Books.Add(book);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (BookExists(book.BookId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetBook", new { id = book.BookId }, book);
        }

        // DELETE: api/Books/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            if (_context.Books == null)
            {
                return NotFound();
            }
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet]
        [Route("SearchBook")]
        public List<BookMasterViewModel> SearchBook(string title, int authorID, string publisher, DateTime publishedDate)
        {
            List<BookMasterViewModel> lsBookMaster = new List<BookMasterViewModel>();
            if (_context.Books == null)
            {
                return lsBookMaster;
            }

            try
            {
                lsBookMaster = (from b in _context.Books
                                join users in _context.Users on b.UserId equals users.UserId
                                where b.BookName == title && b.UserId == authorID
                                && b.Publisher == publisher && b.PublishedDate.Date == publishedDate.Date
                                && b.Active == true
                                select new
                                {
                                    BookId = b.BookId,
                                    BookName = b.BookName,
                                    Author = users.FirstName + " " + users.LastName,
                                    Publisher = b.Publisher,
                                    Price = b.Price,
                                    PublishedDate = b.PublishedDate

                                }).ToList()
                                .Select(x => new BookMasterViewModel()
                                {
                                    BookId = x.BookId,
                                    Title = x.BookName,
                                    Author = x.Author,
                                    Publisher = x.Publisher,
                                    Price = Convert.ToDouble(x.Price),
                                    PublishedDate = x.PublishedDate
                                }).ToList();
            }
            catch (Exception ex)
            {
                return lsBookMaster;
            }

            return lsBookMaster;
        }

        [HttpGet]
        [Route("GetALllBooks")]
        public List<BookMasterViewModel> GetAllBooks()
        {
            List<BookMasterViewModel> lsBookMaster = new List<BookMasterViewModel>();
            if (_context.Books == null)
            {
                return lsBookMaster;
            }

            try
            {
                lsBookMaster = (from b in _context.Books
                                join users in _context.Users on b.UserId equals users.UserId
                                join category in _context.Categories on b.CategoryId equals category.CategoryId
                                where b.Active == true
                                select new
                                {
                                    BookId = b.BookId,
                                    BookName = b.BookName,
                                    Author = users.UserName,
                                    Publisher = b.Publisher,
                                    Price = b.Price,
                                    PublishedDate = b.PublishedDate,
                                    CategoryName = category.CategoryName,
                                    Active = b.Active,
                                    BookContent=b.Content

                                }).ToList()
                                .Select(x => new BookMasterViewModel()
                                {
                                    BookId = x.BookId,
                                    Title = x.BookName,
                                    Author = x.Author,
                                    Publisher = x.Publisher,
                                    Price = Convert.ToDouble(x.Price),
                                    PublishedDate = x.PublishedDate,
                                    CategoryName = x.CategoryName,
                                    Active = x.Active,
                                    BookContent=x.BookContent
                                }).ToList();
            }
            catch (Exception ex)
            {
                return lsBookMaster;
            }

            return lsBookMaster;
        }

        [HttpGet("SearchBooks/{categoryID}/{authorID}/{price}")]
        public List<BookMasterViewModel> SearchBooks(int categoryID, int authorID, decimal price)
        {
            List<BookMasterViewModel> lsBookMaster = new List<BookMasterViewModel>();
            if (_context.Books == null)
            {
                return lsBookMaster;
            }

            try
            {
                lsBookMaster = (from b in _context.Books
                                join users in _context.Users on b.UserId equals users.UserId
                                join category in _context.Categories on b.CategoryId equals category.CategoryId
                                where b.CategoryId == categoryID || b.UserId == authorID
                                || b.Price == price
                                && b.Active == true
                                select new
                                {
                                    BookId = b.BookId,
                                    BookName = b.BookName,
                                    Author = users.UserName,
                                    Publisher = b.Publisher,
                                    Price = b.Price,
                                    PublishedDate = b.PublishedDate,
                                    CategoryName = category.CategoryName,
                                    Active = b.Active,
                                    BookContent = b.Content

                                }).ToList()
                                .Select(x => new BookMasterViewModel()
                                {
                                    BookId = x.BookId,
                                    Title = x.BookName,
                                    Author = x.Author,
                                    Publisher = x.Publisher,
                                    Price = Convert.ToDouble(x.Price),
                                    PublishedDate = x.PublishedDate,
                                    CategoryName = x.CategoryName,
                                    Active = x.Active,
                                    BookContent = x.BookContent
                                }).ToList();
                
            }
            catch (Exception ex)
            {
                return lsBookMaster;
            }
            var author = _context.Users.FirstOrDefault(u => u.UserId == authorID);
            if(author!=null)
            {
                lsBookMaster = lsBookMaster.Where(bm => bm.Author == author.UserName).ToList();
            }

            return lsBookMaster;
        }

        [HttpGet("UpdateBookStatus/{BookId}/{UserID}/{Status}")]
        //[Authorize]
        public async Task<IActionResult> UpdateBookStatus(int BookId, int UserID, bool Status)
        {
            if (BookId < 1)
            {
                return BadRequest();
            }

            if (BookMasterWithAuthorExists(BookId, UserID))
            {
                var book = _context.Books.Find(BookId);
                book.Active = Status;
                book.ModifiedDate = DateTime.Now;
                _context.Entry(book).State = EntityState.Modified;
                //context.Entry(user).State = Entitystate.Modified;
            }
            else
                return NotFound();

            try
            {
                _context.SaveChanges();
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookMasterExists(BookId))
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
        private bool BookExists(int id)
        {
            return (_context.Books?.Any(e => e.BookId == id)).GetValueOrDefault();
        }
        private bool BookMasterExists(int id)
        {
            return (_context.Books?.Any(e => e.BookId == id)).GetValueOrDefault();
        }
        private bool BookMasterWithAuthorExists(int id, int userID)
        {
            return (_context.Books?.Any(e => e.BookId == id && e.UserId == userID)).GetValueOrDefault();
        }
    }
}
