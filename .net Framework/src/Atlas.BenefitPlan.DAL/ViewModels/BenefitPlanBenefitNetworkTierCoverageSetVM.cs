using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Coverage Set Network Tier View Model for a Benefit
    /// </summary>
    public class BenefitPlanBenefitNetworkTierCoverageSetVM : BaseViewModel
    {
        /// <summary>
        /// the BnftPlanBnftCvrgSetNtwrkTierSK
        /// </summary>
        [Range(0, double.MaxValue, ErrorMessage = "BnftPlanBnftCvrgSetNtwrkTierSK field is required.")]
        public long BnftPlanBnftCvrgSetNtwrkTierSK { get; set; }

        /// <summary>
        /// the Coverage Set SK
        /// </summary>
        [Range(1, double.MaxValue, ErrorMessage = "CvrgSetSK field is required.")]
        public long CvrgSetSK { get; set; }

        /// <summary>
        /// the Coverage Set Priority
        /// </summary>
        [Range(1, double.MaxValue, ErrorMessage = "CvrgSetPrity field is required.")]
        public int CvrgSetPrity { get; set; }

        /// <summary>
        /// The Deleted indicator
        /// </summary>
        public bool Deleted { get; set; }
    }
}