using Atlas.BenefitPlan.DAL.Infrastructure.Attributes;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Account View Model
    /// </summary>
    public class AccountVM : BaseViewModel
    {
        /// <summary>
        /// the Account ID
        /// </summary>
        public long AcctSK { get; set; }

        /// <summary>
        /// the Tenant ID
        /// </summary>
        [Range(1, double.MaxValue, ErrorMessage = "TenantSK field is required.")]
        public long TenantSK { get; set; }

        /// <summary>
        /// The Account Name
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        [MaxLength(80)]
        public string AcctName { get; set; }

        /// <summary>
        /// The Account Number
        /// </summary>
        [MaxLength(80)]
        public string AcctNbr { get; set; }

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
        /// List of Account Industry Identifiers (PCN, BIN, PayerID)
        /// </summary>
        public IEnumerable<AccountIndustryIdentifierVM> AccountIndustryIdentifiers { get; set; }

        public AccountVM()
        {
            this.AccountIndustryIdentifiers = new List<AccountIndustryIdentifierVM>();
        }
    }
}