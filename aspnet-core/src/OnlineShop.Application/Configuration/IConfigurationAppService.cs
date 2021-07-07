using System.Threading.Tasks;
using OnlineShop.Configuration.Dto;

namespace OnlineShop.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
