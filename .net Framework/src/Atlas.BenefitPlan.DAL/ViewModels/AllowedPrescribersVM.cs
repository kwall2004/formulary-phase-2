using Atlas.BenefitPlan.DAL.Infrastructure.Attributes;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Allowed Prescriber List VM
    /// </summary>
    public class AllowedPrescribersVM : BaseViewModel
    {
        /// <summary>
        /// The Allowed Prescriber List SK
        /// </summary>
        [Required(ErrorMessage = "AlwdPrescribersListSK is required.")]
        public long AlwdPrescribersListSK { get; set; }

        /// <summary>
        /// The Allowed Prescriber List Name
        /// </summary>
        [Required(AllowEmptyStrings = true)]
        [MaxLength(50)]
        public string AlwdPrescribersListName { get; set; }

        /// <summary>
        /// The Effective Start Date for this Allowed Prescriber List
        /// </summary>
        [DateRequired]
        public System.DateTime EfctvStartDt { get; set; }

        /// <summary>
        /// The Effective End Date for this Allowed Prescriber List
        /// </summary>
        [DateRequired]
        [CompareEffectiveDates("EfctvStartDt")]
        public System.DateTime EfctvEndDt { get; set; }

        public List<AllowedPrescribersDetailVM> AllowedPrescribers { get; set; }

        public AllowedPrescribersVM()
        {
            AllowedPrescribers = new List<AllowedPrescribersDetailVM>();
        }
    }
}