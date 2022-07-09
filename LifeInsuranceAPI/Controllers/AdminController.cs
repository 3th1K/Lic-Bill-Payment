using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Data.Entity;
using System.ComponentModel.DataAnnotations;
using System.Web.Http;
using LifeInsuranceAPI.Models;
using System.Threading.Tasks;

namespace LifeInsuranceAPI.Controllers
{
    [Authorize]
    public class AdminController : ApiController
    {
        private readonly ApplicationDbContext _context;
        AdminController() {
            _context = new ApplicationDbContext();
        }

        [HttpPost]
        [Route("api/admin/login")]
        [AllowAnonymous]
        public IHttpActionResult Login(LoginRequest request) {
            if (request.EmailAddress == "admin@gmail.com" && request.Password == "admin123")
            {
                request.Role = "admin";
                var token = JwtHelper.CreateJwtToken(request);
                return Ok(new { success = true, message = "Succesfully logged in", token = token });
            }
            return Unauthorized();
        }

        [HttpGet]
        [Route("api/admin/admin-dashboard")]
        public IHttpActionResult AdminDashboard() {
            return Ok(new { email = "admin@gmail.com", password = "admin123"});
        }

        [HttpGet]
        [Route("api/admin/get-users")]
        public async Task<IHttpActionResult> GetUsers() {
            var users = await _context.Users
                                        .Include(u => u.UserDetails)
                                        .Include(u => u.UserDetails.Address)
                                        .Include(u => u.UserDetails.Policy)
                                        .Include(u => u.UserDetails.Policy.PolicyType)
                                        .ToListAsync();
            return Ok(users);
        }

        /*[HttpGet]
        [Route("api/admin/superadmin-home")]
        [Authorize(Roles = "superadmin")]
        public IHttpActionResult SuperadminHome()
        {
            return Ok("Super Admin Home");
        }*/
    }
}
