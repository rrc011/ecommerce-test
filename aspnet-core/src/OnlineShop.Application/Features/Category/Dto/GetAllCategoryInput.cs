using Abp.Application.Services.Dto;

namespace OnlineShop.Features.Category.Dto
{
    public class GetAllCategoryInput : PagedAndSortedResultRequestDto
    {
        public string keywords { get; set; }
    }
}
