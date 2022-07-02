using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using LifeInsuranceAPI.Models;

namespace LifeInsuranceAPI.Controllers
{
    [Authorize]
    public class AdminController : ApiController
    {
        [HttpPost]
        [Route("api/admin/login")]
        [AllowAnonymous]
        public IHttpActionResult Login(LoginRequest request) {
            if (request.EmailAddress == "admin@gmail.com" && request.Password == "admin123")
            {
                request.Role = "admin";
                var token = JwtHelper.CreateJwtToken(request);
                //return Ok("ok");
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
        [Route("api/admin/superadmin-home")]
        [Authorize(Roles = "superadmin")]
        public IHttpActionResult SuperadminHome()
        {
            return Ok("Super Admin Home");
        }
    }
}
