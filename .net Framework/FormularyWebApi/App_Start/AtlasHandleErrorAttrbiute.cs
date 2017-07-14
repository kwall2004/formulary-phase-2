using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Filters;
using System.Web.Mvc;

namespace AtlasWebApi
{
    /// <summary>
    /// Handler for Error logging
    /// </summary>
    public class AtlasHandleErrorAttrbiute : ExceptionFilterAttribute
    {
        private Logger _logger = LogManager.GetCurrentClassLogger();

        /// <summary>
        /// Handle exceptions
        /// </summary>
        /// <param name="filterContext"></param>
        public override void OnException(HttpActionExecutedContext filterContext)
        {

            HttpContext context = HttpContext.Current;

            _logger.Log(LogLevel.Error, filterContext.Exception, filterContext.Exception.Message);

            //log4net.LogicalThreadContext.Properties["ipaddress"] = context.Request.UserHostAddress;
            //log4net.LogicalThreadContext.Properties["requestid"] = context.Request.Cookies["requestId"] == null ? "" : context.Request.Cookies["requestId"].ToString();



            base.OnException(filterContext);
        }



    }
}