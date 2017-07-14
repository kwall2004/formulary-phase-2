using System.Collections.Generic;

namespace Atlas.BenefitPlan.DAL.Models.Containers
{
    /// <summary>
    /// Class BenefitNetworkDetail.
    /// </summary>
    public class BenefitNetworkDetail
    {
        /// <summary>
        /// Gets or sets the name.
        /// </summary>
        /// <value>The name.</value>
        public string Name { get; set; }
        /// <summary>
        /// Gets or sets the selected coverage sets.
        /// </summary>
        /// <value>The selected coverage sets.</value>
        public List<BenefitNetworkCoverageSetDetail> SelectedCoverageSets { get; set; }
        /// <summary>
        /// Gets or sets the deductible amt.
        /// </summary>
        /// <value>The deductible amt.</value>
        public decimal DeductibleAmt { get; set; }

        /// <summary>
        /// Gets or sets the NTWRK tier sk.
        /// </summary>
        /// <value>The NTWRK tier sk.</value>
        public long NtwrkTierSK { get; set; }
    }
}