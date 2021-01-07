using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<Image> Images { get; set; }
        public DataContext(DbContextOptions options)
            : base(options) { }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<AppUser>()
                .Property(user => user.Role).HasDefaultValue("Client");
            builder.Entity<Image>()
                .HasOne(p => p.Product)
                .WithMany(b => b.Images)
                .HasForeignKey(k => k.ProductId);
        }
    }
}
