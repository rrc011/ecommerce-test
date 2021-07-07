using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using OnlineShop.Authorization.Roles;
using OnlineShop.Authorization.Users;
using OnlineShop.MultiTenancy;
using OnlineShop.Models;

namespace OnlineShop.EntityFrameworkCore
{
    public class OnlineShopDbContext : AbpZeroDbContext<Tenant, Role, User, OnlineShopDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<Product> Product { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<SupplierProduct> SupplierProduct { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<OrderDetail> OrderDetail { get; set; }

        public OnlineShopDbContext(DbContextOptions<OnlineShopDbContext> options)
            : base(options)
        {
        }
    }
}
