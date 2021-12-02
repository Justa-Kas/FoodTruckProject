using FoodTruckProject.Data;
using FoodTruckProject.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace FoodTruckProject.Controllers
{   [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        public ApplicationDbContext context;

        public UserProfileController(ApplicationDbContext _context)
        {
            context = _context;
        }

        //endpoints
        [HttpGet("userProfile")]
        public UserProfile DisplayUserProfile()
        {
            //grabbed current logged in user
            ClaimsPrincipal currentUser = this.User;

            string currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
            return this.context.UserProfiles.First(P => P.UserId == currentUserID);
        }

        //[HttpPut("userProfile/update/{id}")]
        //public UserProfile UpdateUserProfile(int id)
        //{
        //    ClaimsPrincipal currentUser = this.User;

        //    string currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
        //}
    }
}
