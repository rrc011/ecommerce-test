using Abp.Auditing;
using Abp.Domain.Entities.Auditing;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Models
{
    [Audited]
    [Table("Category", Schema = "OnlineShop")]
    public class Category : FullAuditedEntity
    {
        public string Name { get; set; }
        public virtual IEnumerable<Product> Products { get; set; }
    }
}
