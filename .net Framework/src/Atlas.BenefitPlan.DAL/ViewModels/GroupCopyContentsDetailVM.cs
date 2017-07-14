using Atlas.BenefitPlan.DAL.Infrastructure.Attributes;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Group Copy Contents Detail View Model
    /// </summary>
    public class GroupCopyContentsDetailVM 
    {
        /// <summary>
        /// the PopGrpSK
        /// </summary>
        [Range(1, double.MaxValue, ErrorMessage = "PopGrpSK field is required.")]
        public long PopGrpSK { get; set; }

        /// <summary>
        /// the PBPSK
        /// </summary>
        [Range(1, double.MaxValue, ErrorMessage = "PBPSK field is required.")]
        public long PBPSK { get; set; }

        /// <summary>
        /// the Current Plan Program Code
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        [MaxLength(25)]
        public string PlanPgmCode { get; set; }

        /// <summary>
        /// the New Plan Program Code
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        [MaxLength(25)]
        public string NewPlanPgmCode { get; set; }
    }
}
