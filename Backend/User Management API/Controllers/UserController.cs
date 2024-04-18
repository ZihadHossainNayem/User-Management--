using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using User_Management_API.Data;

namespace User_Management_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        public class UserSignInDto
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }

        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] UserSignInDto signInDto)
        {
            if (signInDto == null || string.IsNullOrWhiteSpace(signInDto.Username) || string.IsNullOrWhiteSpace(signInDto.Password))
            {
                return BadRequest("Username and password are required.");
            }

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Username == signInDto.Username && u.Password == signInDto.Password); 

            if (user == null)
            {
                return Unauthorized("Invalid username or password.");
            }

            return Ok(new { Message = "Sign in successful",
                User = new
                {
                    Username = user.Username,
                    FullName = user.FullName,
                    Role = user.Role,
                    Phone = user.Phone,
                    CreatedBy = user.CreatedBy
                }
            }); 
        }
    }
}