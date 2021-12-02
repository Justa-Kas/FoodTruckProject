﻿using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodTruckProject.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ICollection<PassportPage> PassportPages { get; set; }

    }
}
