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

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest
        {
            public string Name { get; set; }
            
            public string Body { get; set; }
            public Guid ProductId { get; set; }
        }
        public class Handler: IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Unit> Handle(Command comment,CancellationToken cancellationToken)
            {
                var product = await _context.Products.Where(x => x.ProductId == comment.ProductId).SingleAsync();
                if(product == null)
                {
                    throw new Exception("product: Id not found");
                }
                var commentUnity = new Comment
                {
                    Id = Guid.NewGuid(),
                    Body = comment.Body,
                    Name = comment.Name,
                    ProductId = comment.ProductId,
                    Product = product
                };
                _context.Comments.Add(commentUnity);
                var res = await _context.SaveChangesAsync() > 0;
                if (res)
                {
                    return Unit.Value;
                }
                throw new Exception("Comment: db save changes error");
            }
        }
    }
}
