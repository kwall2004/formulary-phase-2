using Atlas.BenefitPlan.DAL.Infrastructure.Attributes;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Benefit Plan View Model for Service Area
    /// </summary>
    public class ServiceAreaVM : BaseViewModel
    {
        /// <summary>The Service Area Key</summary>
        public long SvcAreaSK { get; set; }

        /// <summary>The Plan Benefit Package Key</summary>
        [Range(1, double.MaxValue, ErrorMessage = "PBPSK field is required.")]
        public long PBPSK { get; set; }

        /// <summary>The Service Area Name</summary>
        [Required(AllowEmptyStrings = false)]
        [MaxLength(80)]
        public string SvcAreaName { get; set; }

        /// <summary>The Effective Start Date for the Service Area</summary>
        [DateRequired]
        public System.DateTime EfctvStartDt { get; set; }

        /// <summary>The Effective End Date for the Service Area</summary>
        [DateRequired]
        [CompareEffectiveDates("EfctvStartDt")]
        public System.DateTime EfctvEndDt { get; set; }
    }
}