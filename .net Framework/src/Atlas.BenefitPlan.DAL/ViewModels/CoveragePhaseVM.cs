using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Coverage Phase View Model for Benefit Plan
    /// </summary>
    public class CoveragePhaseVM : BaseViewModel
    {
        public long CvrgPhaseSK { get; set; }

        public long BnftPlanSK { get; set; }

        public long CvrgPhaseTypeSK { get; set; }

        [Required(AllowEmptyStrings = false)]
        public int? CvrgPhaseSeq { get; set; }

        [DataType(DataType.Currency)]
        [Range(0, 99999999.99, ErrorMessage = "0 to 99999999.99 or blank allowed")]
        public decimal? CvrgPhaseTotalDrugSpend { get; set; }

        [DataType(DataType.Currency)]
        [Range(0, 99999999.99, ErrorMessage = "0 to 99999999.99 or blank allowed")]
        public decimal? CvrgPhaseTrOOPMax { get; set; }

        public bool IsDeleted { get; set; }
    }
}