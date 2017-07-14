namespace Atlas.BenefitPlan.DAL.Models.Containers
{
    /// <summary>
    /// The Day Supply Container for Benefit Plan
    /// </summary>
    public class DaySupply
    {
        /// <summary>
        /// Gets or sets the BNFT plan pharm type day supl sk.
        /// </summary>
        /// <value>The BNFT plan pharm type day supl sk.</value>
        public long BnftPlanPharmTypeDaySuplSK { get; set; }
        /// <summary>
        /// Gets or sets the day supl type sk.
        /// </summary>
        /// <value>The day supl type sk.</value>
        public long DaySuplTypeSK { get; set; }
        /// <summary>
        /// Gets or sets the day supl type code.
        /// </summary>
        /// <value>The day supl type code.</value>
        public string DaySuplTypeCode { get; set; }
    }
}