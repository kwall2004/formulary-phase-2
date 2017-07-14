using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// Copay Setup View Model
    /// </summary>
    public class CopaySetupVM : BaseViewModel
    {
        /// <summary>the Copay Setup Key</summary>
        public long CopaySetupSK { get; set; }

        /// <summary>the Benefit Plan Key</summary>
        [Range(1, double.MaxValue, ErrorMessage = "BnftPlanSK field is required.")]
        public long BnftPlanSK { get; set; }

        /// <summary>the Network Tier SK</summary>
        [Range(1, double.MaxValue, ErrorMessage = "NtwrkTierSK field is required.")]
        public long NtwrkTierSK { get; set; }

        /// <summary>the Network Tier Name</summary>
        public string NtwrkTierName { get; set; }

        /// <summary>the Coverage Phase Key</summary>
        [Range(1, double.MaxValue, ErrorMessage = "CvrgPhaseSK field is required.")]
        public long CvrgPhaseSK { get; set; }

        /// <summary>the Formulary Tier Key</summary>
        [Range(1, double.MaxValue, ErrorMessage = "FrmlryTierSK field is required.")]
        public long FrmlryTierSK { get; set; }

        /// <summary>the Copay Coinsurance Logic Type Key</summary>
        [Range(1, double.MaxValue, ErrorMessage = "CopayCoinsuranceLogicTypeSK field is required.")]
        public long CopayCoinsuranceLogicTypeSK { get; set; }

        /// <summary>the Pharmacy Type Key</summary>
        [Range(1, double.MaxValue, ErrorMessage = "PharmTypeSK field is required.")]
        public long PharmTypeSK { get; set; }

        /// <summary>the Day Supply Type Key</summary>
        [Range(1, double.MaxValue, ErrorMessage = "DaySuplTypeSK field is required.")]
        public long DaySuplTypeSK { get; set; }

        /// <summary>the Benefit Plan Pharmacy Type Day Supply Key</summary>
        //[Range(1, double.MaxValue, ErrorMessage = "BnftPlanPharmTypeDaySuplSK field is required.")]
        public long BnftPlanPharmTypeDaySuplSK { get; set; }

        /// <summary>the Copay Amount</summary>
        public decimal? CopayAmt { get; set; }

        /// <summary>the Coinsurance Percent</summary>
        public decimal? CoinsurnacePct { get; set; }

        /// <summary>the Maximum Member Cost Percent RX</summary>
        public decimal? MaxMbrCostPerRx { get; set; }

        /// <summary>The Member Monthly Coverage Maximum Amount</summary>
        public decimal? MbrMthlyCvrgMaxAmt { get; set; }

        /// <summary>the Member Monthly Coverage Maximum Amount</summary>
        public decimal? MbrYearlyCvrgMaxAmt { get; set; }

        /// <summary>the Plan Monthly Coverage Maximum Amount</summary>
        public decimal? PlanMthlyCvrgMaxAmt { get; set; }

        /// <summary>Plan Yearly Coverage Maximum Amount</summary>
        public decimal? PlanYearlyCvrgMaxAmt { get; set; }

        /// <summary>Plan Yearly Coverage Maximum Amount</summary>
        public bool Deleted { get; set; }
    }
}