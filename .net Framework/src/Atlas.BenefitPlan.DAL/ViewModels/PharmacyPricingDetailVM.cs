using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Pharmacy Pricing Detail View Model
    /// </summary>
    public class PharmacyPricingDetailVM : BaseViewModel
    {
        /// <summary>
        /// Id of the Plan Pricing
        /// </summary>
        public long PlanPrcgSK { get; set; }

        /// <summary>
        /// Id of the Day Supply Type
        /// </summary>
        [Required(ErrorMessage = "DaySuplTypeSK is required.")]
        public long DaySuplTypeSK { get; set; }

        /// <summary>
        /// Id of the Benefit Plan
        /// </summary>
        [Required(ErrorMessage = "BnftPlanSK is required.")]
        public long BnftPlanSK { get; set; }

        /// <summary>
        /// Id of the Pharmacy Type
        /// </summary>
        [Required(ErrorMessage = "PharmTypeSK is required.")]
        public long PharmTypeSK { get; set; }

        /// <summary>
        /// Id of the Cost Basis
        /// </summary>
        [Required(ErrorMessage = "CostBasisTypeSK is required.")]
        public long CostBasisTypeSK { get; set; }

        /// <summary>
        /// Id of the Drug Brand Type
        /// </summary>
        [Required(ErrorMessage = "DrugBrandTypeSK is required.")]
        public long DrugBrandTypeSK { get; set; }

        /// <summary>
        /// Discount Percentage of the Plan Pricing
        /// </summary>
        public decimal? DiscPct { get; set; }

        /// <summary>
        /// Discount Amount of the Plan Pricing
        /// </summary>
        public decimal? DiscAmt { get; set; }

        /// <summary>
        /// Minimum Dispensing Fee
        /// </summary>
        public decimal? MinDspnsgFeeAmt { get; set; }

        /// <summary>
        /// Maximum Dispensing Fee
        /// </summary>
        public decimal? MaxDspnsgFeeAmt { get; set; }

        /// <summary>
        /// GER Dispensing Fee
        /// </summary>
        public decimal? GERDspnsgFeeAmt { get; set; }

        /// <summary>
        /// Flag for record Deletion
        /// </summary>
        public bool IsDeleted { get; set; }
    }
}