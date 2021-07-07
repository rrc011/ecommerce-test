using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using OnlineShop.Configuration.Dto;

namespace OnlineShop.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : OnlineShopAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
