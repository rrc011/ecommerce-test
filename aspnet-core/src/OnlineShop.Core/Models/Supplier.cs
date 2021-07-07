using Abp.Auditing;
using Abp.Domain.Entities.Auditing;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Models
{
    [Audited]
    [Table("Supplier", Schema = "OnlineShop")]
    public class Supplier : FullAuditedEntity
    {
        public string Name { get; set; }
        public string RNC { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
    }
}
