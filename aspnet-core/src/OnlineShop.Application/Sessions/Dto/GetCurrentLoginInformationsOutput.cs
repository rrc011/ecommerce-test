using System.Collections.Generic;

namespace OnlineShop.Sessions.Dto
{
    public class GetCurrentLoginInformationsOutput
    {
        public ApplicationInfoDto Application { get; set; }

        public UserLoginInfoDto User { get; set; }

        public TenantLoginInfoDto Tenant { get; set; }

        public IEnumerable<string> RoleName { get; set; }
    }
}
