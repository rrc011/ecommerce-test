using Abp.Application.Services.Dto;

namespace OnlineShop.Features.Product.Dto
{
    public class GetAllProductInput : PagedAndSortedResultRequestDto
    {
        public string keywords { get; set; }
        public int? CategoryId { get; set; }
    }
}
