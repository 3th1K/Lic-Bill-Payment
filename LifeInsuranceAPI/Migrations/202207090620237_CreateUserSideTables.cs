namespace LifeInsuranceAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CreateUserSideTables : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Addresses",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StreetAddressLine1 = c.String(nullable: false, maxLength: 30),
                        StreetAddressLine2 = c.String(maxLength: 30),
                        City = c.String(nullable: false),
                        State = c.String(nullable: false),
                        ZipCode = c.Int(nullable: false),
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
                        DateOfBirth = c.DateTime(nullable: false),
                        MartialStatus = c.Boolean(nullable: false),
                        Occupation = c.String(nullable: false),
                        Salary = c.Long(nullable: false),
                        AadharNumber = c.Long(nullable: false),
                        PanNumber = c.Int(nullable: false),
                        AddressId = c.Int(nullable: false),
                        PolicyId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Addresses", t => t.AddressId, cascadeDelete: true)
                .ForeignKey("dbo.Policies", t => t.PolicyId, cascadeDelete: true)
                .Index(t => t.AddressId)
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
                        PhoneNumber = c.Long(nullable: false),
                        Password = c.String(nullable: false),
                        UserDetailsId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.UserDetails", t => t.UserDetailsId)
                .Index(t => t.UserDetailsId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Users", "UserDetailsId", "dbo.UserDetails");
            DropForeignKey("dbo.UserDetails", "PolicyId", "dbo.Policies");
            DropForeignKey("dbo.UserDetails", "AddressId", "dbo.Addresses");
            DropForeignKey("dbo.Policies", "PolicyTypeId", "dbo.PolicyTypes");
            DropIndex("dbo.Users", new[] { "UserDetailsId" });
            DropIndex("dbo.UserDetails", new[] { "PolicyId" });
            DropIndex("dbo.UserDetails", new[] { "AddressId" });
            DropIndex("dbo.Policies", new[] { "PolicyTypeId" });
            DropTable("dbo.Users");
            DropTable("dbo.UserDetails");
            DropTable("dbo.PolicyTypes");
            DropTable("dbo.Policies");
            DropTable("dbo.Addresses");
        }
    }
}
