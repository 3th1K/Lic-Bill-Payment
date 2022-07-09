using System;
using System.ComponentModel.DataAnnotations;

namespace LifeInsuranceAPI.Models
{
    public class UserDetails
    {
        [Key]
        public int Id { get; set; }

        [Required, DataType(DataType.DateTime)]
        [Display(Name = "Date Of Birth")]
        public DateTime DateOfBirth { get; set; }

        [Required]
        [Display(Name = "Martial Status")]
        public bool MartialStatus { get; set; }

        [Required]
        public string Occupation { get; set; }

        [Required]
        public long Salary { get; set; }

        [Required]
        [Display(Name = "Aadhar Number")]
        public long AadharNumber { get; set; }

        [Required]
        [Display(Name = "Pan Number")]
        public int PanNumber { get; set; }
        public Address Address { get; set; }
        public Policy Policy { get; set; }
        public int AddressId { get; set; }
        public int PolicyId { get; set; }
    }
}