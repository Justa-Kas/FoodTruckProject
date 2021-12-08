using FoodTruckProject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace FoodTruckProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodTruckController : ControllerBase
    {
        [HttpGet("foodTruckAPI")]
        public FoodTruckAPI GetFoodTruckAPI(double lat, double lng)
        {
            HttpWebRequest request = WebRequest.CreateHttp($"https://api.yelp.com/v3/businesses/search?term=food trucks&latitude={lat}&longitude={lng}");
            request.Headers.Add("Authorization", "Bearer " + Secret.apiKey);
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            StreamReader rd = new StreamReader(response.GetResponseStream());
            string json = rd.ReadToEnd();
            rd.Close();

            try
            {
                FoodTruckAPI result = JsonConvert.DeserializeObject<FoodTruckAPI>(json);
                return result;
            }
            catch( Exception e)
            {
                FoodTruckAPI result = new FoodTruckAPI()
                {
                    businesses = { },
                    total = 0,
                    region = {
                    center =
                        {
                            longitude = 0,
                            latitude = 0
                        }
                    }
                };
                return result;
            }
        }

        [HttpGet("TruckDetails/{bid}")]
        public Business GetTruckDetails(string bid)
        {
            HttpWebRequest request = WebRequest.CreateHttp($"https://api.yelp.com/v3/businesses/{bid}");
            request.Headers.Add("Authorization", "Bearer " + Secret.apiKey);
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            StreamReader rd = new StreamReader(response.GetResponseStream());
            string json = rd.ReadToEnd();
            rd.Close();
            Business result = JsonConvert.DeserializeObject<Business>(json);
            return result;
        }
    }
}
