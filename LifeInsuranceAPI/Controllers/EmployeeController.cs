using System.Data.Entity;
using System.Web.Http;
using LifeInsuranceAPI.Models;
using System.Linq;
using System.Threading.Tasks;

namespace LifeInsuranceAPI.Controllers
{

    [Authorize]
    public class EmployeeController : ApiController
    {
        private readonly ApplicationDbContext _context;
        EmployeeController()
        {
            _context = new ApplicationDbContext();
        }

        [HttpPost]
        [Route("api/employee/login")]
        [AllowAnonymous]
        public IHttpActionResult Login(LoginRequest request)
        {
            Employee employee = _context.Employees.SingleOrDefault(e => e.Email == request.EmailAddress && e.Password == request.Password);
            if (employee != null)
            {
                request.Role = "employee";
                request.Id = employee.Id;
                var token = JwtHelper.CreateJwtToken(request);
                return Ok(new { success = true, message = "Succesfully logged in", token = token });
            }
            return Unauthorized();
        }

        [HttpPost]
        [Route("api/employee/apply")]
        [AllowAnonymous]
        public IHttpActionResult Apply(EmployeeApplication application)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            _context.EmployeeApplications.Add(application);
            _context.SaveChanges();
            return Ok(application);
        }

        [HttpGet]
        [Route("api/employee/get-employee/{id}")]
        [Authorize(Roles = "employee")]
        public async Task<IHttpActionResult> GetUser(int id)
        {
            Employee employee = await _context.Employees.SingleOrDefaultAsync(e => e.Id == id);
            if (employee == null)
                return NotFound();
            return Ok(employee);
        }
    }
}
