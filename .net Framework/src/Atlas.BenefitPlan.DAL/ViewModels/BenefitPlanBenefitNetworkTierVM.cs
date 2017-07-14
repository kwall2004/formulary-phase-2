using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Benefit Plan Benefit Deductible by Network Tier View Model
    /// </summary>
    public class BenefitPlanBenefitNetworkTierVM : BaseViewModel
    {
        /// <summary>
        /// the Deductible that can be defined per Bnft NtwrkTier.
        /// </summary>
        [DataType(DataType.Currency)]
        [Required(AllowEmptyStrings = true)]
        public decimal? DeductibleAmt { get; set; }

        /// <summary>
        /// the Network Tier SK
        /// </summary>
        [Range(1, double.MaxValue, ErrorMessage = "NtwrkTierSK field is required.")]
        public long NtwrkTierSK { get; set; }

        /// <summary>
        /// The list of Benefit Plan Benefit Coverage Sets for the Networks Tiers
        /// </summary>
        public List<BenefitPlanBenefitNetworkTierCoverageSetVM> SelectedCoverageSets { get; set; }
    }
}