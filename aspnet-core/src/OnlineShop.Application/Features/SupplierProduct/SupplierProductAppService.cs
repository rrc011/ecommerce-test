using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Extensions;
using Abp.Linq.Extensions;
using Microsoft.EntityFrameworkCore;
using OnlineShop.Authorization;
using OnlineShop.Authorization.Users;
using OnlineShop.Features.SupplierProduct.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.Features.SupplierProduct
{
    [AbpAuthorize(PermissionNames.Pages_ProductToSupply)]
    public class SupplierProductAppService : AsyncCrudAppService<Models.SupplierProduct, SupplierProductDto, int, GetAllSupplierProductInput>
    {
        private readonly IRepository<User, long> userRepository;
        private readonly IRepository<Models.Product> productRepository;

        public SupplierProductAppService(IRepository<Models.SupplierProduct, int> repository, 
            IRepository<User, long> userRepository, IRepository<Models.Product> productRepository) : base(repository)
        {
            this.userRepository = userRepository;
            this.productRepository = productRepository;
        }

        protected override IQueryable<Models.SupplierProduct> CreateFilteredQuery(GetAllSupplierProductInput input)
        {
            return base.CreateFilteredQuery(input).Include(x => x.Product)
                .WhereIf(!input.keywords.IsNullOrWhiteSpace(), x => x.Product.Name.Contains(input.keywords) || 
                                                                    x.Product.Code.Contains(input.keywords))
                .WhereIf(input.Quantity.HasValue, x => x.Quantity >= input.Quantity)
                .WhereIf(input.EstimatedDelivery.HasValue, x => x.EstimatedDelivery <= calculateEstimatedTime(input.EstimatedDelivery))
                .WhereIf(input.userId.HasValue, x => x.CreatorUserId == input.userId);
        }

        public override async Task<PagedResultDto<SupplierProductDto>> GetAllAsync(GetAllSupplierProductInput input)
        {
            var list = await base.GetAllAsync(input);

            list.Items.ToList().ForEach(getSupplierName);

            return list;
        }

        public override async Task<SupplierProductDto> GetAsync(EntityDto<int> input)
        {
            var result = await Repository.GetAll()
                                         .Include(x => x.Product)
                                         .FirstOrDefaultAsync(x => x.Id == input.Id);
            return MapToEntityDto(result);
        }

        public IEnumerable<SupplierProductDto> getAllWithoutPagination()
        {
            var list = Repository.GetAll().Include(x => x.Product).Where(x => !x.IsDeleted)
                .Select(MapToEntityDto).ToList();

            return list;
        }

        public async Task Supply(int supplierProductId, double quantity)
        {
            var supplierProduct = await Repository.GetAsync(supplierProductId);
            supplierProduct.Quantity -= quantity;
            await Repository.UpdateAsync(supplierProduct);

            var product = await productRepository.GetAsync(supplierProduct.ProductId);
            product.Stock += quantity;
            await productRepository.UpdateAsync(product);
        }


        #region Private methods

        private int calculateEstimatedTime(DateTime? EstimatedDelivery)
        {
            var currentDate = DateTime.Now;
            return Convert.ToInt32((EstimatedDelivery - currentDate).Value.TotalDays);
        }

        private void getSupplierName(SupplierProductDto item)
        {
            var user = userRepository.Get((long)item.CreatorUserId);
            item.SupplierName = user.FullName;
        }

        #endregion
    }
}
