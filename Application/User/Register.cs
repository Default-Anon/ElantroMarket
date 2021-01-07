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
    public class Register
    {
        public class Command : IRequest<User>
        {
            public string Username { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
        }
        public class Handler : IRequestHandler<Command,User>
        {
            private readonly DataContext _context;
            private readonly UserManager<AppUser> _userManager;
            private readonly IJwtGenerator _jwtGenerator;

            public Handler(DataContext context,UserManager<AppUser> userManager,IJwtGenerator jwtGenerator)
            {
                _context = context;
                _userManager = userManager;
                _jwtGenerator = jwtGenerator;
            }
            public async Task<User> Handle(Command user,CancellationToken cancellationToken)
            {
                if(await _context.Users.Where(x => x.UserName == user.Username).AnyAsync())
                {
                    throw new Exception("Username is already in use");
                }
                if(await _context.Users.Where(x => x.Email == user.Email).AnyAsync())
                {
                    throw new Exception("Email is already in use");
                }
                var usr = new AppUser
                {
                    Email = user.Email,
                    UserName = user.Username
                };
                var createStatus = await _userManager.CreateAsync(usr,user.Password);
                if (createStatus.Succeeded)
                {
                    return new User
                    {
                        Image = null,
                        Token = _jwtGenerator.CreateToken(usr),
                        Username = usr.UserName
                    };
                }
                throw new Exception("Account:\t Create Error");
            }
        }
    }
}
