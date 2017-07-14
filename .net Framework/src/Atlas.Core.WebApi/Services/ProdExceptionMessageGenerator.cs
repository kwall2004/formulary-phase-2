using Atlas.Core.WebApi.Models;
using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Atlas.Core.WebApi.Services
{
    /// <summary>
    /// Production implementation of IExceptionResponder. This should be used in prod only. 
    /// </summary>
    public class ProdExceptionMessageGenerator : IExceptionMessageGenerator
    {
        private Logger _logger = LogManager.GetCurrentClassLogger();

        /// <summary>
        /// Get's an exception message without security sensitive details for production.
        /// </summary>
        /// <param name="ex"></param>
        /// <returns></returns>
        public string GetExceptionMessage(Exception ex)
        {
            _logger.Error(ex, "Found exception");
            return "An exception has occurred!";
        }

        public CustomExceptionResponse GetCustomExceptionMessage(Exception ex, string exceptionCode, string friendlyMessage)
        {
            throw new NotImplementedException();
        }
    }
}