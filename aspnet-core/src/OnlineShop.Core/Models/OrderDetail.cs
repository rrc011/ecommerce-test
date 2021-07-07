using Abp.Auditing;
using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Models
{
    [Audited]
    [Table("OrderDetail", Schema = "OnlineShop")]
    public class OrderDetail : FullAuditedEntity
    {
        public int OrderId { get; set; }
        public virtual Order Order { get; set; }
        public int ProductId { get; set; }
        public virtual Product Product { get; set; }
        public double Quantity { get; set; }
        public decimal Price { get; set; }
        public decimal Itbis { get; set; }
        public decimal SubTotal { get; set; }
        public decimal Total { get; set; }
        public decimal Amount { get; set; }
    }
}
