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
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                var deleteProduct = await _context.Products.FirstOrDefaultAsync(x => x.ProductId == command.Id);
                if(deleteProduct == null)
                {
                    throw new Exception("Delete: Object id not found");
                }
                _context.Products.Remove(deleteProduct);
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
