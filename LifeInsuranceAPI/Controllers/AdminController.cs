using System.Data.Entity;
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
                request.Id = 1;
                var token = JwtHelper.CreateJwtToken(request);
                return Ok(new { success = true, message = "Succesfully logged in", token = token });
            }
            return Unauthorized();
        }

        [HttpGet]
        [Route("api/admin/admin-dashboard")]
        [Authorize(Roles = "admin")]
        public IHttpActionResult AdminDashboard() {
            return Ok(new { email = "admin@gmail.com", password = "admin123"});
        }

        [HttpGet]
        [Route("api/admin/get-users")]
        [Authorize(Roles = "admin")]
        public async Task<IHttpActionResult> GetUsers() {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        [HttpGet]
        [Route("api/admin/get-user/{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IHttpActionResult> GetUser(int id)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Id == id);
            if (user == null)
                return NotFound();
            return Ok(user);
        }

        [HttpGet]
        [Route("api/admin/get-user-details/{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IHttpActionResult> GetUserDetails(int id)
        {
            UserDetails userDetails = await _context.UserDetails
                                                                .Include(ud => ud.Policy)
                                                                .SingleOrDefaultAsync(ud => ud.UserId == id);
            if (userDetails == null)
                return NotFound();
            return Ok(userDetails);
        }

        [HttpDelete]
        [Route("api/admin/delete-user/{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IHttpActionResult> DeleteUser(int id) { 
            User userInDb = await _context.Users.SingleOrDefaultAsync(u => u.Id == id);
            UserDetails userDetailsInDb = await _context.UserDetails.SingleOrDefaultAsync(ud => ud.UserId == id);
            if (userInDb == null)
                return NotFound();
            _context.Users.Remove(userInDb);
            if (userDetailsInDb != null)
                _context.UserDetails.Remove(userDetailsInDb);
            _context.SaveChanges();
            return Ok("Deleted");
        }

        [HttpPut]
        [Route("api/admin/update-user")]
        [Authorize(Roles = "admin")]
        public async Task<IHttpActionResult> UpdateUser(User user)
        {
            if (!ModelState.IsValid)
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
        [Route("api/admin/update-user-details")]
        [Authorize(Roles = "admin")]
        public async Task<IHttpActionResult> UpdateUserDetails(UserDetails userDetails)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            UserDetails userDetailsInDb = await _context.UserDetails.Include(ud => ud.Policy).SingleOrDefaultAsync(ud => ud.UserId == userDetails.UserId);
            if (userDetailsInDb == null)
            {
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
        [Route("api/admin/get-policies")]
        [Authorize(Roles = "admin")]
        public async Task<IHttpActionResult> GetPolicies()
        {
            var policies = await _context.Policies.ToListAsync();
            return Ok(policies);
        }

        [HttpGet]
        [Route("api/admin/get-employees")]
        [Authorize(Roles = "admin")]
        public async Task<IHttpActionResult> GetEmployees()
        {
            var employees = await _context.Employees.ToListAsync();
            return Ok(employees) ;
        }

        [HttpGet]
        [Route("api/admin/get-employee/{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IHttpActionResult> GetEmployee(int id)
        {
            var employee = await _context.Employees.SingleOrDefaultAsync(e => e.Id == id);
            if (employee == null)
                return NotFound();
            return Ok(employee);
        }

        [HttpDelete]
        [Route("api/admin/delete-employee/{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IHttpActionResult> DeleteEmployee(int id)
        {
            Employee employeeInDb = await _context.Employees.SingleOrDefaultAsync(e => e.Id == id);
            if (employeeInDb == null)
                return NotFound();
            _context.Employees.Remove(employeeInDb);
            _context.SaveChanges();
            return Ok("Deleted");
        }

        [HttpPost]
        [Route("api/admin/add-employee/{id}")]
        [Authorize(Roles = "admin")]
        public IHttpActionResult AddEmployee(Employee employee) {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            _context.Employees.Add(employee);
            _context.SaveChanges();
            return Ok(employee);
        }

        [HttpPut]
        [Route("api/admin/update-employee")]
        [Authorize(Roles = "admin")]
        public async Task<IHttpActionResult> UpdateEmployee(Employee employee)
        {
            if (!ModelState.IsValid)
                return BadRequest();
            Employee employeeInDb = await _context.Employees.SingleOrDefaultAsync(e => e.Id == employee.Id);
            if (employeeInDb == null)
                return NotFound();
            employeeInDb.FirstName = employee.FirstName;
            employeeInDb.LastName = employee.LastName;
            employeeInDb.Email = employee.Email;
            employeeInDb.Gender = employee.Gender;
            employeeInDb.PhoneNumber = employee.PhoneNumber;
            employeeInDb.DateOfBirth = employee.DateOfBirth;
            employeeInDb.MartialStatus = employee.MartialStatus;
            employeeInDb.AadharNumber = employee.AadharNumber;
            employeeInDb.Address = employee.Address;

            _context.SaveChanges();
            return Ok(employeeInDb);

        }

        /*[HttpGet]
        [Route("api/admin/get-policies")]
        [Authorize(Roles = "admin")]
        public async Task<IHttpActionResult> GetPolicies()
        {
            var policies = await _context.Policies
                                        .Include(p => p.PolicyType)
                                        .ToListAsync();
            return Ok(policies);
        }

        [HttpGet]
        [Route("api/admin/get-policy/{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IHttpActionResult> GetPolicy(int id)
        {
            var policy = await _context.Policies
                                        .Include(p => p.PolicyType)
                                        .SingleOrDefaultAsync(p => p.Id == id);
            if (policy == null)
                return NotFound();
            return Ok(policy);
        }

        [HttpDelete]
        [Route("api/admin/delete-policy/{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IHttpActionResult> DeletePolicy(int id)
        {
            Policy policyInDb = await _context.Policies.SingleOrDefaultAsync(p => p.Id == id);
            if (policyInDb == null)
                return NotFound();
            _context.Policies.Remove(policyInDb);
            _context.SaveChanges();
            return Ok("Deleted");
        }

        [HttpGet]
        [Route("api/admin/get-policy-types")]
        [Authorize(Roles = "admin")]
        public async Task<IHttpActionResult> GetPolicyTypes()
        {
            var policyTypes = await _context.PolicyTypes.ToListAsync();
            return Ok(policyTypes);
        }

        [HttpGet]
        [Route("api/admin/get-policy-type/{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IHttpActionResult> GetPolicyType(int id)
        {
            var policyType = await _context.PolicyTypes.SingleOrDefaultAsync(p => p.Id == id);
            if (policyType == null)
                return NotFound();
            return Ok(policyType);
        }

        [HttpDelete]
        [Route("api/admin/delete-policy-types/{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IHttpActionResult> DeletePolicyTypes(int id)
        {
            PolicyType policyTypeInDb = await _context.PolicyTypes.SingleOrDefaultAsync(pt => pt.Id == id);
            if (policyTypeInDb == null)
                return NotFound();
            _context.PolicyTypes.Remove(policyTypeInDb);
            _context.SaveChanges();
            return Ok("Deleted");
        }*/


        /*[HttpGet]
        [Route("api/admin/superadmin-home")]
        [Authorize(Roles = "superadmin")]
        public IHttpActionResult SuperadminHome()
        {
            return Ok("Super Admin Home");
        }*/
    }
}
