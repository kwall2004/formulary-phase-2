using Newtonsoft.Json;

namespace Atlas.Core.DAL.Models.Containers
{
    public class Criteria
    {
        /// <summary>
        /// Field we're concerned with checking.
        /// </summary>
        [JsonProperty(PropertyName = "property")]
        public string Property  { get; set; }

        /// <summary>
        /// Operator to use to evaluate field. 
        /// </summary>
        [JsonProperty(PropertyName = "operator")]
        public string Operator { get; set; }

        /// <summary>
        /// Value of field that operator evaluates.
        /// </summary>
        [JsonProperty(PropertyName = "value")]
        public string Value { get; set; }
    }
}
