using System.Threading.Tasks;
using OnlineShop.Models.TokenAuth;
using OnlineShop.Web.Controllers;
using Shouldly;
using Xunit;

namespace OnlineShop.Web.Tests.Controllers
{
    public class HomeController_Tests: OnlineShopWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}