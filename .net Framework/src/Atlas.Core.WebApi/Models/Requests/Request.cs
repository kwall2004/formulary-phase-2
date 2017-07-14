using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Atlas.Core.WebApi.Models.Requests
{
    /// <summary>
    /// Generalized request body to ensure uniformity.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class Request<T> 
    {
        /// <summary>
        /// The what of the request. 
        /// </summary>
        [JsonProperty(PropertyName = "payload")]
        public List<T> Payload { get; set; }
    }
}