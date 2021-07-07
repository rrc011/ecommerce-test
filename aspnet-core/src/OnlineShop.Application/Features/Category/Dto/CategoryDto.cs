using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System.Collections.Generic;

namespace OnlineShop.Features.Category.Dto
{
    [AutoMap(typeof(Models.Category))]
    public class CategoryDto : EntityDto
    {
        public string Name { get; set; }
        public virtual IEnumerable<Models.Product> Products { get; set; }
    }
}
