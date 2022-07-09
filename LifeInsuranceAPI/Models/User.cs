using System.ComponentModel.DataAnnotations;

namespace LifeInsuranceAPI.Models
{
    public class User
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

        [Required, DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }
        public UserDetails UserDetails { get; set; }
        public int? UserDetailsId { get; set; }
    }
}