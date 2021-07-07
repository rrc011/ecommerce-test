using System.Threading.Tasks;
using Abp.Application.Services;
using OnlineShop.Sessions.Dto;

namespace OnlineShop.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
