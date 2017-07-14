using Atlas.BenefitPlan.DAL.Models.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Threshold View Model
    /// </summary>
    public class ThresholdVM : BaseViewModel
    {
        /// <summary>
        /// a ThresholdSK
        /// </summary>
        [Range(0, double.MaxValue, ErrorMessage = "ThresholdSK field is required.")]
        public long ThresholdSK { get; set; }

        /// <summary>
        /// a CvrgSetThresholdSK
        /// </summary>
        [Range(0, double.MaxValue, ErrorMessage = "CvrgSetThresholdSK field is required.")]
        public long CvrgSetThresholdSK { get; set; }

        /// <summary>
        /// The Benefit Threshold Name
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        [MaxLength(30)]
        public string BenefitThresholdName { get; set; }

        /// <summary>
        /// a ThresholdQulfrTypeSK
        /// </summary>
        [Range(1, double.MaxValue, ErrorMessage = "ThresholdQulfrTypeSK field is required.")]
        public long ThresholdQulfrTypeSK { get; set; }

        /// <summary>
        /// a ThresholdLimitAmount
        /// </summary>
        [Range(0, double.MaxValue, ErrorMessage = "ThresholdLimit field is required.")]
        public int? ThresholdLimit { get; set; }

        /// <summary>
        /// The RestartThresholdCalendarYear
        /// </summary>
        [Required(AllowEmptyStrings = true)]
        [MaxLength(4)]
        public string RestartThresholdCalendarYear { get; set; }

        /// <summary>
        /// The RestartThresholdPlanYear
        /// </summary>
        [Required(AllowEmptyStrings = true)]
        [MaxLength(4)]
        public string RestartThresholdPlanYear { get; set; }

        /// <summary>
        /// a ThresholdRestartDaysAfterLastService
        /// </summary>
        public int? ThresholdRestartDaysAfterLastService { get; set; }

        /// <summary>
        /// a ThresholdRestartMonthsAfterLastService
        /// </summary>
        public int? ThresholdRestartMonthsAfterLastService { get; set; }

        /// <summary>
        /// a ThresholdRestartDaysAfterMbrEnroll
        /// </summary>
        public int? ThresholdRestartDaysAfterMbrEnroll { get; set; }

        /// <summary>
        /// a ThresholdRestartMonthsAfterMbrEnroll
        /// </summary>
        public int? ThresholdRestartMonthsAfterMbrEnroll { get; set; }

        /// <summary>
        /// a ThresholdRestartAtBegOfMonthNbr
        /// </summary>
        [EnumDataType(typeof(Month))]
        public int? ThresholdRestartAtBegOfMonthNbr { get; set; }

        /// <summary>
        /// the ApplyToBenefitThreshold
        /// </summary>
        public Boolean ApplyToBenefitThreshold { get; set; }

        /// <summary>
        /// the LimitByBenefitThreshold
        /// </summary>
        public Boolean LimitByBenefitThreshold { get; set; }

        /// <summary>
        /// The Deleted indicator
        /// </summary>
        public bool Deleted { get; set; }
    }
}