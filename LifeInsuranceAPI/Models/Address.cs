using System.ComponentModel.DataAnnotations;

namespace LifeInsuranceAPI.Models
{
    public class Address
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(30)]
        [Display(Name = "Street Address 1")]
        public string StreetAddressLine1 { get; set; }

        [MaxLength(30)]
        [Display(Name = "Street Address 2")]
        public string StreetAddressLine2 { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string State { get; set; }

        [Required, DataType(DataType.PostalCode)]
        [Display(Name = "Zip Code")]
        public int ZipCode { get; set; }
    }
}