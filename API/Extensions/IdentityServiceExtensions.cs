using System;
using System.Text;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions
{
  public static class IdentityServiceExtensions
  {
    public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
    {
      services.AddIdentityCore<AppUser>(opt =>
      {
        opt.Password.RequireNonAlphanumeric = false;
      })
      .AddEntityFrameworkStores<DataContext>()
      .AddSignInManager<SignInManager<AppUser>>();

      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));

      services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(opt =>
        {
          opt.TokenValidationParameters = new TokenValidationParameters
          {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = key,
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true, // 5 min lifetime validation
            ClockSkew = TimeSpan.Zero // remove the 5 minute lifetime validation
          };
        });

      services.AddScoped<TokenService>(); // scoope to request of the HTTP controller

      return services;
    }
  }
}