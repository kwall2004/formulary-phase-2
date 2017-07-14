using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// Plan Cap Limits View Model
    /// </summary>
    public class PlanCapLimitsVM : BaseViewModel
    {
        public long PlanCapLimSK { get; set; }

        public long BnftPlanSK { get; set; }

        public long PlanCapLimQulfrTypeSK { get; set; }

        public long PlanCapLimPerQulfrTypeSK { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Plan cap limit value required")]
        [MaxLength(80)]
        public string PlanCapLimVal { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Plan cap limit amount required")]
        [RegularExpression(@"(?!^0*$)(?!^0*\.0*$)^\d{1,5}(\.\d{1,2})?$", ErrorMessage = "Plan cap limit must be a positive currency value.")]
        public decimal PlanCapLimAmt { get; set; }

        public bool isDeleted { get; set; }
    }
}