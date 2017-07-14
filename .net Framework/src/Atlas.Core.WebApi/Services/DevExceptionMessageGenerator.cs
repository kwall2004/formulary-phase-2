using Atlas.Core.WebApi.Models;
using NLog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Atlas.Core.WebApi.Services
{

    /// <summary>
    /// Dev implementation of IExceptionResponder returns sensitive information used for 
    /// debugging. Should never be used in production environment.
    /// </summary>
    public class DevExceptionMessageGenerator : IExceptionMessageGenerator
    {

        private Logger _logger = LogManager.GetCurrentClassLogger();

        /// <summary>
        /// Get's a message properly formated for DEV including all pertinent data for debugging. 
        /// Should never be used in a production environment!
        /// </summary>
        /// <param name="ex"></param>
        /// <returns></returns>
        public string GetExceptionMessage(Exception ex)
        {
            string retStr = "EXCEPTION: " + ex.Message + " EXCEPTION DATA: " + ex.Data;

            if(ex.InnerException != null)
            {
                retStr += " INNER EXCEPTION: " + ex.InnerException.Message;

                if (ex.InnerException.InnerException != null)
                {
                    retStr += " INNER EXCEPTION: " + ex.InnerException.InnerException.Message;
                }
            }

            _logger.Error(ex, "Found exception");

            return retStr;
        }

        public CustomExceptionResponse GetCustomExceptionMessage(Exception ex, string exceptionCode, string friendlyMessage)
        {
            string retStr = "EXCEPTION: " + ex.Message + " EXCEPTION DATA: " + ex.Data;

            if (ex.InnerException != null)
            {
                retStr += " INNER EXCEPTION: " + ex.InnerException.Message;

                if (ex.InnerException.InnerException != null)
                {
                    retStr += " INNER EXCEPTION: " + ex.InnerException.InnerException.Message;
                }
            }

            var errorObj = new CustomExceptionResponse() { ExceptionCode = exceptionCode, ExceptionMessage = retStr, FriendlyMessage = friendlyMessage };
            _logger.Error(ex, "Found exception");

            return errorObj;
        }
    }
}