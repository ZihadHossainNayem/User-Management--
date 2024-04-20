using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using User_Management_API.Data;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace User_Management_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CreateUserController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IHubContext<NotificationHub> _hubContext;

        public CreateUserController(AppDbContext context, IHubContext<NotificationHub> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        public class UserCreateDto
        {
            [Required]
            public string Username { get; set; }
            [Required]
            public string Password { get; set; }
            public string FullName { get; set; }
            [Required]
            public string Role { get; set; }
            public string Phone { get; set; }
            public string CreatedBy { get; set; } 
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] UserCreateDto userDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var existingUser = await _context.Users
                            .FirstOrDefaultAsync(u => u.Username.ToLower() == userDto.Username.ToLower());

            if (existingUser != null)
            {
                return Conflict(new { message = "Username already exists. Please choose another username." });
            }

            var user = new User
            {
                Username = userDto.Username,
                Password = userDto.Password,
                FullName = userDto.FullName,
                Role = userDto.Role,
                Phone = userDto.Phone,
                CreatedBy = userDto.CreatedBy 
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var notification = new Notification
            {
                Content = $"User '{user.Username}' has been created by '{user.CreatedBy}' at {DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss")}",

                UserId = user.Id 
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            await _hubContext.Clients.Group("Admin").SendAsync("ReceiveNotification", notification.Content);



            return Ok(new { message = "User created successfully" });
        }
    }
}
