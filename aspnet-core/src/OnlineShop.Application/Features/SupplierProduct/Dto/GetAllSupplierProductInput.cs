using Abp.Application.Services.Dto;
using System;

namespace OnlineShop.Features.SupplierProduct.Dto
{
    public class GetAllSupplierProductInput : PagedAndSortedResultRequestDto
    {
        public string keywords { get; set; }
        public double? Quantity { get; set; }
        public DateTime? EstimatedDelivery { get; set; }
        public long? userId { get; set; }
    }
}
