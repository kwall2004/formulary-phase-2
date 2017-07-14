using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Savings Account View Model
    /// STS
    /// </summary>
    public class SavingsAccountVM : BaseViewModel
    {
        public long PopGrpPBPHealthcareFinclAcctSK { get; set; }

        public long PopGrpPBPSK { get; set; }

        public long BnftPlanTypeSK { get; set; }

        public long HealthcareFinclAcctTypeSK { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Bank name is required")]
        [MaxLength(80)]
        public string BankName { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Account number is required")]
        [MaxLength(50)]
        public string AcctNbr { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Maximum contribution amount is required")]
        [Range(1, 999999.99, ErrorMessage = "Maximum contribution amount should be between 1 and 999,999.99.")]
        public decimal? MaxContributionAmt { get; set; } 
    }
}