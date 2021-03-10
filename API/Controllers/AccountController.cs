using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")] // api account
  public class AccountController : ControllerBase
  {
    private readonly SignInManager<AppUser> _signInManager;
    private readonly UserManager<AppUser> _userManager;
    private readonly TokenService _tokenService;
    public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenService tokenService)
    {
      _tokenService = tokenService;
      _userManager = userManager;
      _signInManager = signInManager;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
    {
      var user = await _userManager.FindByEmailAsync(loginDTO.Email);
      if (user == null) return Unauthorized();

      var result = await _signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);

      if (result.Succeeded)
      {
        await SetRefreshToken(user);
        return CreateUserObject(user);
      }

      return Unauthorized();
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
    {
      if (await _userManager.Users.AnyAsync(x => x.Email == registerDTO.Email))
      {
        return BadRequest("Email taken");
      }

      if (await _userManager.Users.AnyAsync(x => x.UserName == registerDTO.UserName))
      {
        return BadRequest("Username Taken");
      }

      var user = new AppUser
      {
        DisplayName = registerDTO.DisplayName,
        Email = registerDTO.Email,
        UserName = registerDTO.UserName
      };

      var result = await _userManager.CreateAsync(user, registerDTO.Password);

      if (result.Succeeded)
      {
        await SetRefreshToken(user);
        return CreateUserObject(user);
      }

      return BadRequest("Problem registering user");
    }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<UserDTO>> GetCurrentUser() // Call method when user has been away from screen or refresh browser etc..
    {
      var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

      await SetRefreshToken(user); // Maybe not add this here as this method is called when user refreshs there browser.
      return CreateUserObject(user);
    }

    [Authorize]
    [HttpPost("refresh")]
    public async Task<ActionResult<UserDTO>> RefreshToken()
    {
      var refreshToken = Request.Cookies["refreshToken"];
      var user = await _userManager.Users.Include(r => r.RefreshTokens)
        .FirstOrDefaultAsync(x => x.UserName == User.FindFirstValue(ClaimTypes.Name));

      if (user == null) return Unauthorized();

      var oldToken = user.RefreshTokens.SingleOrDefault(x => x.Token == refreshToken);

      if (oldToken != null && !oldToken.IsActive) return Unauthorized();

      return CreateUserObject(user);
    }

    private async Task SetRefreshToken(AppUser user)
    {
      var refreshToken = _tokenService.GenerrateRefreshToken();

      user.RefreshTokens.Add(refreshToken);

      await _userManager.UpdateAsync(user);

      var cookieOptions = new CookieOptions
      {
        HttpOnly = true, // ensure that the token is unaccessable via javascript
        Expires = DateTime.UtcNow.AddDays(7),
      };

      Response.Cookies.Append("refreshToken", refreshToken.Token, cookieOptions);
    }

    private UserDTO CreateUserObject(AppUser user)
    {
      return new UserDTO
      {
        DisplayName = user.DisplayName,
        Image = null,
        Token = _tokenService.CreateToken(user),
        UserName = user.UserName
      };
    }

  }

}