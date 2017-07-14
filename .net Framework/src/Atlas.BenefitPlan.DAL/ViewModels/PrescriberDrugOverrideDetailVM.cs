using Atlas.BenefitPlan.DAL.Infrastructure.Attributes;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Prescriber Drug Override Detail VM
    /// </summary>
    public class PrescriberDrugOverrideDetailVM : BaseViewModel
    {
        /// <summary>
        /// The Prescriber Drug Override Detail SK
        /// </summary>
        [Required(ErrorMessage = "PrescbrDrugOvrrdDtlSK is required.")]
        public long PrescbrDrugOvrrdDtlSK { get; set; }

        /// <summary>
        /// The Prescriber SK
        /// </summary>
        [Required(ErrorMessage = "PrescbrSK is required.")]
        public long PrescbrSK { get; set; }

        /// <summary>
        /// The Effective Start Date for this Prescriber Drug Override
        /// </summary>
        [DateRequired]
        public System.DateTime EfctvStartDt { get; set; }

        /// <summary>
        /// The Effective End Date for this Prescriber Drug Override
        /// </summary>
        [DateRequired]
        [CompareEffectiveDates("EfctvStartDt")]
        public System.DateTime EfctvEndDt { get; set; }

        /// <summary>
        /// The Prescriber Drug Override First Name
        /// </summary>

        public string PrescbrFirstName { get; set; }

        /// <summary>
        /// The Prescriber Drug Override Last Name
        /// </summary>

        public string PrescbrLastName { get; set; }

        /// <summary>
        /// The Prescriber Drug Override NPI
        /// </summary>

        public string PrescbrNPI { get; set; }

        /// <summary>
        /// The Prescriber Drug Override Drug NDC
        /// </summary>

        [Required(AllowEmptyStrings = true)]
        [MaxLength(15)]
        public string NDC { get; set; }

        /// <summary>
        /// The Prescriber Drug Override Drug Label Name
        /// </summary>

        [Required(AllowEmptyStrings = false, ErrorMessage = "Label Name is required.")]
        [MaxLength(80)]
        public string DrugLblName { get; set; }
    }
}