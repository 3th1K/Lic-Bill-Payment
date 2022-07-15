using System.ComponentModel.DataAnnotations;

namespace LifeInsuranceAPI.Models
{
    public class Policy
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }
      
        public string Description { get; set; }

        public int Cost { get; set; }

        public string PolicyType { get; set; }
    }
}