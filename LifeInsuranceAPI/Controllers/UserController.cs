using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using System.Web.Http;
using LifeInsuranceAPI.Models;
using System.Data.Entity;

namespace LifeInsuranceAPI.Controllers
{
    [Authorize]
    public class UserController : ApiController
    {
        private readonly ApplicationDbContext _context;
        UserController()
        {
            _context = new ApplicationDbContext();
        }

        [HttpPost]
        [Route("api/user/register")]
        [AllowAnonymous]
        public IHttpActionResult Register(User user) { 
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
            _context.Users.Add(user);
            _context.SaveChanges();
            return Ok(user);
        }

        [HttpPost]
        [Route("api/user/login")]
        [AllowAnonymous]
        public IHttpActionResult Login(LoginRequest request)
        {
            User user = _context.Users.SingleOrDefault(u => u.Email == request.EmailAddress && u.Password == request.Password);
            if (user!=null)
            {
                request.Role = "user";
                request.Id = user.Id;
                var token = JwtHelper.CreateJwtToken(request);
                return Ok(new { success = true, message = "Succesfully logged in", token = token });
            }
            return Unauthorized();
        }

        [HttpGet]
        [Route("api/user/user-dashboard")]
        [Authorize(Roles = "user")]
        public IHttpActionResult UserDashboard()
        {
            return Ok("user logged in");
        }

        [HttpGet]
        [Route("api/user/get-user-details/{id}")]
        [Authorize(Roles = "user")]
        public async Task<IHttpActionResult> GetUserDetails(int id)
        {
            User user = await _context.Users
                                    .Include(u => u.UserDetails)
                                    .Include(u => u.UserDetails.Address)
                                    .Include(u => u.UserDetails.Policy)
                                    .Include(u => u.UserDetails.Policy.PolicyType)
                                    .SingleOrDefaultAsync(u => u.Id == id);
            if(user==null)
                return NotFound();
            return Ok(user);
        }

    }
}
