namespace LifeInsuranceAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DateTimeToString : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Employees", "DateOfBirth", c => c.String(nullable: false));
            AlterColumn("dbo.UserDetails", "DateOfBirth", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.UserDetails", "DateOfBirth", c => c.DateTime(nullable: false));
            AlterColumn("dbo.Employees", "DateOfBirth", c => c.DateTime(nullable: false));
        }
    }
}
