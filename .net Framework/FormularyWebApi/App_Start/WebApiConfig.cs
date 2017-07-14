// ***********************************************************************
// Assembly         : AtlasWebAPI
// Author           : b1454
// Created          : 05-02-2016
//
// Last Modified By : b1454
// Last Modified On : 05-03-2016
// ***********************************************************************
// <copyright file="WebApiConfig.cs" company="">
//     Copyright ©  2016
// </copyright>
// <summary>WebAPI Confiuguration Class</summary>
// ***********************************************************************
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using System.Web.Mvc;
using System.Web.Http.Cors;
using System.Net.Http.Formatting;
using Newtonsoft.Json;
using AtlasWebApi.Areas.HelpPage;
using System.Web;

namespace AtlasWebApi
{
    /// <summary>
    /// Class WebApiConfig.
    /// </summary>
    public static class WebApiConfig
    {
        /// <summary>
        /// Registers the specified configuration.
        /// </summary>
        /// <param name="config">The configuration.</param>
        public static void Register(HttpConfiguration config)
        {

            config.SetDocumentationProvider(new XmlDocumentationProvider(
                 HttpContext.Current.Server.MapPath("~/App_Data/XmlDocument.xml")));
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();
         
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

        }
    }
}
