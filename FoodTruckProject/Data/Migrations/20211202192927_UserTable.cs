﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace FoodTruckProject.Data.Migrations
{
    public partial class UserTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserProfiles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Allergies = table.Column<string>(nullable: true),
                    Diet = table.Column<string>(nullable: true),
                    FoodieRating = table.Column<int>(nullable: false),
                    FaveFood = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProfiles", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserProfiles");
        }
    }
}
