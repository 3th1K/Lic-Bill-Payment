using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace LifeInsuranceAPI.Models
{
    public class EmployeeApplication
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


        public string Address { get; set; }

        public string CurrentOccupation { get; set; }

        public string JobRole { get; set; }

        public string Cgpa_X { get; set; }

        public string Cgpa_XII { get; set; }

        public string CollegeCourse { get; set; }

        public string Cgpa_College { get; set; }
    }
}