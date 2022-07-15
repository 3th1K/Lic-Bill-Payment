namespace LifeInsuranceAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addtables : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Employees",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FirstName = c.String(nullable: false, maxLength: 20),
                        LastName = c.String(nullable: false, maxLength: 15),
                        Email = c.String(nullable: false),
                        Gender = c.String(nullable: false, maxLength: 10),
                        PhoneNumber = c.String(nullable: false),
                        DateOfBirth = c.DateTime(nullable: false),
                        MartialStatus = c.Boolean(nullable: false),
                        AadharNumber = c.String(nullable: false),
                        Address = c.String(nullable: false),
                        Password = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Policies",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 30),
                        Description = c.String(nullable: false, maxLength: 225),
                        Cost = c.Long(nullable: false),
                        PolicyTypeId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.PolicyTypes", t => t.PolicyTypeId, cascadeDelete: true)
                .Index(t => t.PolicyTypeId);
            
            CreateTable(
                "dbo.PolicyTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 15),
                        Description = c.String(nullable: false, maxLength: 255),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.UserDetails",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        DateOfBirth = c.String(nullable: false),
                        MartialStatus = c.String(nullable: false),
                        Occupation = c.String(nullable: false),
                        Salary = c.String(nullable: false),
                        AadharNumber = c.String(nullable: false),
                        PanNumber = c.String(nullable: false),
                        StreetAddressLine1 = c.String(nullable: false, maxLength: 30),
                        StreetAddressLine2 = c.String(maxLength: 30),
                        City = c.String(nullable: false),
                        State = c.String(nullable: false),
                        ZipCode = c.String(nullable: false),
                        UserId = c.Int(nullable: false),
                        PolicyId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Policies", t => t.PolicyId, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.PolicyId);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        FirstName = c.String(nullable: false, maxLength: 20),
                        LastName = c.String(nullable: false, maxLength: 15),
                        Email = c.String(nullable: false),
                        Gender = c.String(nullable: false, maxLength: 10),
                        PhoneNumber = c.String(nullable: false),
                        Password = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UserDetails", "UserId", "dbo.Users");
            DropForeignKey("dbo.UserDetails", "PolicyId", "dbo.Policies");
            DropForeignKey("dbo.Policies", "PolicyTypeId", "dbo.PolicyTypes");
            DropIndex("dbo.UserDetails", new[] { "PolicyId" });
            DropIndex("dbo.UserDetails", new[] { "UserId" });
            DropIndex("dbo.Policies", new[] { "PolicyTypeId" });
            DropTable("dbo.Users");
            DropTable("dbo.UserDetails");
            DropTable("dbo.PolicyTypes");
            DropTable("dbo.Policies");
            DropTable("dbo.Employees");
        }
    }
}
