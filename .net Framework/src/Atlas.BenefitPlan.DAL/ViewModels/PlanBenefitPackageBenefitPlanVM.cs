using Atlas.BenefitPlan.DAL.Infrastructure.Attributes;
using System;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    public class PlanBenefitPackageBenefitPlanVM : BaseViewModel
    {
        /// <summary>
        /// Id for the PBP Benefit Plan
        /// </summary>
        [Range(0, double.MaxValue, ErrorMessage = "Plan Benefit Package Plan is required.")]
        public long PBPBnftPlanSK { get; set; }

        /// <summary>
        /// Id for the Plan Benefit Package
        /// </summary>
        [Range(0, double.MaxValue, ErrorMessage = "Plan Benefit Package Id is required.")]
        public long PBPSK { get; set; }

        /// <summary>
        /// Id for the Benefit Plan
        /// </summary>
        [Range(1, double.MaxValue, ErrorMessage = "Benefit Plan Id is required.")]
        public long BnftPlanSK { get; set; }

        /// <summary>
        /// Name of the Benefit Plan
        /// </summary>
        public string BnftPlanName { get; set; }

        /// <summary>
        /// Id of the Product Type
        /// </summary>
        public Nullable<long> PrdctTypeSK { get; set; }

        /// Code of the Product Type
        /// </summary>
        public string PrdctTypeCode { get; set; }

        /// <summary>
        /// Id of the Benefit Plan Type
        /// </summary>
        public long BnftPlanTypeSK { get; set; }

        /// <summary>
        /// Code of the Benefit Plan Type
        /// </summary>
        public string BnftPlanTypeCode { get; set; }

        /// <summary>
        /// Id of the Line of Bussiness
        /// </summary>
        public long LOBSK { get; set; }

        /// <summary>
        /// Name of the Line of Bussiness
        /// </summary>
        public string LOBName { get; set; }

        /// <summary>
        /// Number of the Network Tier
        /// </summary>
        public int NbrofNtwrkTiers { get; set; }

        /// <summary>
        /// Indicator for the Pay as Secondary
        /// </summary>
        [Required(ErrorMessage = "Pay as Secondary is required.")]
        public bool PayasScndInd { get; set; }

        /// <summary>
        /// Indicator for Combined Plan Level Deductible
        /// </summary>
        [Required(ErrorMessage = "Indicator for Combined Plan Level Deductible is required.")]
        public bool CombinedPlanLvlDeducbInd { get; set; }

        /// <summary>
        /// Indicator for Combined Plan MOOP
        /// </summary>
        [Required(ErrorMessage = "Indicator for Combined Plan MOOP is required.")]
        public bool CombinedMOOPInd { get; set; }

        /// <summary>
        /// Effective Start Date for the Plan benefit package
        /// </summary>
        [DateRequired(ErrorMessage = "Effective Start Date is required.")]
        public DateTime EfctvStartDt { get; set; }

        /// <summary>
        /// Effective End Date for the Plan Benefit Package only
        /// </summary>
        [DateRequired(ErrorMessage = "Effective End Date is required.")]
        [CompareEffectiveDates("EfctvStartDt")]
        public DateTime EfctvEndDt { get; set; }

        /// <summary>
        /// To Unassign plan from package
        /// </summary>
        public bool IsDeleted
        {
            get;
            set;
        }
    }
}