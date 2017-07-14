using Atlas.BenefitPlan.DAL.Infrastructure.Attributes;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Population Group View Model
    /// </summary>
    public class PopulationGroupVM : BaseViewModel
    {
        /// <summary>
        /// the Population Group ID
        /// </summary>
        public long PopGrpSK { get; set; }

        /// <summary>
        /// the Group ID
        /// </summary>
        [Range(1, double.MaxValue, ErrorMessage = "GrpSK field is required.")]
        public long GrpSK { get; set; }

        /// <summary>
        /// The Population Group Name
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        [MaxLength(80)]
        public string PopGrpName { get; set; }

        /// <summary>
        /// The Population Group Contract ID
        /// </summary>
        [MaxLength(20)]
        public string CntrctID { get; set; }

        /// <summary>
        /// The HIOS Plan ID
        /// </summary>
        [MaxLength(50)]
        public string HIOSPlanID { get; set; }

        /// <summary>
        /// Use Address as Default for Enrollment
        /// </summary>
        public bool UseAddrasDefaultforEnrlmtInd { get; set; }

        /// <summary>
        /// The Effective Start Date for the Population Group
        /// </summary>
        [DateRequired]
        public System.DateTime EfctvStartDt { get; set; }

        /// <summary>
        /// The Effective End Date for the Population Group
        /// </summary>
        [DateRequired]
        [CompareEffectiveDates("EfctvStartDt")]
        public System.DateTime EfctvEndDt { get; set; }
    }
}