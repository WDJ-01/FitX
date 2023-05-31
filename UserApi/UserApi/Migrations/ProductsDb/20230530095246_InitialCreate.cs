using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Products_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Category_id_ref = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Products_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Products_price = table.Column<int>(type: "int", nullable: false),
                    Products_desc = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Products_cover = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Products_id);
                });

            migrationBuilder.InsertData(
              table: "Products",
              columns: new[] { "Category_id_ref", "Products_name", "Products_price", "Products_desc", "Products_cover"},
              values: new object[] { "men", "Shirt", 25 , "white/slim fit", "../../../assets/images/mens/men2" });

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
