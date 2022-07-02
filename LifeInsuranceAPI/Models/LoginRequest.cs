using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LifeInsuranceAPI.Models
{
    public class LoginRequest
    {
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}