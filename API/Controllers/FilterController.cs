using Application.Filter;
using Domain;
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
    public class FilterController : BaseController
    {
        [HttpGet("{category}")]
        [AllowAnonymous]
        public async Task<ActionResult<List<Product>>> List(string category)
        {
            return await Mediator.Send(new List.Command { Category = category });
        }
        [AllowAnonymous]
        [HttpGet("{category}/{searchText}")]
        public async Task<ActionResult<List<Product>>> Search(string category, string searchText)
        {
            return await Mediator.Send(new Search.Command { Category = category,SearchText=searchText });
        }
    }
}
