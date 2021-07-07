using Abp.Authorization;
using OnlineShop.Authorization.Roles;
using OnlineShop.Authorization.Users;

namespace OnlineShop.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
