using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Filter
{
    public class List
    {
        public class Command: IRequest<List<Product>>
        {
            public string Category { get; set; }
        }
        public class Handler : IRequestHandler<Command, List<Product>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<List<Product>> Handle(Command filter,CancellationToken cancellationToken)
            {
                var list = await _context.Products.Where(x => x.Category == filter.Category).Include(x => x.Images).ToListAsync();
                if(list == null)
                {
                    throw new Exception("Error: category not found");
                }
                return list;
            }
        }
    }
}
