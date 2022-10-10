namespace DigitalBooksWebAPI.Services
{
    public class BookHistoryViewModel
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string Publisher { get; set; }
        public double Price { get; set; }
        public DateTime PublishedDate { get; set; }
        public string CategoryName { get; set; }
        public string EmailId { get; set; }
        public int BookId { get; internal set; }
    }
}
