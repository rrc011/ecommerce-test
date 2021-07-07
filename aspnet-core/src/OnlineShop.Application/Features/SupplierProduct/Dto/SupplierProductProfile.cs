using AutoMapper;

namespace OnlineShop.Features.SupplierProduct.Dto
{
    public class SupplierProductProfile : Profile
    {
        public SupplierProductProfile()
        {
            CreateMap<Models.SupplierProduct, SupplierProductDto>()
                .ForMember(x => x.ProductName, opt => opt.MapFrom(e => e.Product.Name))
                .ForMember(x => x.ProductCode, opt => opt.MapFrom(e => e.Product.Code));
                
        }
    }
}
