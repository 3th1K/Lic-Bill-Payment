using System.ComponentModel.DataAnnotations;
using System;

namespace LifeInsuranceAPI.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(20)]
        [Display(Name = "First Name")]
        public string FirstName { get; set; }

        [Required, MaxLength(15)]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }

        [Required, DataType(DataType.EmailAddress)]
        [Display(Name = "Email Address")]
        public string Email { get; set; }

        [Required, MaxLength(10)]
        public string Gender { get; set; }

        [Required, DataType(DataType.PhoneNumber)]
        [Display(Name = "Phone Number")]
        public long PhoneNumber { get; set; }

        [Required]
        [Display(Name = "Date Of Birth")]
        public string DateOfBirth { get; set; }

        [Required]
        [Display(Name = "Martial Status")]
        public bool MartialStatus { get; set; }

        [Required]
        [Display(Name = "Aadhar Number")]
        public long AadharNumber { get; set; }

        [Required]
        public string Address { get;set; }

        [Required, DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }
        
    }
}