using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.User
{
    public class CurrentUser
    {
        public class Query : IRequest<User> { }
        public class Handler: IRequestHandler<Query,User>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;

            public Handler(IUserAccessor userAccessor,UserManager<AppUser> userManager,IJwtGenerator jwtGenerator)
            {
                _userAccessor = userAccessor;
                _userManager = userManager;
                _jwtGenerator = jwtGenerator;
            }
            public async Task<User> Handle(Query request,CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync(_userAccessor.GetCurrentUserName());
                var random = new Random();
                return new User
                {
                    Image = null,
                    Username = user.UserName,
                    Role = user.Role,
                    Bonus = (2 + random.Next(10)).ToString() + "%"
                };
            }
        }
    }
}
