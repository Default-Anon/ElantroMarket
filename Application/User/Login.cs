using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
namespace Application.User
{
    public class Login
    {
        public class Command : IRequest<User>
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }
        public class Handler : IRequestHandler<Command,User>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly SignInManager<AppUser> _signInManager;
            private readonly IJwtGenerator _jwtGenerator;

            public Handler(UserManager<AppUser> userManager,SignInManager<AppUser> signInManager,IJwtGenerator jwtGenerator)
            {
                _userManager = userManager;
                _signInManager = signInManager;
                _jwtGenerator = jwtGenerator;
            }
            public async Task<User> Handle(Command request,CancellationToken cancellationToken)
            {
                AppUser user = await _userManager.FindByEmailAsync(request.Email);
                if(user == null)
                {
                    throw new Exception("Email not found");
                }
                var res = await _signInManager.CheckPasswordSignInAsync(user,request.Password,false);
                if (res.Succeeded)
                {
                    return new User
                    {
                        DisplayName = user.DisplayName,
                        Image = null,
                        Username = user.UserName,
                        Token = _jwtGenerator.CreateToken(user)
                    };
                }
                throw new Exception("Invalid password");

        }
            }
    }
}
