using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using Microsoft.EntityFrameworkCore;
using OnlineShop.Authorization;
using OnlineShop.Features.Product.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShop.Features.Product
{
    public class ProductAppService : AsyncCrudAppService<Models.Product, ProductDto, int, GetAllProductInput>
    {
        public ProductAppService(IRepository<Models.Product, int> repository) : base(repository)
        {
            GetAllPermissionName = PermissionNames.Product_Get;
            GetPermissionName = PermissionNames.Product_Get;
        }

        protected override IQueryable<Models.Product> CreateFilteredQuery(GetAllProductInput input)
        {
            return base.CreateFilteredQuery(input)
                       .Include(x => x.Category)
                       .WhereIf(!input.keywords.IsNullOrWhiteSpace(), x => x.Name.Contains(input.keywords) ||
                                                                           x.Code.Contains(input.keywords))
                       .WhereIf(input.CategoryId.HasValue, x => x.CategoryId == input.CategoryId);
        }

        public override Task<ProductDto> CreateAsync(ProductDto input)
        {
            return base.CreateAsync(input);
        }

        public string GenerateProductCode()
        {
            return Guid.NewGuid().ToString();
        }
    }
}
