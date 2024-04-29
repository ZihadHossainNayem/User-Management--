using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using User_Management_API.Data;

namespace User_Management_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SearchController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> SearchUsers(
            [FromQuery] string username = null,
            [FromQuery] string fullName = null,
            [FromQuery] string phone = null,
            [FromQuery] string role = null)
        {
            var query = _context.Users.AsQueryable();

            if (!string.IsNullOrEmpty(username))
                query = query.Where(u => u.Username.ToLower().Contains(username.ToLower()));

            if (!string.IsNullOrEmpty(fullName))
                query = query.Where(u => u.FullName.ToLower().Contains(fullName.ToLower()));

            if (!string.IsNullOrEmpty(phone))
                query = query.Where(u => u.Phone.ToLower().Contains(phone.ToLower()));

            if (!string.IsNullOrEmpty(role))
                query = query.Where(u => u.Role.ToLower().Contains(role.ToLower()));

            var users = await query.ToListAsync();

            return Ok(users);
        }
    }
}
