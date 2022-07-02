using System.ComponentModel.DataAnnotations;

namespace LifeInsuranceAPI.Models
{
    public class Policy
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(30)]
        public string Name { get; set; }

        [Required, MaxLength(225)]
        public string Description { get; set; }

        [Required]
        public long Cost { get; set; }
        public PolicyType PolicyType { get; set; }
        public int PolicyTypeId { get; set; }
    }
}