namespace Atlas.BenefitPlan.DAL.Models.Containers
{
    /// <summary>
    /// Class CostShareMaximumsNetworkDetail.
    /// </summary>
    public class CostShareMaximumsNetworkDetail
    {
        /// <summary>
        /// Gets or sets the NTWRK tier sk.
        /// </summary>
        /// <value>The NTWRK tier sk.</value>
        public long NtwrkTierSK { get; set; }
        /// <summary>
        /// Gets or sets the name of the NTWRK tier.
        /// </summary>
        /// <value>The name of the NTWRK tier.</value>
        public string NtwrkTierName { get; set; }

        /// <summary>
        /// Gets or sets the deducbl sk.
        /// </summary>
        /// <value>The deducbl sk.</value>
        public long DeducblSK { get; set; }

        /// <summary>
        /// Gets or sets the deductible amt.
        /// </summary>
        /// <value>The deductible amt.</value>
        public decimal? DeductibleAmt { get; set; }
    }
}