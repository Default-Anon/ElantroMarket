using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Products
{
    public class Details
    {
        public class Query : IRequest<Product> {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Product>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Product> Handle(Query query,CancellationToken cancellationToken)
            {
                var product = await _context.Products.Where(x => x.ProductId == query.Id).Include(collection => collection.Images).SingleAsync();
                if(product == null)
                {
                    throw new Exception("Id not found");
                }
                return product;
            }
        }
    }
}
