using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OnlineShop.Features.Product.Dto;

namespace OnlineShop.Features.SupplierProduct.Dto
{
    [AutoMap(typeof(Models.SupplierProduct))]
    public class SupplierProductDto : EntityDto
    {
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductCode { get; set; }
        public double Quantity { get; set; }
        public decimal Price { get; set; }
        public int EstimatedDelivery { get; set; }
        public string SupplierName { get; set; }
        public long? CreatorUserId { get; set; }
    }
}
