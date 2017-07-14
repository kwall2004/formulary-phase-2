using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Atlas.BenefitPlan.DAL.Models.Containers.JSON
{
    /// <summary>
    /// JSON Add Update Response
    /// </summary>
    /// <seealso cref="Atlas.BenefitPlan.DAL.Models.Containers.JSON.BaseResponse" />
    public class AddUpdateResponse : BaseResponse
    {
        /// <summary>
        /// Gets or sets the identifier.
        /// </summary>
        /// <value>The identifier.</value>
        [JsonProperty(PropertyName = "id")]
        public List<long> ID { get; set; }

        /// <summary>
        /// Gets or sets the object.
        /// </summary>
        /// <value>The Object.</value>
        [JsonProperty(PropertyName = "data")]
        public Object data { get; set; }
    }
}