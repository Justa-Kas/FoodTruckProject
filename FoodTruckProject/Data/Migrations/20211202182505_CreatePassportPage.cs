using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FoodTruckProject.Data.Migrations
{
    public partial class CreatePassportPage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PassportPages",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BusinessId = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: true),
                    Rating = table.Column<int>(nullable: false),
                    FoodEaten = table.Column<string>(nullable: true),
                    Experience = table.Column<string>(nullable: true),
                    DateVisited = table.Column<DateTime>(nullable: false),
                    ApplicationUserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PassportPages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PassportPages_AspNetUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PassportPages_ApplicationUserId",
                table: "PassportPages",
                column: "ApplicationUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PassportPages");
        }
    }
}
