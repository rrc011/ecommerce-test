using Abp.Auditing;
using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Models
{
    [Audited]
    [Table("Product", Schema = "OnlineShop")]
    public class Product : FullAuditedEntity
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public decimal Price { get; set; }
        public double Stock { get; set; }
        public int CategoryId { get; set; }
        public virtual Category Category { get; set; }
    }
}
