namespace LifeInsuranceAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updatetablesagain : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.PolicyTypes", "Cost", c => c.Int(nullable: false));
            AddColumn("dbo.UserDetails", "TenureOfPolicy", c => c.Int(nullable: false));
            DropColumn("dbo.Policies", "Cost");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Policies", "Cost", c => c.Long(nullable: false));
            DropColumn("dbo.UserDetails", "TenureOfPolicy");
            DropColumn("dbo.PolicyTypes", "Cost");
        }
    }
}
