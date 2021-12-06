using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace FoodTruckProject.Models
{
    public class WishList
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("ApplicationUser")]
        public string UserId { get; set; }
        public string BusinessId { get; set; }

        public string BusinessName { get; set; }
    }
}
