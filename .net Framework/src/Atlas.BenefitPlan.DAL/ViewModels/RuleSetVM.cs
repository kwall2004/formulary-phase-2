using Atlas.BenefitPlan.DAL.Infrastructure.Attributes;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Rule Set View Model
    /// This will accept either a Benefit or a Coverage Set.
    /// </summary>
    public class RuleSetVM : BaseViewModel
    {
        /// <summary>
        /// the CriteriaSetType SK
        /// </summary>
        [Required(ErrorMessage = "CrtriaSetTypeSK is required.")]
        public long CrtriaSetTypeSK { get; set; }

        /// <summary>
        /// the BnftCrtriaSet SK
        /// </summary>
        public long? BnftCrtriaSetSK { get; set; }

        /// <summary>
        /// the CvrgSetCrtriaSet SK
        /// </summary>
        public long? CvrgSetCrtriaSetSK { get; set; }

        /// <summary>
        /// the Benefit SK
        /// </summary>
        public long? BnftSK { get; set; }

        /// <summary>
        /// the Coverage Set SK
        /// </summary>
        public long? CvrgSetSK { get; set; }

        /// <summary>
        /// the CriteriaSet SK
        /// </summary>
        [Required(ErrorMessage = "CrtriaSetSK is required.")]
        public long CrtriaSetSK { get; set; }

        /// <summary>
        /// The CriteriaSet Name
        /// </summary>
        [Required(AllowEmptyStrings = false, ErrorMessage = "Rule Set Name is required.")]
        [MaxLength(80)]
        public string CriteriaSetName { get; set; }

        /// <summary>
        /// the CrtriaSetPrity
        /// </summary>
        [Required(ErrorMessage = "CrtriaSetPrity is required.")]
        public int CrtriaSetPrity { get; set; }

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
        /// List of CriteriaDetails
        /// </summary>
        public List<CriteriaDetailVM> CriteriaDetails { get; set; }

        /// <summary>
        /// The Deleted indicator
        /// </summary>
        public bool Deleted { get; set; }

        public RuleSetVM()
        {
            CriteriaDetails = new List<CriteriaDetailVM>();
        }
    }
}