using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace OnlineShop.Migrations
{
    public partial class changetypepropertytosupplierProduct : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "EstimatedDelivery",
                schema: "OnlineShop",
                table: "SupplierProduct",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "EstimatedDelivery",
                schema: "OnlineShop",
                table: "SupplierProduct",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(int));
        }
    }
}
