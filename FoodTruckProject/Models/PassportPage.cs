using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FoodTruckProject.Models
{
    public class PassportPage
    {
        [Key]
        public int Id { get; set; }
        public string BusinessId { get; set; }
        public string BusinessName { get; set; }
        [ForeignKey("ApplicationUser")]
        public string UserId { get; set; }
        public int Rating { get; set; }
        public string FoodEaten { get; set; }
        public string Experience { get; set; }
        public DateTime DateVisited { get; set; }
        public string Picture { get; set; }

    }
}
