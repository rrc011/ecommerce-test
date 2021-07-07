using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace OnlineShop.EntityFrameworkCore
{
    public static class OnlineShopDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<OnlineShopDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<OnlineShopDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
