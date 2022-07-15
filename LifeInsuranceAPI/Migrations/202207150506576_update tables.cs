namespace LifeInsuranceAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updatetables : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Employees", "FirstName", c => c.String());
            AlterColumn("dbo.Employees", "LastName", c => c.String());
            AlterColumn("dbo.Employees", "Email", c => c.String());
            AlterColumn("dbo.Employees", "Gender", c => c.String());
            AlterColumn("dbo.Employees", "PhoneNumber", c => c.String());
            AlterColumn("dbo.Employees", "AadharNumber", c => c.String());
            AlterColumn("dbo.Employees", "Address", c => c.String());
            AlterColumn("dbo.Employees", "Password", c => c.String());
            AlterColumn("dbo.Policies", "Name", c => c.String());
            AlterColumn("dbo.Policies", "Description", c => c.String());
            AlterColumn("dbo.PolicyTypes", "Name", c => c.String());
            AlterColumn("dbo.PolicyTypes", "Description", c => c.String());
            AlterColumn("dbo.UserDetails", "DateOfBirth", c => c.String());
            AlterColumn("dbo.UserDetails", "MartialStatus", c => c.String());
            AlterColumn("dbo.UserDetails", "Occupation", c => c.String());
            AlterColumn("dbo.UserDetails", "Salary", c => c.String());
            AlterColumn("dbo.UserDetails", "AadharNumber", c => c.String());
            AlterColumn("dbo.UserDetails", "PanNumber", c => c.String());
            AlterColumn("dbo.UserDetails", "StreetAddressLine1", c => c.String());
            AlterColumn("dbo.UserDetails", "StreetAddressLine2", c => c.String());
            AlterColumn("dbo.UserDetails", "City", c => c.String());
            AlterColumn("dbo.UserDetails", "State", c => c.String());
            AlterColumn("dbo.UserDetails", "ZipCode", c => c.String());
            AlterColumn("dbo.Users", "FirstName", c => c.String());
            AlterColumn("dbo.Users", "LastName", c => c.String());
            AlterColumn("dbo.Users", "Email", c => c.String());
            AlterColumn("dbo.Users", "Gender", c => c.String());
            AlterColumn("dbo.Users", "PhoneNumber", c => c.String());
            AlterColumn("dbo.Users", "Password", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Users", "Password", c => c.String(nullable: false));
            AlterColumn("dbo.Users", "PhoneNumber", c => c.String(nullable: false));
            AlterColumn("dbo.Users", "Gender", c => c.String(nullable: false, maxLength: 10));
            AlterColumn("dbo.Users", "Email", c => c.String(nullable: false));
            AlterColumn("dbo.Users", "LastName", c => c.String(nullable: false, maxLength: 15));
            AlterColumn("dbo.Users", "FirstName", c => c.String(nullable: false, maxLength: 20));
            AlterColumn("dbo.UserDetails", "ZipCode", c => c.String(nullable: false));
            AlterColumn("dbo.UserDetails", "State", c => c.String(nullable: false));
            AlterColumn("dbo.UserDetails", "City", c => c.String(nullable: false));
            AlterColumn("dbo.UserDetails", "StreetAddressLine2", c => c.String(maxLength: 30));
            AlterColumn("dbo.UserDetails", "StreetAddressLine1", c => c.String(nullable: false, maxLength: 30));
            AlterColumn("dbo.UserDetails", "PanNumber", c => c.String(nullable: false));
            AlterColumn("dbo.UserDetails", "AadharNumber", c => c.String(nullable: false));
            AlterColumn("dbo.UserDetails", "Salary", c => c.String(nullable: false));
            AlterColumn("dbo.UserDetails", "Occupation", c => c.String(nullable: false));
            AlterColumn("dbo.UserDetails", "MartialStatus", c => c.String(nullable: false));
            AlterColumn("dbo.UserDetails", "DateOfBirth", c => c.String(nullable: false));
            AlterColumn("dbo.PolicyTypes", "Description", c => c.String(nullable: false, maxLength: 255));
            AlterColumn("dbo.PolicyTypes", "Name", c => c.String(nullable: false, maxLength: 15));
            AlterColumn("dbo.Policies", "Description", c => c.String(nullable: false, maxLength: 225));
            AlterColumn("dbo.Policies", "Name", c => c.String(nullable: false, maxLength: 30));
            AlterColumn("dbo.Employees", "Password", c => c.String(nullable: false));
            AlterColumn("dbo.Employees", "Address", c => c.String(nullable: false));
            AlterColumn("dbo.Employees", "AadharNumber", c => c.String(nullable: false));
            AlterColumn("dbo.Employees", "PhoneNumber", c => c.String(nullable: false));
            AlterColumn("dbo.Employees", "Gender", c => c.String(nullable: false, maxLength: 10));
            AlterColumn("dbo.Employees", "Email", c => c.String(nullable: false));
            AlterColumn("dbo.Employees", "LastName", c => c.String(nullable: false, maxLength: 15));
            AlterColumn("dbo.Employees", "FirstName", c => c.String(nullable: false, maxLength: 20));
        }
    }
}
