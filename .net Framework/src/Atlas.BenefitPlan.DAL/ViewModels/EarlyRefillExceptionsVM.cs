using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// Early Refill Excp Model
    /// </summary>
    public class EarlyRefillExceptionsVM : BaseViewModel
    {
        public long EarlyRefillExcpSK { get; set; }

        public long BnftPlanSK { get; set; }

        public long EarlyRefillExcpQulfrTypeSK { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Value required")]
        [MaxLength(80)]
        public string EarlyRefillVal { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Percentage required")]
        [RegularExpression(@"(?!^0*$)(?!^0*\.0*$)^\d{1,3}(\.\d{1,2})?$", ErrorMessage = "Early Refill Percentage must be a positive percentage.")]
        public decimal EarlyRefillPct { get; set; }

        public bool isDeleted { get; set; }
    }
}