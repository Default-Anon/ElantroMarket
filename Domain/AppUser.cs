using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class AppUser : IdentityUser
    {
        [Required]
        public string Role { get; set; }
        public string DisplayName { get; set; }
    }
}
