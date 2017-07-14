using Newtonsoft.Json;
using System.Collections.Generic;

namespace Atlas.BenefitPlan.DAL.Models.Containers.JSON
{
    /// <summary>
    /// JSON Base Response
    /// </summary>
    public class BaseResponse
    {
        /// <summary>
        /// Gets or sets a value indicating whether this <see cref="BaseResponse"/> is success.
        /// </summary>
        /// <value><c>true</c> if success; otherwise, <c>false</c>.</value>
        [JsonProperty(PropertyName = "success")]
        public bool Success { get; set; }

        /// <summary>
        /// Gets or sets the count.
        /// </summary>
        /// <value>The count.</value>
        [JsonProperty(PropertyName = "count")]
        public int Count { get; set; }

        /// <summary>
        /// Gets or sets the messages.
        /// </summary>
        /// <value>The messages.</value>
        [JsonProperty(PropertyName = "messages")]
        public List<Message> Messages { get; set; }

        /// <summary>
        /// Constructor for Base Response
        /// </summary>
        public BaseResponse()
        {
            this.Messages = new List<Message>();
        }
    }
}