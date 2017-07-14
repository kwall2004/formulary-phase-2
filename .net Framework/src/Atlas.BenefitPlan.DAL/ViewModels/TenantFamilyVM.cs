using Atlas.BenefitPlan.DAL.Infrastructure.Attributes;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Tenant Family View Model
    /// </summary>
    public class TenantFamilyVM : BaseViewModel
    {
        /// <summary>
        /// the Tenant Family ID
        /// </summary>
        public long TenantFamSK { get; set; }

        /// <summary>
        /// The Tenant Family Name
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        [MaxLength(80)]
        public string TenantFamName { get; set; }

        /// <summary>
        /// The Effective Start Date for the Tenant Family
        /// </summary>
        [DateRequired]
        public System.DateTime EfctvStartDt { get; set; }

        /// <summary>
        /// The Effective End Date for the Tenant Family
        /// </summary>
        [DateRequired]
        [CompareEffectiveDates("EfctvStartDt")]
        public System.DateTime EfctvEndDt { get; set; }
    }
}