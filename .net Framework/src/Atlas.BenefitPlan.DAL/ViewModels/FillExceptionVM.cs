using System.ComponentModel.DataAnnotations;

//DispenseAsWrittenCopayVM
namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Fill Exception View Model
    /// </summary>
    public class FillExceptionVM : BaseViewModel
    {
        public long FillExcpSK { get; set; }

        public long BnftPlanSK { get; set; }

        public long DrugClsTypeSK { get; set; }

        public long FillExcpChngQulfrTypeSK { get; set; }

        public long PharmTypeSK { get; set; }

        [Range(1, 999)]
        public int? FillRngMinAmt { get; set; }

        [Range(1, 999)]
        public int? FillRngMaxAmt { get; set; }

        [Range(0, 99.9)]
        public decimal? MultiplierAmt { get; set; }

        public bool isDeleted { get; set; }
    }
}