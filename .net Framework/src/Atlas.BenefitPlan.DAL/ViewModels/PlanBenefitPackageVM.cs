using Atlas.BenefitPlan.DAL.Infrastructure.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    public class PlanBenefitPackageVM : BaseViewModel
    {
        /// <summary>
        /// Id for the Plan Benefit Package
        /// </summary>
        public long PBPSK { get; set; }

        /// <summary>
        /// Id for the Line of Bussiness
        /// </summary>
        [Range(1, double.MaxValue, ErrorMessage = "LOBSK field is required.")]
        public long LOBSK { get; set; }

        /// <summary>
        /// Key for the Plan Benefit Package
        /// </summary>
        [MaxLength(80)]
        public string PBPID { get; set; }

        /// <summary>
        /// Name of the plan Benefit Package
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        [MaxLength(80)]
        public string PBPName { get; set; }

        /// <summary>
        /// Indicator for Combined Plan MOOP
        /// </summary>
        [Required(ErrorMessage = "Combined MOOP is required.")]
        public bool CombinedMOOPInd { get; set; }

        /// <summary>
        /// Indicator for Combined Plan Level Deductible
        /// </summary>
        [Required(ErrorMessage = "Combined Plan Level is required.")]
        public bool CombinedPlanLvlDeducbInd { get; set; }

        /// <summary>
        /// Plan Benefit Package Year
        /// </summary>
        [MaxLength(4)]
        public string PBPYr { get; set; }

        /// <summary>
        /// HIOS Product ID
        /// </summary>
        [MaxLength(80)]
        public string HIOSPrdctID { get; set; }

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
        /// Effective End Date for the Plan Benefit Package only
        /// </summary>
        public bool CanChangePBPBnftPlanList { get; set; }

        /// <summary>
        /// List of the plans in the plan benefit package
        /// </summary>
        public IEnumerable<PlanBenefitPackageBenefitPlanVM> PBPBnftPlanList { get; set; }

        /// <summary>
        /// Constructor for Plan Benefit PackageVM
        /// </summary>
        public PlanBenefitPackageVM()
        {
            this.CanChangePBPBnftPlanList = true;
        }
    }
}