using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Atlas.Core.WebApi.Models.Requests
{
    /// <summary>
    /// Request that contains a start index and count for paging. 
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class PagedRequest<T> : Request<T>
    {
        /// <summary>
        /// Where to start in the result set.
        /// </summary>
        [JsonProperty(PropertyName = "startIndex")]
        public int StartIndex { get; set; }

        /// <summary>
        /// How many results to return.
        /// </summary>
        [JsonProperty(PropertyName = "count")]
        public int Count { get; set; }
    }
}