using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Coverage Set View Model
    /// </summary>
    public class CoverageSetVM : BaseViewModel
    {
        /// <summary>
        /// a CvrgSetSK
        /// </summary>
        public long CvrgSetSK { get; set; }

        /// <summary>
        /// The CvrgSet Name
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        [MaxLength(80)]
        public string CvrgSetName { get; set; }

        /// <summary>
        /// a BnftPlanSK
        /// </summary>
        public long BnftPlanSK { get; set; }
    }
}