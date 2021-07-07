using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

namespace OnlineShop.Authorization
{
    public class OnlineShopAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            context.CreatePermission(PermissionNames.Pages_Users, L("Users"));
            context.CreatePermission(PermissionNames.Pages_Roles, L("Roles"));
            context.CreatePermission(PermissionNames.Pages_ProductToSupply, L("Product To Supply"));
            context.CreatePermission(PermissionNames.Pages_Category, L("Category"));
            context.CreatePermission(PermissionNames.Pages_Product, L("Product"));
            context.CreatePermission(PermissionNames.Product_Get, L("Consult Products"));
            context.CreatePermission(PermissionNames.Product_Checkout, L("Checkout Products"));
            context.CreatePermission(PermissionNames.Pages_Supplying, L("Supplying"));
            context.CreatePermission(PermissionNames.Pages_Tenants, L("Tenants"), multiTenancySides: MultiTenancySides.Host);
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, OnlineShopConsts.LocalizationSourceName);
        }
    }
}
