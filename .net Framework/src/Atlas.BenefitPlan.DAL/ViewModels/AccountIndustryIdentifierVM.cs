using Atlas.BenefitPlan.DAL.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Account Industry Identifier View Model
    /// </summary>
    public class AccountIndustryIdentifierVM : BaseViewModel
    {
        public TenantIndustryIdentifier IndustryIdentifier { get; set; }

        [Range(1, double.MaxValue, ErrorMessage = "Type and Value field are required.")]
        public long TenantTypeKey { get; set; }

        public long AcctTypeKey { get; set; }
        public long ValueID { get; set; }
        public string Type { get; set; }
        public string Value { get; set; }
        public bool Deleted { get; set; }
    }
}