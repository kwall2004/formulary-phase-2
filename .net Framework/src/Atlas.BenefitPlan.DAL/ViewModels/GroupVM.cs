using Atlas.BenefitPlan.DAL.Infrastructure.Attributes;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Group View Model
    /// </summary>
    public class GroupVM : BaseViewModel
    {
        /// <summary>
        /// the Group ID
        /// </summary>
        public long GrpSK { get; set; }

        /// <summary>
        /// the Account ID
        /// </summary>
        [Range(1, double.MaxValue, ErrorMessage = "AcctSK field is required.")]
        public long AcctSK { get; set; }

        /// <summary>
        /// The Group Name
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        [MaxLength(80)]
        public string GrpName { get; set; }

        /// <summary>
        /// The Group Number
        /// </summary>
        [MaxLength(50)]
        public string GrpNbr { get; set; }

        /// <summary>
        /// The HIOS Issuer ID
        /// </summary>
        [MaxLength(50)]
        public string HIOSIssuerID { get; set; }

        /// <summary>
        /// The Effective Start Date for the Group
        /// </summary>
        [DateRequired]
        public System.DateTime EfctvStartDt { get; set; }

        /// <summary>
        /// The Effective End Date for the Group
        /// </summary>
        [DateRequired]
        [CompareEffectiveDates("EfctvStartDt")]
        public System.DateTime EfctvEndDt { get; set; }
    }
}