namespace LifeInsuranceAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddEmployeeTable : DbMigration
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
                        PhoneNumber = c.Long(nullable: false),
                        DateOfBirth = c.DateTime(nullable: false),
                        MartialStatus = c.Boolean(nullable: false),
                        AadharNumber = c.Long(nullable: false),
                        Password = c.String(nullable: false),
                        AddressId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Addresses", t => t.AddressId, cascadeDelete: true)
                .Index(t => t.AddressId);
            
            AlterColumn("dbo.UserDetails", "PanNumber", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Employees", "AddressId", "dbo.Addresses");
            DropIndex("dbo.Employees", new[] { "AddressId" });
            AlterColumn("dbo.UserDetails", "PanNumber", c => c.Int(nullable: false));
            DropTable("dbo.Employees");
        }
    }
}
