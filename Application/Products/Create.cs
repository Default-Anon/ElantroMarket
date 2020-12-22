using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Products
{
    public class Create
    { 
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }

            public string Name { get; set; }

            public string Description { get; set; }

            public string Price { get; set; }

            public string Image { get; set; }
            public string Category { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command command,CancellationToken cancellation)
            {
                var product = new Product
                {
                    Id = command.Id,
                    Description = command.Description,
                    Category = command.Category,
                    Image = command.Image,
                    Name = command.Name,
                    Price = command.Price,
                    Title = command.Title
                };
                _context.Products.Add(product);
                var res = await _context.SaveChangesAsync() > 0;
                if (res)
                {
                    return Unit.Value;
                }
                throw new Exception("Database save changes error");
            }
        }
    }
}
