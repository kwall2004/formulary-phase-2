using Atlas.BenefitPlan.DAL.Infrastructure.Attributes;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Prescriber Drug Override VM
    /// </summary>
    public class PrescriberDrugOverrideVM : BaseViewModel
    {
        /// <summary>
        /// The Prescriber Drug Override List SK
        /// </summary>
        [Required(ErrorMessage = "PrescbrDrugOvrrdListSK is required.")]
        public long PrescbrDrugOvrrdListSK { get; set; }

        /// <summary>
        /// The Prescriber Drug Override List Name
        /// </summary>
        [Required(AllowEmptyStrings = false, ErrorMessage = "List Name is required.")]
        [MaxLength(80)]
        public string PrescbrDrugOvrrdListName { get; set; }

        /// <summary>
        /// The Effective Start Date for this Prescriber Drug Override List
        /// </summary>
        [DateRequired]
        public System.DateTime EfctvStartDt { get; set; }

        /// <summary>
        /// The Effective End Date for this Prescriber Drug Override List
        /// </summary>
        [DateRequired]
        [CompareEffectiveDates("EfctvStartDt")]
        public System.DateTime EfctvEndDt { get; set; }

        public List<PrescriberDrugOverrideDetailVM> PrescriberDrugOverrides { get; set; }

        public PrescriberDrugOverrideVM()
        {
            PrescriberDrugOverrides = new List<PrescriberDrugOverrideDetailVM>();
        }
    }
}