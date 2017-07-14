using Atlas.BenefitPlan.DAL.Models.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Transition Rules View Model
    /// </summary>
    public class TransitionRulesVM : BaseViewModel
    {
        /// <summary>the Benefit Plan key </summary>
        [Range(1, double.MaxValue, ErrorMessage = "BnftPlanSK field is required.")]
        public long BnftPlanSK { get; set; }

        /// <summary>Flag Indicating if Benefit Plan Allows Transition Fills</summary>
        public bool AllowTransitionFillsInd { get; set; }

        /// <summary>Transition Time Frame (Days)</summary>
        public Nullable<int> TransitionTimeframeDays { get; set; }

        /// <summary>System Lock Back Period (Days) </summary>
        public Nullable<int> TransitionLookBackPerDays { get; set; }

        /// <summary>Transition Days Allowed LTC </summary>
        public Nullable<int> LTCTransitionAlwdDays { get; set; }

        /// <summary>Transition Days Allowed Retail</summary>
        public Nullable<int> RtlTransitionAlwdDays { get; set; }

        /// <summary>Flag Indicating Restart Plan Year </summary>
        public bool RestartTransitionatPlanYrInd { get; set; }

        /// <summary>Restart Month </summary>
        public Nullable<byte> TransitionRestartMthNbr { get; set; }
    }
}