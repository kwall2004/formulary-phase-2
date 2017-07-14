using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Population Group Benefit Plan View Model
    /// </summary>
    public class PopulationGroupBenefitPlanVM : BaseViewModel
    {
        /// <summary>the Population Group Benefit Plan SK</summary>
        public long PopGrpBnftPlanSK { get; set; }

        /// <summary>the Population Group Plan Benefit Package SK</summary>
        public long PopGrpPBPSK { get; set; }

        /// <summary>the Plan Benefit Package Benefit Plan SK</summary>
        [Range(1, double.MaxValue, ErrorMessage = "PBPSK field is required.")]
        public long PBPBnftPlanSK { get; set; }

        /// <summary>the Account RXBIN Key</summary>
        public Nullable<long> AcctRXBINSK { get; set; }

        /// <summary>the Account PCN Key</summary>
        public Nullable<long> AcctPCNSK { get; set; }

        /// <summary>the DMR Processing Day Limit</summary>
        [RegularExpression(@"((^[0-9]+$|^$))", ErrorMessage = "DMRProcsngDayLim must be a positive integer")]
        public Nullable<int> DMRProcsngDayLim { get; set; }

        /// <summary>the UCF Processing Window Day Limit</summary>
        [RegularExpression(@"((^[0-9]+$|^$))", ErrorMessage = "UCFProcsngWindowDayLim must be a positive integer")]
        public Nullable<int> UCFProcsngWindowDayLim { get; set; }

        /// <summary>the Paper Processing Day Limit</summary>
        [RegularExpression(@"((^[0-9]+$|^$))", ErrorMessage = "PaperProcsngDayLim must be a positive integer")]
        public Nullable<int> PaperProcsngDayLim { get; set; }

        /// <summary>the Electronic Processing Day Limit</summary>
        [RegularExpression(@"((^[0-9]+$|^$))", ErrorMessage = "ElctrncProcsngDayLim must be a positive integer")]
        public Nullable<int> ElctrncProcsngDayLim { get; set; }

        /// <summary>the Claim Reversal Day Limit</summary>
        [RegularExpression(@"((^[0-9]+$|^$))", ErrorMessage = "ClmReversalDayLim must be a positive integer")]
        public Nullable<int> ClmReversalDayLim { get; set; }

        /// <summary>the Process Out of Network Claims indicator</summary>
        public bool PrcsOutofNtwrkClaimsInd { get; set; }

        /// <summary>the Payable Patient Responsibility Codes/summary>
        public string PayblPatRespCodes { get; set; }

        public List<NetworkNetworkTierVM> ProviderNetworkTiers { get; set; }

        #region # Reference Properties #

        /// <summary>the Benefit Plan SK</summary>
        public long BnftPlanSK { get; set; }

        /// <summary>the Benefit Plan Type</summary>
        public string BenefitPlanType { get; set; }

        /// <summary>the Benefit Plan Name</summary>
        public string BnftPlanName { get; set; }

        /// <summary>the Benefit Plan ID</summary>
        public string BnftPlanID { get; set; }

        #endregion # Reference Properties #

        /// <summary>
        /// The Constructor for PopulationGroup Benefit PlanVM
        /// </summary>
        public PopulationGroupBenefitPlanVM()
        {
            this.ProviderNetworkTiers = new List<NetworkNetworkTierVM>();
        }
    }
}