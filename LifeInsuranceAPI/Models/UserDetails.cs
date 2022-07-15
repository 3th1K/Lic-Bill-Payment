using System;
using System.ComponentModel.DataAnnotations;

namespace LifeInsuranceAPI.Models
{
    public class UserDetails
    {
        [Key]
        public int Id { get; set; }
        public string DateOfBirth { get; set; }

        public string MartialStatus { get; set; }

        public string Occupation { get; set; }

        
        public string Salary { get; set; }

        
        
        public string AadharNumber { get; set; }

      
        public string PanNumber { get; set; }


        
        public string StreetAddressLine1 { get; set; }

        
        public string StreetAddressLine2 { get; set; }

       
        public string City { get; set; }

        
        public string State { get; set; }

        
        public string ZipCode { get; set; }

        public int TenureOfPolicy { get; set; }


        public User User { get; set; }
        public int UserId { get; set; }
        
        public Policy Policy { get; set; }
        public int PolicyId { get; set; }
    }
}