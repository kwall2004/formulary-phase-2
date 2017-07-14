using Atlas.BenefitPlan.DAL.Infrastructure.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Population Group Plan Benefit Package View Model
    /// </summary>
    public class PopulationGroupPlanBenefitPackageVM : BaseViewModel
    {
        /// <summary>The Population Group PBP Key</summary>
        public long PopGrpPBPSK { get; set; }

        /// <summary>The Population Group Key</summary>
        [Range(1, double.MaxValue, ErrorMessage = "PopGrpSK field is required.")]
        public long PopGrpSK { get; set; }

        /// <summary>The PBP Key</summary>
        [Range(1, double.MaxValue, ErrorMessage = "PBPSK field is required.")]
        public long PBPSK { get; set; }

        /// <summary>The Plan Benefit Code</summary>
        [MaxLength(25)]
        public string PlanPgmCode { get; set; }

        /// <summary>The Accumulator Restart Month</summary>
        public byte? AccumtrRestartMth { get; set; }

        /// <summary>The Accumulator Restart Day</summary>
        public byte? AccumtrRestartDay { get; set; }

        /// <summary>The Date of Service Processing Start Date</summary>
        public Nullable<System.DateTime> DOSProcsngStartDt { get; set; }

        /// <summary>The Date of Service Processing End Date</summary>
        [CompareEffectiveDates("DOSProcsngStartDt")]
        public Nullable<System.DateTime> DOSProcsngEndDt { get; set; }

        /// <summary>The Population Group PBP Effective Start Date</summary>
        public System.DateTime PopGrpPBPEfctvStartDt { get; set; }

        /// <summary>The Population Group PBP Effective End Date</summary>
        public System.DateTime PopGrpPBPEfctvEndDt { get; set; }

        /// <summary>The  PBP Effective Start Date</summary>
        public System.DateTime PBPEfctvStartDt { get; set; }

        /// <summary>The  PBP Effective End Date</summary>
        public System.DateTime PBPEfctvEndDt { get; set; }

        /// <summary>The List of Benefit Plans</summary>
        public List<PopulationGroupBenefitPlanVM> BenefitPlans { get; set; }

        #region # Reference Properties #

        /// <summary>The Population Group Plan Benefit Package Work-flow Status</summary>
        public string WorkFlowStatus { get; set; }

        /// <summary>The Plan Benefit Package Name</summary>
        public string PBPName { get; set; }

        /// <summary>The Plan Benefit Package ID</summary>
        public string PBPID { get; set; }

        #endregion # Reference Properties #

        /// <summary>
        /// The Constructor for the Population Group Plan Benefit Package View Model
        /// </summary>
        public PopulationGroupPlanBenefitPackageVM()
        {
            this.BenefitPlans = new List<PopulationGroupBenefitPlanVM>();
        }
    }
}