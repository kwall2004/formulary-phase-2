using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    public class DeductibleExceptionVM : BaseViewModel
    {
        public long BnftPlanSK { get; set; }

        public long DeducbleExclSK { get; set; }

        public long DeducblExclQulfrTypeSK { get; set; }

        public string DeducbleExclQulfrTypeCode { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Deductible Exception Value is required")]
        [MaxLength(80)]
        public string DeducbleExclVal { get; set; }

        public bool CntTowardsMOOPInd { get; set; }

        public bool isDeleted { get; set; }
    }
}