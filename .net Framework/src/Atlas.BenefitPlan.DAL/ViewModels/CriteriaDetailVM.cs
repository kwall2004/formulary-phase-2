using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Criteria Detail View Model
    /// </summary>
    public class CriteriaDetailVM : BaseViewModel
    {
        /// <summary>
        /// the CriteriaSet SK
        /// </summary>
        public long CrtriaSetSK { get; set; }

        /// <summary>
        /// the CriteriaDetail SK
        /// </summary>
        public long CrtriaDtlSK { get; set; }

        /// <summary>
        /// the CriteriaConditionType SK
        /// </summary>
        [Required(ErrorMessage = "CrtriaCondTypeSK is required.")]
        public long CrtriaCondTypeSK { get; set; }

        /// <summary>
        /// the ValueQualifierType SK
        /// </summary>
        [Required(ErrorMessage = "ValQulfrTypeSK is required.")]
        public long ValQulfrTypeSK { get; set; }

        /// <summary>
        /// the CriteriaPriority
        /// </summary>
        [Required(ErrorMessage = "CrtriaPrity is required.")]
        public int CrtriaPrity { get; set; }

        /// <summary>
        /// The CriteriaDetail Desc
        /// </summary>
        [MaxLength(80)]
        public string CrtriaDtlDesc { get; set; }

        /// <summary>
        /// The CriteriaValue
        /// </summary>
        public string CrtriaVal { get; set; }

        /// <summary>
        /// The Deleted indicator
        /// </summary>
        public bool Deleted { get; set; }
    }
}