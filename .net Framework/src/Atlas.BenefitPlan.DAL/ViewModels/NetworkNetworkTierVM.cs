using Atlas.BenefitPlan.DAL.Infrastructure.Attributes;
using System;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Network Network Tier View Model
    /// </summary>
    public class NetworkNetworkTierVM : BaseViewModel
    {
        /// <summary>the Population Group Benefit Plan SK</summary>
        public long NtwrkNtwrkTierSK { get; set; }

        /// <summary>the Population Group Benefit Plan SK</summary>
        public long PopGrpBnftPlanSK { get; set; }

        /// <summary>the Benefit Plan SK</summary>
        public long BnftPlanSK { get; set; }

        /// <summary>the Network Tier SK</summary>
        public long NtwrkTierSK { get; set; }

        /// <summary>the Network SK</summary>
        [Range(1, double.MaxValue, ErrorMessage = "Network Tier is required.")]
        public long NtwrkSK { get; set; }

        /// <summary>the MAC List SK</summary>
        public Nullable<long> MACListSK { get; set; }

        /// <summary>the Effective Start Date</summary>
        [DateRequired]
        public System.DateTime EfctvStartDt { get; set; }

        /// <summary>the Effective End Date</summary>
        [DateRequired]
        [CompareEffectiveDates("EfctvStartDt")]
        public System.DateTime EfctvEndDt { get; set; }

        #region # Reference Properties #

        /// <summary>the Network Tier NameK</summary>
        public string NtwrkTierName { get; set; }

        /// <summary>Has the Record been deleted</summary>
        public bool Deleted { get; set; }

        #endregion # Reference Properties #

        /// <summary>The Network Network Tier Constructor</summary>
        public NetworkNetworkTierVM()
        {
            this.Deleted = false;
        }
    }
}