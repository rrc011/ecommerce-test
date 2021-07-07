using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.Extensions;
using Abp.Linq.Extensions;
using OnlineShop.Authorization;
using OnlineShop.Features.Category.Dto;
using System.Collections.Generic;
using System.Linq;

namespace OnlineShop.Features.Category
{
    [AbpAuthorize(PermissionNames.Pages_Category)]
    public class CategoryAppService : AsyncCrudAppService<Models.Category, CategoryDto, int, GetAllCategoryInput>
    {
        public CategoryAppService(IRepository<Models.Category, int> repository) : base(repository)
        {
        }

        protected override IQueryable<Models.Category> CreateFilteredQuery(GetAllCategoryInput input)
        {
            return base.CreateFilteredQuery(input).WhereIf(!input.keywords.IsNullOrWhiteSpace(), x => x.Name.Contains(input.keywords));
        }

        [UnitOfWork]
        public virtual IEnumerable<CategoryDto> getAllWithoutPagination()
        {
            var list = Repository.GetAll().Where(x => !x.IsDeleted).Select(MapToEntityDto).OrderBy(x => x.Name).ToList();
            return list;
        }
    }
}
