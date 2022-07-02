using System.ComponentModel.DataAnnotations;

namespace LifeInsuranceAPI.Models
{
    public class PolicyType
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(15)]
        public string Name { get; set; }

        [Required, MaxLength(255)]
        public string Description { get; set; }
    }
}