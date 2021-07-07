using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace OnlineShop.Controllers
{
    public abstract class OnlineShopControllerBase: AbpController
    {
        protected OnlineShopControllerBase()
        {
            LocalizationSourceName = OnlineShopConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
