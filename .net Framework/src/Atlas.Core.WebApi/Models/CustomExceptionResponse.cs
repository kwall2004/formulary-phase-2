using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Core.WebApi.Models
{
    public class CustomExceptionResponse
    {
        public string ExceptionCode { get; set; }
        public string FriendlyMessage { get; set; }
        public string ExceptionMessage { get; set; }
    }
}
