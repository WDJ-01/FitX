using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserApi.Migrations.UserDb
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    User_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    User_username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    User_firstname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    User_lastname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    User_email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    User_mobile = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    User_phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    User_address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    User_password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    User_cart_id = table.Column<int>(type: "int", nullable: true),
                    User_favorites_id = table.Column<int>(type: "int", nullable: true),
                    User_token = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    User_password_salt = table.Column<byte[]>(type: "varbinary(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.User_id);
                });

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
