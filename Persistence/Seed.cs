using Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (!context.Products.Any())
            {
                var products = new List<Product>
                {
                    new Product
                    {
                        Id = Guid.NewGuid(),
                        Description = "Good gadget for home",
                        Category = "pylesos",
                        Image = null,
                        Name = "LG 104-32 Model B",
                        Price = "25000",
                        Title = "Mochnii pylesos lg"
                    },
                    new Product
                    {
                        Id = Guid.NewGuid(),
                        Description = "Do not be afraid,lets go buy ",
                        Category = "rab",
                        Image = null,
                        Name = "Nigger Model B2",
                        Price = "5000",
                        Title = "Mochnii nigger for plantation"
                    },
                    new Product
                    {
                        Id = Guid.NewGuid(),
                        Description = "I am not what you want fool",
                        Category = "Computers",
                        Image = null,
                        Name = "SONY Computer",
                        Price = "50000",
                        Title = "Sony computer high level class"
                    },
                    new Product
                    {
                        Id = Guid.NewGuid(),
                        Description = "Good gadget for work and games",
                        Category = "Phone",
                        Image = null,
                        Name = "Nokia 8.3",
                        Price = "28500",
                        Title = "Nokia 8.3 5G"
                    }
                };
                await context.Products.AddRangeAsync(products);
                var result = await context.SaveChangesAsync() > 0;
                if (!result)
                {
                    throw new Exception("Database save changes Error");
                }
            }
        }
    }
}
