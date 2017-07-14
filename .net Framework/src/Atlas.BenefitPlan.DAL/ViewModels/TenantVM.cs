using Atlas.BenefitPlan.DAL.Infrastructure.Attributes;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Tenant View Model
    /// </summary>
    public class TenantVM : BaseViewModel
    {
        /// <summary>
        /// the Tenant ID
        /// </summary>
        public long TenantSK { get; set; }

        /// <summary>
        /// the Tenant Family ID
        /// </summary>
        [Range(1, double.MaxValue, ErrorMessage = "TenantFamSK field is required.")]
        public long TenantFamSK { get; set; }

        /// <summary>
        /// The Tenant Name
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        [MaxLength(80)]
        public string TenantName { get; set; }

        /// <summary>
        /// The Effective Start Date for the Tenant
        /// </summary>
        [DateRequired]
        public System.DateTime EfctvStartDt { get; set; }

        /// <summary>
        /// The Effective End Date for the Tenant
        /// </summary>
        [DateRequired]
        [CompareEffectiveDates("EfctvStartDt")]
        public System.DateTime EfctvEndDt { get; set; }

        /// <summary>
        /// List of Tenant Industry Identifiers (PCN, BIN, PayerID)
        /// </summary>
        public IEnumerable<TenantIndustryIdentifierVM> TenantIndustryIdentifiers { get; set; }

        public TenantVM()
        {
            this.TenantIndustryIdentifiers = new List<TenantIndustryIdentifierVM>();
        }
    }
}