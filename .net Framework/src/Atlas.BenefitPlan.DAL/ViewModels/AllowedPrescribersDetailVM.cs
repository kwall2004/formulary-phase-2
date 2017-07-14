using Atlas.BenefitPlan.DAL.Infrastructure.Attributes;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Allowed Prescriber Detail VM
    /// </summary>
    public class AllowedPrescribersDetailVM : BaseViewModel
    {
        /// <summary>
        /// The Allowed Prescriber Detail SK
        /// </summary>
        [Required(ErrorMessage = "AlwdPrescribersDtlSK is required.")]
        public long AlwdPrescribersDtlSK { get; set; }

        /// <summary>
        /// The Prescriber SK
        /// </summary>
        [Required(ErrorMessage = "PrescbrSK is required.")]
        public long PrescbrSK { get; set; }

        /// <summary>
        /// The Effective Start Date for this Allowed Prescriber
        /// </summary>
        [DateRequired]
        public System.DateTime EfctvStartDt { get; set; }

        /// <summary>
        /// The Effective End Date for this Allowed Prescriber
        /// </summary>
        [DateRequired]
        [CompareEffectiveDates("EfctvStartDt")]
        public System.DateTime EfctvEndDt { get; set; }

        /// <summary>
        /// The Allowed Prescriber First Name
        /// </summary>
        public string PrescbrFirstName { get; set; }

        /// <summary>
        /// The Allowed Prescriber Last Name
        /// </summary>
        public string PrescbrLastName { get; set; }

        /// <summary>
        /// The Allowed Prescriber NPI
        /// </summary>
        public string PrescbrNPI { get; set; }
    }
}