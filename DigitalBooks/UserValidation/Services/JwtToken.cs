namespace UserValidation.Services
{
    public class JwtToken
    {
        public string Jwtkey { get; set; }
        public string JwtIssuer { get; set; }
        public string JwtAud { get; set; }
    }
}
