using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace OnlineShop.Features.Product.Dto
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            CreateMap<Models.Product, ProductDto>()
                .ForMember(x => x.CategoryName, opt => opt.MapFrom(m => m.Category.Name));
        }
    }
}
