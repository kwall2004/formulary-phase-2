using Atlas.BenefitPlan.DAL.Infrastructure.Attributes;
using Atlas.BenefitPlan.DAL.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Tenant Industry Identifier View Model
    /// </summary>
    public class TenantIndustryIdentifierVM : BaseViewModel
    {
        public TenantIndustryIdentifier IndustryIdentifier { get; set; }
        public long TenantTypeKey { get; set; }
        public long ValueID { get; set; }

        public string Type { get; set; }

        [Required(AllowEmptyStrings = false)]
        [IndustryIdentifierValue("IndustryIdentifier")]
        [MaxLength(32)]
        public string Value { get; set; }

        [Required(AllowEmptyStrings = false)]
        [MaxLength(240)]
        public string Description { get; set; }

        /// <summary>
        /// The Effective Start Date for the Tenant Industry Identifier
        /// </summary>
        [DateRequired]
        public System.DateTime EfctvStartDt { get; set; }

        /// <summary>
        /// The Effective End Date for the Tenant
        /// </summary>
        [DateRequired]
        [CompareEffectiveDates("EfctvStartDt")]
        public System.DateTime EfctvEndDt { get; set; }

        public bool Deleted { get; set; }
    }
}