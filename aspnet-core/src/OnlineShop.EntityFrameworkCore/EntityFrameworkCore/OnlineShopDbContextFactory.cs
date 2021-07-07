using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using OnlineShop.Configuration;
using OnlineShop.Web;

namespace OnlineShop.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class OnlineShopDbContextFactory : IDesignTimeDbContextFactory<OnlineShopDbContext>
    {
        public OnlineShopDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<OnlineShopDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            OnlineShopDbContextConfigurer.Configure(builder, configuration.GetConnectionString(OnlineShopConsts.ConnectionStringName));

            return new OnlineShopDbContext(builder.Options);
        }
    }
}
