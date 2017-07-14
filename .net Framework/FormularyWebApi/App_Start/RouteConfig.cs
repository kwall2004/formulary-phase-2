// ***********************************************************************
// Assembly         : AtlasWebApi
// Author           : b1454
// Created          : 05-02-2016
//
// Last Modified By : b1454
// Last Modified On : 05-02-2016
// ***********************************************************************
// <copyright file="RouteConfig.cs" company="">
//     Copyright ©  2016
// </copyright>
// <summary>Class to register MVC Routing</summary>
// ***********************************************************************
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace AtlasWebApi
{
    /// <summary>
    /// Class RouteConfig.
    /// </summary>
    public static class RouteConfig
    {
        /// <summary>
        /// Registers the routes.
        /// </summary>
        /// <param name="routes">The routes.</param>
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
