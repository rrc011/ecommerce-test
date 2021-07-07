using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using OnlineShop.EntityFrameworkCore;
using OnlineShop.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace OnlineShop.Web.Tests
{
    [DependsOn(
        typeof(OnlineShopWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class OnlineShopWebTestModule : AbpModule
    {
        public OnlineShopWebTestModule(OnlineShopEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(OnlineShopWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(OnlineShopWebMvcModule).Assembly);
        }
    }
}