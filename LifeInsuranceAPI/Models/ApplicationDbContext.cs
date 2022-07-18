using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace LifeInsuranceAPI.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext() : base("DefaultConnection") { }
        public DbSet<User> Users { get; set; }
        public DbSet<UserDetails> UserDetails { get; set; }
        public DbSet<Employee> Employees { get; set; }

        public DbSet<EmployeeApplication> EmployeeApplications { get; set; }
        public DbSet<Policy> Policies { get; set; }
    }
}