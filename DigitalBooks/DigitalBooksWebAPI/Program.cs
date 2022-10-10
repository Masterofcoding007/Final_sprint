using DigitalBooksWebAPI.Models;
using DigitalBooksWebAPI.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using Ocelot.Provider.Polly;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Configuration.AddJsonFile("ocelot.json");
builder.Services.AddOcelot().AddPolly();

builder.Services.AddDbContext<DigitalBooksContext>(options => options.
UseSqlServer(builder.Configuration.GetConnectionString("conn")));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["jwt:Issuer"],
            ValidAudience = builder.Configuration["jwt:Aud"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["jwt:key"]))
        };
    });


builder.Services.AddSingleton<ITokenService>(new TokenService());

builder.Services.AddCors((setup) =>
{
    setup.AddPolicy("default", (options) => { options.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin(); });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.MapPost("/validate", [AllowAnonymous] (UserValidationRequestModel request) =>
{
    var userName = request.UserName;
    var password = request.Password;
    var loggedUserObject = new UserValidationCheck(userName, password);
    var isValidUser = loggedUserObject.IsValidUser();
    var user = loggedUserObject.GetUser();
    if (isValidUser)
    {
        var tokenService = new TokenService();
        var token = tokenService.buildToken(builder.Configuration["jwt:key"],
                                            builder.Configuration["jwt:issuer"],
                                             new[]
                                            {
                                                 builder.Configuration["jwt:Aud"]
                                             },
                                             userName);

        return new
        {
            Token = token,
            User = user,
            IsAuthenticated = true
        };
    }
    return new
    {
        Token = string.Empty,
        User = user,
    IsAuthenticated = false
    };
}).WithName("validate");

app.UseCors("default");

app.UseHttpsRedirection();

//app.UseOcelot().Wait();

app.UseAuthorization();

app.MapControllers();

app.Run();
