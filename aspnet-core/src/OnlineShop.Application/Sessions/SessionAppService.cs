using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Abp.Auditing;
using OnlineShop.Authorization.Users;
using OnlineShop.Sessions.Dto;

namespace OnlineShop.Sessions
{
    public class SessionAppService : OnlineShopAppServiceBase, ISessionAppService
    {
        [DisableAuditing]
        public async Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations()
        {
            var output = new GetCurrentLoginInformationsOutput
            {
                Application = new ApplicationInfoDto
                {
                    Version = AppVersionHelper.Version,
                    ReleaseDate = AppVersionHelper.ReleaseDate,
                    Features = new Dictionary<string, bool>()
                }
            };

            if (AbpSession.TenantId.HasValue)
            {
                output.Tenant = ObjectMapper.Map<TenantLoginInfoDto>(await GetCurrentTenantAsync());
            }

            if (AbpSession.UserId.HasValue)
            {
                output.User = ObjectMapper.Map<UserLoginInfoDto>(await GetCurrentUserAsync());

                var roles = await GetRoles();

                output.RoleName = roles;
            }

            return output;
        }
    }
}
