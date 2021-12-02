using Microsoft.EntityFrameworkCore.Migrations;

namespace FoodTruckProject.Data.Migrations
{
    public partial class UpdatedPassportPage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BusinessName",
                table: "PassportPages",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BusinessName",
                table: "PassportPages");
        }
    }
}
