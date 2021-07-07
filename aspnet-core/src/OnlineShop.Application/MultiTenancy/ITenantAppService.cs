using Abp.Application.Services;
using OnlineShop.MultiTenancy.Dto;

namespace OnlineShop.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

