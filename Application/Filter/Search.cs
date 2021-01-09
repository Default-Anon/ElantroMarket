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

namespace Application.Filter
{
    public class Search
    {
        public class Command : IRequest<List<Product>>
        {
            public string Category { get; set; }
            public string SearchText { get; set; }
        }
        public class Handler : IRequestHandler<Command, List<Product>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<List<Product>> Handle(Command searchParameters,CancellationToken cancellationToken)
            {
                if(searchParameters.Category == "any")
                {
                    var list = await _context.Products.Where(x => x.Title.ToLower().Contains(searchParameters.SearchText.ToLower())).Include(x => x.Images).ToListAsync();
                    if (list != null)
                    {
                        return list;
                    }
                    throw new Exception("searchText or Category not found");
                }
                searchParameters.SearchText = searchParameters.SearchText.ToLower();
                var lstCategory = await _context.Products.Where(x => x.Category == searchParameters.Category)
                    .Where(x => x.Title.ToLower().Contains(searchParameters.SearchText.ToLower())).Include(x => x.Images).ToListAsync();
                if(lstCategory != null)
                {
                    return lstCategory;
                }
                throw new Exception("searchText or Category not found");
            }
        }
    }
}
