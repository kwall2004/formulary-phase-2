// ***********************************************************************
// Assembly         : AtlasWebApi
// Author           : b1454
// Created          : 05-02-2016
//
// Last Modified By : b1454
// Last Modified On : 05-03-2016
// ***********************************************************************
// <copyright file="Global.asax.cs" company="">
//     Copyright ©  2016
// </copyright>
// <summary></summary>
// ***********************************************************************
using Newtonsoft.Json;
using NLog;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.Security;
using System.Web.SessionState;

namespace AtlasWebApi
{
    /// <summary>
    /// Class WebApiApplication.
    /// </summary>
    public class WebApiApplication : System.Web.HttpApplication
    {
        private Logger _logger = LogManager.GetCurrentClassLogger();

        /// <summary>
        /// Application_s the start.
        /// </summary>
        protected void Application_Start()
        {
            var cors = new EnableCorsAttribute("http://localhost:1841,http://dev.atlascomplete.local", "*", "*");
            GlobalConfiguration.Configuration.EnableCors(cors);

            var jsonSerializertSettings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                PreserveReferencesHandling = PreserveReferencesHandling.Objects
            };

          
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings = jsonSerializertSettings;

            AreaRegistration.RegisterAllAreas();
            UnityConfig.RegisterComponents();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

        }
        /// <summary>
        /// Applications Error
        /// </summary>
        /// <param name="sender">Sender</param>
        /// <param name="e">Arguments</param>
        protected void Application_Error(Object sender, EventArgs e)
        {
            Exception ex = Server.GetLastError();
            _logger.Log(LogLevel.Fatal, ex, ex.Message);
        }
    }
}
