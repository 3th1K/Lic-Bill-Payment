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

        [HttpGet]
        [Route("api/admin/get-user/{id}")]
        public async Task<IHttpActionResult> GetUser(int id)
        {
            var user = await _context.Users
                                        .Include(u => u.UserDetails)
                                        .Include(u => u.UserDetails.Address)
                                        .Include(u => u.UserDetails.Policy)
                                        .Include(u => u.UserDetails.Policy.PolicyType)
                                        .SingleOrDefaultAsync(u => u.Id == id);
            if (user == null)
                return NotFound();
            return Ok(user);
        }

        [HttpGet]
        [Route("api/admin/get-employees")]
        public async Task<IHttpActionResult> GetEmployees()
        {
            var employees = await _context.Employees
                                        .Include(e => e.Address)
                                        .ToListAsync();
            return Ok(employees) ;
        }

        [HttpGet]
        [Route("api/admin/get-employee/{id}")]
        public async Task<IHttpActionResult> GetEmployee(int id)
        {
            var employee = await _context.Employees
                                        .Include(e => e.Address)
                                        .SingleOrDefaultAsync(e => e.Id == id);
            if (employee == null)
                return NotFound();
            return Ok(employee);
        }

        [HttpGet]
        [Route("api/admin/get-policies")]
        public async Task<IHttpActionResult> GetPolicies()
        {
            var policies = await _context.Policies
                                        .Include(p => p.PolicyType)
                                        .ToListAsync();
            return Ok(policies);
        }

        [HttpGet]
        [Route("api/admin/get-policy/{id}")]
        public async Task<IHttpActionResult> GetPolicy(int id)
        {
            var policy = await _context.Policies
                                        .Include(p => p.PolicyType)
                                        .SingleOrDefaultAsync(p => p.Id == id);
            if (policy == null)
                return NotFound();
            return Ok(policy);
        }

        [HttpGet]
        [Route("api/admin/get-policy-types")]
        public async Task<IHttpActionResult> GetPolicyTypes()
        {
            var policyTypes = await _context.PolicyTypes.ToListAsync();
            return Ok(policyTypes);
        }

        [HttpGet]
        [Route("api/admin/get-policy-type/{id}")]
        public async Task<IHttpActionResult> GetPolicyType(int id)
        {
            var policyType = await _context.PolicyTypes.SingleOrDefaultAsync(p => p.Id == id);
            if (policyType == null)
                return NotFound();
            return Ok(policyType);
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
