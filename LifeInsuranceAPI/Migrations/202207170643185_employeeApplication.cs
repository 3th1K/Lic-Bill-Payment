namespace LifeInsuranceAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class employeeApplication : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.EmployeeApplications",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FirstName = c.String(),
                        LastName = c.String(),
                        Email = c.String(),
                        Gender = c.String(),
                        PhoneNumber = c.String(),
                        DateOfBirth = c.String(),
                        MartialStatus = c.String(),
                        AadharNumber = c.String(),
                        Address = c.String(),
                        CurrentOccupation = c.String(),
                        JobRole = c.String(),
                        Cgpa_X = c.String(),
                        Cgpa_XII = c.String(),
                        CollegeCourse = c.String(),
                        Cgpa_College = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.EmployeeApplications");
        }
    }
}
