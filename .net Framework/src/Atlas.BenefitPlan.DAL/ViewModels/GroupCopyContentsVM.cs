using Atlas.BenefitPlan.DAL.Infrastructure.Attributes;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Group Copy Contents View Model
    /// </summary>
    public class GroupCopyContentsVM : BaseViewModel
    {
        /// <summary>
        /// the From Group ID
        /// </summary>
        [Range(1, double.MaxValue, ErrorMessage = "GrpSK field is required.")]
        public long GrpSK { get; set; }

        /// <summary>
        /// the To Group ID
        /// </summary>
        public long? ToGrpSK { get; set; }

        /// <summary>
        /// The Population Group Key
        /// </summary>
        [Range(1, double.MaxValue, ErrorMessage = "PopGrpSK field is required.")]
        public long PopGrpSK { get; set; }

        /// <summary>
        /// The Population Group Name
        /// </summary>
        public string PopGrpName { get; set; }

        /// <summary>
        /// the PBPSK
        /// </summary>
        [Range(1, double.MaxValue, ErrorMessage = "PBPSK field is required.")]
        public long PBPSK { get; set; }
        
        /// <summary>
        /// The Effective Start Date for the Population Group
        /// </summary>
        public System.DateTime? EfctvStartDt { get; set; }

        /// <summary>
        /// The Effective End Date for the Population Group
        /// </summary>
        public System.DateTime? EfctvEndDt { get; set; }

        /// <summary>
        /// The Plan Benefit Package Name
        /// </summary>
        public string PBPName { get; set; }

        /// <summary>
        /// The Plan Benefit Package ID
        /// </summary>
        public string PBPID { get; set; }

        /// <summary>
        /// the Current Plan Program Code
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        [MaxLength(25)]
        public string PlanPgmCode { get; set; }

        /// <summary>
        /// the New Plan Program Code
        /// </summary>
        [MaxLength(25)]
        public string NewPlanPgmCode { get; set; }

    }
}
