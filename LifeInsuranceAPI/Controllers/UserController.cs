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
        [Route("api/user/get-user/{id}")]
        [Authorize(Roles = "user")]
        public async Task<IHttpActionResult> GetUser(int id)
        {
            User user = await _context.Users.SingleOrDefaultAsync(u => u.Id == id);
            if(user==null)
                return NotFound();
            return Ok(user);
        }

        [HttpGet]
        [Route("api/user/get-user-details/{id}")]
        [Authorize(Roles = "user")]
        public async Task<IHttpActionResult> GetUserDetails(int id)
        {
            UserDetails userDetails = await _context.UserDetails
                .Include(ud=>ud.Policy)
                .SingleOrDefaultAsync(ud => ud.UserId == id);
            if (userDetails == null)
                return NotFound();
            return Ok(userDetails);
        }

        [HttpPut]
        [Route("api/user/update-user")]
        [Authorize(Roles = "user")]
        public async Task<IHttpActionResult> UpdateUser(User user)
        {
            if(!ModelState.IsValid)
                return BadRequest();
            User userInDb = await _context.Users.SingleOrDefaultAsync(u => u.Id == user.Id);
            if (userInDb == null)
                return NotFound();
            userInDb.FirstName = user.FirstName;
            userInDb.LastName = user.LastName;
            userInDb.Email = user.Email;
            userInDb.Gender = user.Gender;
            userInDb.PhoneNumber = user.PhoneNumber;
            _context.SaveChanges();
            return Ok(userInDb);
            
        }

        [HttpPut]
        [Route("api/user/update-user-details")]
        [Authorize(Roles = "user")]
        public async Task<IHttpActionResult> UpdateUserDetails(UserDetails userDetails)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            UserDetails userDetailsInDb = await _context.UserDetails.Include(ud=>ud.Policy).SingleOrDefaultAsync(ud => ud.UserId == userDetails.UserId);
            if (userDetailsInDb == null) {
                _context.UserDetails.Add(userDetails);
                _context.SaveChanges();
                return Ok(userDetailsInDb);
            }

            userDetailsInDb.DateOfBirth = userDetails.DateOfBirth;
            userDetailsInDb.MartialStatus = userDetails.MartialStatus;
            userDetailsInDb.Occupation = userDetails.Occupation;
            userDetailsInDb.Salary = userDetails.Salary;
            userDetailsInDb.AadharNumber = userDetails.AadharNumber;
            userDetailsInDb.PanNumber = userDetails.PanNumber;
            userDetailsInDb.StreetAddressLine1 = userDetails.StreetAddressLine1;
            userDetailsInDb.StreetAddressLine2 = userDetails.StreetAddressLine2;
            userDetailsInDb.City = userDetails.City;
            userDetailsInDb.State = userDetails.State;
            userDetailsInDb.ZipCode = userDetails.ZipCode;
            userDetailsInDb.TenureOfPolicy = userDetails.TenureOfPolicy;
            userDetailsInDb.PolicyId = userDetails.PolicyId;

            _context.SaveChanges();
            return Ok(userDetailsInDb);

        }

        [HttpGet]
        [Route("api/user/get-policies")]
        [Authorize(Roles = "user")]
        public async Task<IHttpActionResult> GetPolicies()
        {
            var policies = await _context.Policies.ToListAsync();
            return Ok(policies);
        }

    }
}
