using System.Threading.Tasks;
using Abp.Application.Services;
using OnlineShop.Authorization.Accounts.Dto;

namespace OnlineShop.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
