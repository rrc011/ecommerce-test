using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Abp.Application.Services;
using Abp.IdentityFramework;
using Abp.Runtime.Session;
using OnlineShop.Authorization.Users;
using OnlineShop.MultiTenancy;
using System.Collections.Generic;

namespace OnlineShop
{
    /// <summary>
    /// Derive your application services from this class.
    /// </summary>
    public abstract class OnlineShopAppServiceBase : ApplicationService
    {
        public TenantManager TenantManager { get; set; }

        public UserManager UserManager { get; set; }

        protected OnlineShopAppServiceBase()
        {
            LocalizationSourceName = OnlineShopConsts.LocalizationSourceName;
        }

        protected virtual async Task<User> GetCurrentUserAsync()
        {
            var user = await UserManager.FindByIdAsync(AbpSession.GetUserId().ToString());
            if (user == null)
            {
                throw new Exception("There is no current user!");
            }

            return user;
        }

        protected virtual async Task<IList<string>> GetRoles()
        {
            var user = await UserManager.FindByIdAsync(AbpSession.UserId.ToString());
            return await UserManager.GetRolesAsync(user);
        }

        protected virtual Task<Tenant> GetCurrentTenantAsync()
        {
            return TenantManager.GetByIdAsync(AbpSession.GetTenantId());
        }

        protected virtual void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
