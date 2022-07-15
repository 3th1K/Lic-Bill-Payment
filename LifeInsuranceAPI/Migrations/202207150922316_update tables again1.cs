namespace LifeInsuranceAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updatetablesagain1 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Policies", "PolicyTypeId", "dbo.PolicyTypes");
            DropIndex("dbo.Policies", new[] { "PolicyTypeId" });
            AddColumn("dbo.Policies", "Cost", c => c.Int(nullable: false));
            AddColumn("dbo.Policies", "PolicyType", c => c.String());
            DropColumn("dbo.Policies", "PolicyTypeId");
            DropTable("dbo.PolicyTypes");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.PolicyTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        Cost = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Policies", "PolicyTypeId", c => c.Int(nullable: false));
            DropColumn("dbo.Policies", "PolicyType");
            DropColumn("dbo.Policies", "Cost");
            CreateIndex("dbo.Policies", "PolicyTypeId");
            AddForeignKey("dbo.Policies", "PolicyTypeId", "dbo.PolicyTypes", "Id", cascadeDelete: true);
        }
    }
}
