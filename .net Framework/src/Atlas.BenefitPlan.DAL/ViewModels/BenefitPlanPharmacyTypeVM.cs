using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    public class BenefitPlanPharmacyTypeVM : BaseViewModel
    {
        /// <summary>
        /// Id of the Benefit Plan Pharmacy Type
        /// </summary>
        [Range(0, double.MaxValue, ErrorMessage = "Benefit Plan Pharmacy Type Id is required.")]
        public long BnftPlanPharmTypeSK { get; set; }

        /// <summary>
        /// Id for the Benefit Plan
        /// </summary>
        [Range(1, double.MaxValue, ErrorMessage = "Benefit Plan Id should be greater than 1.")]
        public long BnftPlanSK { get; set; }

        /// <summary>
        /// Id for the Pharmacy Type
        /// </summary>
        [Range(1, double.MaxValue, ErrorMessage = "Pharmacy Type Id should be greater than 1.")]
        public long PharmTypeSK { get; set; }

        /// <summary>
        /// Code for the Pharmacy Type
        /// </summary>
        public string PharmTypeCode { get; set; }

        /// <summary>
        /// Early Refill Pills Count
        /// </summary>
        public decimal? EarlyRefillPct { get; set; }

        /// <summary>
        /// Max day Supply Maintenance Medication
        /// </summary>
        public int? MaxDaySuplMntncMedications { get; set; }

        /// <summary>
        /// Max day supply Non-Maintenance Medications
        /// </summary>
        public int? MaxDaySuplNonMntncMedications { get; set; }

        /// <summary>
        /// Maximum Cost per Rx
        /// </summary>
        public decimal? MaxCostPerRx { get; set; }

        /// <summary>
        /// Flag to remove Benefit Plan -  Pharmacy type and Day Supply
        /// </summary>
        public bool IsDeleted { get; set; }

        /// <summary>
        /// List of the Day supply Types
        /// </summary>
        public List<BenefitPlanPharmacyTypeDaySupplyVM> DaySupplyTypeList { get; set; }

        public BenefitPlanPharmacyTypeVM()
        {
            this.DaySupplyTypeList = new List<BenefitPlanPharmacyTypeDaySupplyVM>();
        }
    }
}