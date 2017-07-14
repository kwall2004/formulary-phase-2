using Newtonsoft.Json;

namespace Atlas.BenefitPlan.DAL.Models.Containers
{
    /// <summary>
    /// The Plan Benefit Package Search Container for the Search
    /// </summary>
    public class PlanBenefitPackageSearch
    {
        /// <summary>
        /// Gets or sets the search field.
        /// </summary>
        /// <value>The search field.</value>
        [JsonProperty(PropertyName = "searchField")]
        public string SearchField { get; set; }

        /// <summary>
        /// Gets or sets the search text.
        /// </summary>
        /// <value>The search text.</value>
        [JsonProperty(PropertyName = "searchText")]
        public string SearchText { get; set; }
    }
}