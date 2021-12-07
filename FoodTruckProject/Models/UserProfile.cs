using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FoodTruckProject.Models
{
    public class UserProfile
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Allergies { get; set; }

        [ForeignKey("ApplicationUser")]
        public string UserId { get; set; }
        public string Diet { get; set; }
        public int FoodieRating { get; set; }
        public string FaveFood { get; set; }
       // public string FaveBusinessId { get; set; }
    }
}
