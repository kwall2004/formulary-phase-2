using Newtonsoft.Json;

namespace Atlas.BenefitPlan.DAL.Models.Containers.JSON
{
    /// <summary>
    /// JSON Message Class
    /// </summary>
    public class Message
    {
        /// <summary>
        /// Gets or sets the code.
        /// </summary>
        /// <value>The code.</value>
        [JsonProperty(PropertyName = "code")]
        public string Code { get; set; }

        /// <summary>
        /// Gets or sets the type.
        /// </summary>
        /// <value>The type.</value>
        [JsonProperty(PropertyName = "type")]
        public string Type { get; set; }

        /// <summary>
        /// Gets or sets the message text.
        /// </summary>
        /// <value>The message text.</value>
        [JsonProperty(PropertyName = "message")]
        public string MessageText { get; set; }

        /// <summary>
        /// Gets or sets the fieldname.
        /// </summary>
        /// <value>The fieldname.</value>
        [JsonProperty(PropertyName = "dataindex")]
        public string Fieldname { get; set; }
    }
}