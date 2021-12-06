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
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class WishListController : ControllerBase
    {

        public ApplicationDbContext context;
        public WishListController(ApplicationDbContext _context)
        {
            context = _context;
        }

        //endpoints
        [HttpGet("wishlist")]
        public List<WishList> DisplayWishlist()
        {
            List<WishList> wishLists = new List<WishList>();
            //grabbed current logged in user
            ClaimsPrincipal currentUser = this.User;

            string currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
            return this.context.WishLists.Where(P => P.UserId == currentUserID).ToList();
        }

        [HttpPost("addToWishList")]

        public WishList addToWishList(string businessId, string businessName)
        {
            //grabbed current logged in user
            ClaimsPrincipal currentUser = this.User;

            string currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;

            WishList newWish = new WishList() { BusinessId = businessId, UserId = currentUserID, BusinessName=businessName };
            this.context.WishLists.Add(newWish);
            this.context.SaveChanges();
            return newWish;
        }

        [HttpDelete("deleteFromWishList/{Id}")]
        public WishList DeleteFromWishList(int Id)
        {
            ClaimsPrincipal currentUser = this.User;
            string currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
            WishList result = this.context.WishLists.ToList().Find(W => W.Id == Id && W.UserId == currentUserID);
            this.context.WishLists.Remove(result);
            this.context.SaveChanges();

            return result;
        }
    }
    }
