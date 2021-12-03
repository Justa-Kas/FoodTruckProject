﻿using FoodTruckProject.Data;
using FoodTruckProject.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;

namespace FoodTruckProject.Controllers
{   //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PassportPageController : ControllerBase
    {
        public ApplicationDbContext context;

        public PassportPageController(ApplicationDbContext _context)
        {
            context = _context;
        }
        //--------------------YELP ENDPOINTS----------------------------------------------------------!!//
        //endpoints

        [HttpGet("foodTruckAPI")]
        public FoodTruckAPI GetFoodTruckAPI(double lat, double lng)
        {
            HttpWebRequest request = WebRequest.CreateHttp($"https://api.yelp.com/v3/businesses/search?term=food trucks&latitude={lat}&longitude={lng}");
            request.Headers.Add("Authorization", "Bearer " + Secret.apiKey);
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            StreamReader rd = new StreamReader(response.GetResponseStream());
            string json = rd.ReadToEnd();
            rd.Close();
            FoodTruckAPI result = JsonConvert.DeserializeObject<FoodTruckAPI>(json);
            return result;
        }

        //----------PASSPORT ENDPOINTS-----------------------------------------------------------------
        [HttpGet("allPages")]
        public List<PassportPage> DisplayAllPages()
        {
            //grabbed current logged in user
            ClaimsPrincipal currentUser = this.User;

            string currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
            return this.context.PassportPages.Where(P => P.UserId == currentUserID).ToList();
        }

        [HttpGet("date/{dateVisited}")]
        public List<PassportPage> DisplayByDateVisited(DateTime date)
        {
            //grabbed current logged in user
            ClaimsPrincipal currentUser = this.User;

            string currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
            return this.context.PassportPages.Where(P => P.UserId == currentUserID && P.DateVisited == date).ToList();
        }

        [HttpGet("businessName/{name}")]
        public List<PassportPage> DisplayByBusinessName(string name)
        {
            //grabbed current logged in user
            ClaimsPrincipal currentUser = this.User;

            string currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
            return this.context.PassportPages.Where(P => P.UserId == currentUserID && P.BusinessName == name).ToList();
        }

        [HttpPost("addPassportPage")]

        public PassportPage addPassportPage(string businessId, string businessName,int rating, string foodEaten, string experience, DateTime dateVisited)
        {
            //grabbed current logged in user
            ClaimsPrincipal currentUser = this.User;

            string currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;

            PassportPage newPage = new PassportPage() { BusinessId = businessId, BusinessName = businessName, Rating = rating, FoodEaten= foodEaten, Experience = experience, DateVisited = dateVisited, UserId = currentUserID };
            this.context.PassportPages.Add(newPage);
            this.context.SaveChanges();
            return newPage;
        }

        [HttpDelete("DeletePassportPage/{id}")]
        public PassportPage DeletePassportPage(int id)
        {
            ClaimsPrincipal currentUser = this.User;
            string currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
            PassportPage result = this.context.PassportPages.ToList().Find(P => P.Id == id && P.UserId == currentUserID);
            this.context.PassportPages.Remove(result);
            this.context.SaveChanges();

            return result;
        }


        //[HttpGet("pageNumber/{id}")]
        //public List<PassportPage> DisplayByPageNumber(int id)
        //{
        //    //grabbed current logged in user
        //    ClaimsPrincipal currentUser = this.User;

        //    string currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
        //    return this.context.PassportPages.Where(P => P.UserId == currentUserID &&  == name).ToList();
        //}









    }
}
