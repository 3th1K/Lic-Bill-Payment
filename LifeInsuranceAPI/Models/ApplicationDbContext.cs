using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace LifeInsuranceAPI.Models
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<UserDetails> UserDetails { get; set; }
        public DbSet<Address> Address { get; set; }
        public DbSet<Policy> Policies { get; set; }
        public DbSet<PolicyType> PolicyTypes { get; set; }
    }
}