namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Benefit Plan View Model for Benefit Service Types
    /// </summary>
    public class BenefitServiceTypeVM : BaseViewModel
    {
        /// <summary>
        /// the Benefit SK
        /// </summary>
        public long BnftSK { get; set; }

        /// <summary>
        /// The Benefit Name
        /// </summary>
        public string BenefitName { get; set; }

        /// <summary>
        /// the Service Type SK
        /// </summary>
        public long SvcTypeSK { get; set; }

        /// <summary>
        /// The Service Type Name
        /// </summary>
        public string ServiceTypeName { get; set; }

        /// <summary>
        /// the Benefit Service Type SK
        /// </summary>
        public long BnftSvcTypeSK { get; set; }

        /// <summary>
        /// the Benefit Plan Benefit SK
        /// </summary>
        public long BnftPlanBnftSK { get; set; }
    }
}