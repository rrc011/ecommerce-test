using Abp.Auditing;
using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineShop.Models
{
    [Audited]
    [Table("Order", Schema = "OnlineShop")]
    public class Order : FullAuditedEntity
    {
        public int UserId { get; set; }
        public string Address { get; set; }
        public DateTime BillingDate { get; set; }
        public virtual IEnumerable<OrderDetail> OrderDetails { get; set; }
    }
}
