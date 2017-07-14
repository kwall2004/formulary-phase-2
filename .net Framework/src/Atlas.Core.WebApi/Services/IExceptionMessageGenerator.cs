using Atlas.Core.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Core.WebApi.Services
{
    public interface IExceptionMessageGenerator
    {
        /// <summary>
        /// Get's an appropriately formatted exception message based on implementation. 
        /// </summary>
        /// <param name="ex"></param>
        /// <returns></returns>
        string GetExceptionMessage(Exception ex);

        CustomExceptionResponse GetCustomExceptionMessage(Exception ex, string exceptionCode, string friendlyMessage);
    }
}
