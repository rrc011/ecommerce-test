using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace OnlineShop.Migrations
{
    public partial class modifiedsupplierproduct : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SupplierProduct_Supplier_SupplierId",
                schema: "OnlineShop",
                table: "SupplierProduct");

            migrationBuilder.DropIndex(
                name: "IX_SupplierProduct_SupplierId",
                schema: "OnlineShop",
                table: "SupplierProduct");

            migrationBuilder.DropColumn(
                name: "EntryDate",
                schema: "OnlineShop",
                table: "SupplierProduct");

            migrationBuilder.DropColumn(
                name: "SupplierId",
                schema: "OnlineShop",
                table: "SupplierProduct");

            migrationBuilder.AddColumn<DateTime>(
                name: "EstimatedDelivery",
                schema: "OnlineShop",
                table: "SupplierProduct",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EstimatedDelivery",
                schema: "OnlineShop",
                table: "SupplierProduct");

            migrationBuilder.AddColumn<DateTime>(
                name: "EntryDate",
                schema: "OnlineShop",
                table: "SupplierProduct",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "SupplierId",
                schema: "OnlineShop",
                table: "SupplierProduct",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_SupplierProduct_SupplierId",
                schema: "OnlineShop",
                table: "SupplierProduct",
                column: "SupplierId");

            migrationBuilder.AddForeignKey(
                name: "FK_SupplierProduct_Supplier_SupplierId",
                schema: "OnlineShop",
                table: "SupplierProduct",
                column: "SupplierId",
                principalSchema: "OnlineShop",
                principalTable: "Supplier",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
