using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Benefit Coverage Set Details View Model for Benefits
    /// </summary>
    public class BenefitCoverageSetDetailsVM : BaseViewModel
    {
        /// <summary>
        /// the Benefit SK
        /// </summary>
        [Range(1, double.MaxValue, ErrorMessage = "BnftSK field is required.")]
        public long BnftSK { get; set; }

        /// <summary>
        /// the Benefit Plan SK
        /// </summary>
        [Range(1, double.MaxValue, ErrorMessage = "BnftPlanSK field is required.")]
        public long BnftPlanSK { get; set; }

        /// <summary>
        /// The Deleted indicator
        /// </summary>
        public bool Deleted { get; set; }

        /// <summary>
        /// The list of Benefit Plan Benefits by Network Tier with their Deductibles
        /// </summary>
        public List<BenefitPlanBenefitNetworkTierVM> Tiers { get; set; }

        public BenefitCoverageSetDetailsVM()
        {
            Tiers = new List<BenefitPlanBenefitNetworkTierVM>();
        }
    }
}