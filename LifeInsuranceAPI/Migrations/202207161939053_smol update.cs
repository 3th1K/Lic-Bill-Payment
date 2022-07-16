namespace LifeInsuranceAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class smolupdate : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Employees", "DateOfBirth", c => c.String());
            AlterColumn("dbo.Employees", "MartialStatus", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Employees", "MartialStatus", c => c.Boolean(nullable: false));
            AlterColumn("dbo.Employees", "DateOfBirth", c => c.DateTime(nullable: false));
        }
    }
}
