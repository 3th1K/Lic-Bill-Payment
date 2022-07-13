namespace LifeInsuranceAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class address : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Employees", "AddressId", "dbo.Addresses");
            DropIndex("dbo.Employees", new[] { "AddressId" });
            AddColumn("dbo.Employees", "Address", c => c.String(nullable: false));
            DropColumn("dbo.Employees", "AddressId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Employees", "AddressId", c => c.Int(nullable: false));
            DropColumn("dbo.Employees", "Address");
            CreateIndex("dbo.Employees", "AddressId");
            AddForeignKey("dbo.Employees", "AddressId", "dbo.Addresses", "Id", cascadeDelete: true);
        }
    }
}
