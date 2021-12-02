using FoodTruckProject.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodTruckProject.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {

        public DbSet<PassportPage> PassportPages { get; set; }

        public DbSet<UserProfile> UserProfiles { get; set; }

        public DbSet<WishList> WishLists { get; set; }
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }
    }
}
