using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    public class BenefitPlanPharmacyTypeDaySupplyVM : BaseViewModel
    {
        /// <summary>
        /// Id of the Day Supply for the BenefitPlan PharmacyType
        /// </summary>
        [Range(0, double.MaxValue, ErrorMessage = "Day Supply Type Id should be greater than 1")]
        public long BnftPlanPharmTypeDaySuplSK { get; set; }

        /// <summary>
        /// Id of the Day SupplyType
        /// </summary>
        [Range(1, double.MaxValue, ErrorMessage = "Day Supply Type Id should be greater than 1")]
        public long DaySuplTypeSK { get; set; }

        /// <summary>
        /// Maximum Cost of Day Supply
        /// </summary>
        public decimal? MaximumCost { get; set; }

        /// <summary>
        /// Code of the Day Supply Type
        /// </summary>
        public string DaySuplTypeCode { get; set; }

        /// <summary>
        /// Desc of the Day Suply Type
        /// </summary>
        public string DaySuplTypeDesc { get; set; }

        /// <summary>
        /// Flag to delete the record of Day supply for a benefit plan pharmacy Type
        /// </summary>
        public bool IsDeleted { get; set; }
    }
}