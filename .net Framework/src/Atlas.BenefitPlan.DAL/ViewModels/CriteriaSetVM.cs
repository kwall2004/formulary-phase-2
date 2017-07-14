using Atlas.BenefitPlan.DAL.Infrastructure.Attributes;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Criteria Set View Model
    /// </summary>
    public class CriteriaSetVM : BaseViewModel
    {
        /// <summary>
        /// the CriteriaSet SK
        /// </summary>
        public long CrtriaSetSK { get; set; }

        /// <summary>
        /// The CriteriaSet Name
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        [MaxLength(80)]
        public string CriteriaSetName { get; set; }

        /// <summary>
        /// The Effective Start Date for this CriteriaSet
        /// </summary>
        [DateRequired]
        public System.DateTime EfctvStartDt { get; set; }

        /// <summary>
        /// The Effective End Date for this CriteriaSet
        /// </summary>
        [DateRequired]
        [CompareEffectiveDates("EfctvStartDt")]
        public System.DateTime EfctvEndDt { get; set; }

        /// <summary>
        /// the CrtriaSetPrity
        /// </summary>
        public int CrtriaSetPrity { get; set; }

        /// <summary>
        /// the BnftCrtriaSet SK
        /// </summary>
        public long? BnftCrtriaSetSK { get; set; }

        /// <summary>
        /// the CvrgSetCrtriaSet SK
        /// </summary>
        public long? CvrgSetCrtriaSetSK { get; set; }

        /// <summary>
        /// the Bnft SK
        /// </summary>
        public long? BnftSK { get; set; }

        /// <summary>
        /// the CvrgSet SK
        /// </summary>
        public long? CvrgSetSK { get; set; }

        /// <summary>
        /// The isDeleted indicator
        /// </summary>
        public bool isDeleted { get; set; }
    }
}