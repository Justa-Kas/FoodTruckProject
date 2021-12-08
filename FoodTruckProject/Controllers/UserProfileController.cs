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
        [HttpGet("profile")]
        public UserProfile DisplayUserProfile()
        {
            //grabbed current logged in user
            ClaimsPrincipal currentUser = this.User;
            string currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
            return this.context.UserProfiles.First(P => P.UserId == currentUserID);
        }

        [HttpPost("new_profile")]
        public UserProfile NewProfile(string name, string allergies, string diet, int foodieRating, string favFood)
        {
            //grabbed current logged in user
            ClaimsPrincipal currentUser = this.User;
            string currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;

            UserProfile newUser = new UserProfile()
            {
                Name = name,
                Allergies = allergies,
                UserId = currentUserID,
                Diet = diet,
                FoodieRating = foodieRating,
                FaveFood = favFood
            };

            this.context.UserProfiles.Add(newUser);
            this.context.SaveChanges();
            return newUser;
        }

        [HttpGet("isUser")]
        public bool checkForUser(string userid)
        {
            return this.context.UserProfiles.Any(P => P.UserId == userid);
        }

        [HttpPut("update")]
        public UserProfile UpdateUserProfile(string name, string allergies, string diet, int foodieRating, string faveFood)
        {
            ClaimsPrincipal currentUser = this.User;
            string currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
            UserProfile updatedProfile = context.UserProfiles.Where(P => P.UserId == currentUserID).Single();
            updatedProfile.Name = name;
            updatedProfile.Allergies = allergies;
            updatedProfile.Diet = diet;
            updatedProfile.FoodieRating = foodieRating;
            updatedProfile.FaveFood = faveFood;

            context.UserProfiles.Update(updatedProfile);
            context.SaveChanges();

            return updatedProfile;
        }

    }
}
