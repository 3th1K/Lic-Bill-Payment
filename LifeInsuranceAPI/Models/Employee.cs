using System.ComponentModel.DataAnnotations;
using System;

namespace LifeInsuranceAPI.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        public string FirstName { get; set; }

    
        public string LastName { get; set; }

       
        public string Email { get; set; }

        
        public string Gender { get; set; }

        
        public string PhoneNumber { get; set; }

        
        public string DateOfBirth { get; set; }

        
        public string MartialStatus { get; set; }

       
        public string AadharNumber { get; set; }

       
        public string Address { get;set; }

        
        public string Password { get; set; }
        
    }
}