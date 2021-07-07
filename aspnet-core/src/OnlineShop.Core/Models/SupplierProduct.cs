using Abp.Auditing;
using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Models
{
    [Audited]
    [Table("SupplierProduct", Schema = "OnlineShop")]
    public class SupplierProduct : FullAuditedEntity
    {
        public int ProductId { get; set; }
        public virtual Product Product { get; set; }
        public double Quantity { get; set; }
        public decimal Price { get; set; }
        public int EstimatedDelivery { get; set; }
    }
}
