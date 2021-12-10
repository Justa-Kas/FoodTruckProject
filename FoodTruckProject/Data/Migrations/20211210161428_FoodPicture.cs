using Microsoft.EntityFrameworkCore.Migrations;

namespace FoodTruckProject.Data.Migrations
{
    public partial class FoodPicture : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Picture",
                table: "PassportPages",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Picture",
                table: "PassportPages");
        }
    }
}
