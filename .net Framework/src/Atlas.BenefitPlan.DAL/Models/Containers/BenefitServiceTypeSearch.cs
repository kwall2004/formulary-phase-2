using Newtonsoft.Json;

namespace Atlas.BenefitPlan.DAL.Models.Containers
{
    /// <summary>
    /// The Benefit Service Type Search Container for Benefit Plan
    /// </summary>
    public class BenefitServiceTypeSearch
    {
        /// <summary>
        /// Gets or sets the search text.
        /// </summary>
        /// <value>The search text.</value>
        [JsonProperty(PropertyName = "searchText")]
        public string SearchText { get; set; }
    }
}