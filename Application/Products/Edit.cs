using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Domain;

namespace Application.Products
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string Title { get; set; }

            public string Name { get; set; }

            public string Description { get; set; }

            public string Price { get; set; }

            public List<Image> Images { get; set; }
            public string Category { get; set; }
            public string MainImage { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var editedProduct = await _context.Products.SingleOrDefaultAsync(x => x.ProductId == request.Id);
                if(editedProduct == null)
                {
                    throw new Exception("Edit: Error, Id not found");
                }
                editedProduct.Title = request.Title ?? editedProduct.Title;
                editedProduct.Price = request.Price ?? editedProduct.Price;
                editedProduct.Name = request.Name ?? editedProduct.Name;
                editedProduct.MainImage = request.MainImage ?? editedProduct.MainImage;
                editedProduct.Images = request.Images ?? editedProduct.Images;
                editedProduct.Category = request.Category ?? editedProduct.Category;
                editedProduct.Description = request.Description ?? editedProduct.Description;
                var result = await _context.SaveChangesAsync() > 0;
                if (result)
                {
                    return Unit.Value;
                }
                throw new Exception("Edit: Saved changes error");
            }
        }
    }
}
