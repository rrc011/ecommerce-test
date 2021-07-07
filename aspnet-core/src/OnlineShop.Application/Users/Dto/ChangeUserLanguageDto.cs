using System.ComponentModel.DataAnnotations;

namespace OnlineShop.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}