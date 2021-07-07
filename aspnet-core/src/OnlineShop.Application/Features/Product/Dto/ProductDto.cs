using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OnlineShop.Features.Category.Dto;

namespace OnlineShop.Features.Product.Dto
{
    [AutoMap(typeof(Models.Product))]
    public class ProductDto : EntityDto
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public decimal Price { get; set; }
        public double Stock { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
    }
}
