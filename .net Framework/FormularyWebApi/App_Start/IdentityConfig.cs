// ***********************************************************************
// Assembly         : AtlasWebApi
// Author           : b1454
// Created          : 05-02-2016
//
// Last Modified By : b1454
// Last Modified On : 05-03-2016
// ***********************************************************************
// <copyright file="IdentityConfig.cs" company="">
//     Copyright ©  2016
// </copyright>
// <summary>Configure the application user manager used in this application. UserManager is defined in ASP.NET Identity and is used by the application.</summary>
// ***********************************************************************
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using AtlasWebApi.Models;

namespace AtlasWebApi
{
    // Configure the application user manager used in this application. UserManager is defined in ASP.NET Identity and is used by the application.

    /// <summary>
    /// Class IdentityConfig.
    /// </summary>
    public class IdentityConfig : UserManager<ApplicationUser>
    {
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="store">The store.</param>
        public IdentityConfig(IUserStore<ApplicationUser> store)
            : base(store)
        {
        }

        /// <summary>
        /// Creates the specified options.
        /// </summary>
        /// <param name="options">The options.</param>
        /// <param name="context">The context.</param>
        /// <returns>IdentityConfig.</returns>
        public static IdentityConfig Create(IdentityFactoryOptions<IdentityConfig> options, IOwinContext context)
        {
            var manager = new IdentityConfig(new UserStore<ApplicationUser>(context.Get<ApplicationDBContext>()));
            // Configure validation logic for usernames
            manager.UserValidator = new UserValidator<ApplicationUser>(manager)
            {
                AllowOnlyAlphanumericUserNames = false,
                RequireUniqueEmail = true
            };
            // Configure validation logic for passwords
            manager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 6,
                RequireNonLetterOrDigit = true,
                RequireDigit = true,
                RequireLowercase = true,
                RequireUppercase = true,
            };
            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                manager.UserTokenProvider = new DataProtectorTokenProvider<ApplicationUser>(dataProtectionProvider.Create("ASP.NET Identity"));
            }
            return manager;
        }
    }
}
