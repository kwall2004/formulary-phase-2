using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Copay Distribution View Model
    /// </summary>
    public class CopayDistributionVM : BaseViewModel
    {
        /// <summary>
        /// Id of the benefit Plan
        /// </summary>
        [Range(1, double.MaxValue, ErrorMessage = "BnftPlanSK field is required.")]
        public long BnftPlanSK { get; set; }

        /// <summary>
        /// Id of the Copay Distribution
        /// </summary>
        public long CopayDistSK { get; set; }

        /// <summary>
        /// Formulary tier Id of the Copay Distribution
        /// </summary>
        [Range(1, double.MaxValue, ErrorMessage = "FrmlryTierSK field is required.")]
        public long FrmlryTierSK { get; set; }

        /// <summary>
        /// Formulary Tier Number
        /// </summary>
        public int FrmlryTierNbr { get; set; }

        /// <summary>
        /// Id of the Coverage
        /// </summary>
        public long CvrgPhaseSK { get; set; }

        /// <summary>
        /// Coverage Phase of the Copay Distribution
        /// </summary>
        [Range(1, double.MaxValue, ErrorMessage = "CvrgPhaseSK field is required.")]
        public long CvrgPhaseTypeSK { get; set; }

        /// <summary>
        /// Member Responsibility Amount of the Copay Distribution
        /// </summary>
        public decimal? MbrRespAmt { get; set; }

        /// <summary>
        /// Manufacture Responsibility Percentage of the Copay Distribution
        /// </summary>
        public decimal? MbrRespPct { get; set; }

        /// <summary>
        /// Manufacture Responsibility Percentage of the Copay Distribution
        /// </summary>
        public decimal? MfgRespPct { get; set; }

        /// <summary>
        /// LICS Subsidy Applies Indicator of the Copay Distribution
        /// </summary>
        public bool LICSSubsidyAppliesInd { get; set; }

        /// <summary>
        /// Indicator if a record is to be deleted
        /// </summary>
        public bool IsDeleted { get; set; }

        /// <summary>
        /// Effective StartDate of the copay distribution
        /// </summary>
        public System.DateTime EfctvStartDt { get; set; }

        /// <summary>
        /// Effective EndDate of the Copay Distribution
        /// </summary>
        public System.DateTime EfctvEndDt { get; set; }

        /// <summary>
        /// Formulary tier Id of the Copay Distribution
        /// </summary>
        [Range(1, double.MaxValue, ErrorMessage = "LICSTypeSK field is required.")]
        public long LICSTypeSK { get; set; }
    }
}