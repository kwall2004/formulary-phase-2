using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Low Income Cost-Sharing Subsidy View Model
    /// </summary>
    public class LowIncomeCostSharingSubsidyVM : BaseViewModel
    {
        /// <summary>Low Income Cost Sharing Subsidy (LICS) Setup Key</summary>
        public long LICSSetupSK { get; set; }

        /// <summary>Benefit Plan Key</summary>
        [Range(1, double.MaxValue, ErrorMessage = "BnftPlanSK field is required.")]
        public long BnftPlanSK { get; set; }

        /// <summary>Formulary Tier Key</summary>
        [Range(1, double.MaxValue, ErrorMessage = "FrmlryTierSK field is required.")]
        public long FrmlryTierSK { get; set; }

        /// <summary>Coverage Phase Key</summary>
        [Range(1, double.MaxValue, ErrorMessage = "CvrgPhaseSK field is required.")]
        public long CvrgPhaseSK { get; set; }

        /// <summary>(LICS) Type Key</summary>
        [Range(1, double.MaxValue, ErrorMessage = "LICSTypeSK field is required.")]
        public long LICSTypeSK { get; set; }

        /// <summary>Copay Coinsurance Logic Type Key</summary>
        [Range(1, double.MaxValue, ErrorMessage = "CopayCoinsuranceLogicTypeSK field is required.")]
        public long CopayCoinsuranceLogicTypeSK { get; set; }

        /// <summary>Copay Amount</summary>
        [DataType(DataType.Currency)]
        [RegularExpression(@"^\$?\d+(\.(\d{1,2}))?$")]
        public decimal? CopayAmt { get; set; }

        /// <summary>Coinsurance Percentage</summary>
        [Range(0.0, 100.0)]
        [RegularExpression(@"^\$?\d+(\.(\d{1,2}))?$")]
        public decimal? CoinsurancePct { get; set; }

        /// <summary>Deleted Record</summary>
        public bool Deleted { get; set; }

        /// <summary>(LICS) Type Key</summary>
        [Range(1, double.MaxValue, ErrorMessage = "DaySuplTypeSK field is required.")]
        public long DaySuplTypeSK { get; set; }

        /// <summary>Pharmacy Type Key</summary>
        [Range(1, double.MaxValue, ErrorMessage = "PharmTypeSK field is required.")]
        public long PharmTypeSK { get; set; }

        /// <summary>LICS Type Code</summary>
        public string LICSTypeCode { get; set; }

        /// <summary>Pharm Type Code</summary>
        public string PharmTypeCode { get; set; }
    }
}