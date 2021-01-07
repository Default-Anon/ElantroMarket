using Application.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : BaseController
    {
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(Login.Command command)
        {
            return await Mediator.Send(command);
        }
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(Register.Command command)
        {
            return await Mediator.Send(command);
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<User>> GetCurrentUser()
        {
            return await Mediator.Send(new CurrentUser.Query());
        }

    }
}
