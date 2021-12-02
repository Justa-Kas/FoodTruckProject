using Microsoft.EntityFrameworkCore.Migrations;

namespace FoodTruckProject.Data.Migrations
{
    public partial class WishingForThisToWork : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Wishlists_AspNetUsers_ApplicationUserId",
                table: "Wishlists");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Wishlists",
                table: "Wishlists");

            migrationBuilder.RenameTable(
                name: "Wishlists",
                newName: "WishLists");

            migrationBuilder.RenameIndex(
                name: "IX_Wishlists_ApplicationUserId",
                table: "WishLists",
                newName: "IX_WishLists_ApplicationUserId");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "UserProfiles",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_WishLists",
                table: "WishLists",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WishLists_AspNetUsers_ApplicationUserId",
                table: "WishLists",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WishLists_AspNetUsers_ApplicationUserId",
                table: "WishLists");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WishLists",
                table: "WishLists");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "UserProfiles");

            migrationBuilder.RenameTable(
                name: "WishLists",
                newName: "Wishlists");

            migrationBuilder.RenameIndex(
                name: "IX_WishLists_ApplicationUserId",
                table: "Wishlists",
                newName: "IX_Wishlists_ApplicationUserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Wishlists",
                table: "Wishlists",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Wishlists_AspNetUsers_ApplicationUserId",
                table: "Wishlists",
                column: "ApplicationUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
