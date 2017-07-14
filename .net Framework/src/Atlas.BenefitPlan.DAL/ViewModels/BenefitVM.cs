using Atlas.BenefitPlan.DAL.Infrastructure.Attributes;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Benefit Plan View Model for Benefits
    /// </summary>
    public class BenefitVM : BaseViewModel
    {
        /// <summary>
        /// the Benefit SK
        /// </summary>
        public long BnftSK { get; set; }

        /// <summary>
        /// The Benefit Name
        /// </summary>
        [Required(AllowEmptyStrings = false, ErrorMessage = "Benefit Name is required.")]
        [MaxLength(80)]
        public string BenefitName { get; set; }

        /// <summary>
        /// The Effective Start Date for the Account
        /// </summary>
        [DateRequired]
        public System.DateTime EfctvStartDt { get; set; }

        /// <summary>
        /// The Effective End Date for the Account
        /// </summary>
        [DateRequired]
        [CompareEffectiveDates("EfctvStartDt")]
        public System.DateTime EfctvEndDt { get; set; }

        /// <summary>
        /// List of Service Types
        /// </summary>
        public List<ServiceTypeVM> ServiceTypes { get; set; }

        public BenefitVM()
        {
            ServiceTypes = new List<ServiceTypeVM>();
        }
    }
}