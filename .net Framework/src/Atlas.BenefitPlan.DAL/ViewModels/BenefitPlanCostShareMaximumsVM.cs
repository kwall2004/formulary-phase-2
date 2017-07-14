using Atlas.BenefitPlan.DAL.Models.Containers;
using System.Collections.Generic;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// Copay Setup View Model
    /// </summary>
    public class BenefitPlanCostShareMaximumsVM : BaseViewModel
    {
        /// <summary>
        /// the Benefit plan SK
        /// </summary>
        public long BnftPlanSK { get; set; }

        /// <summary>
        /// indicate whether Embeddded should be selected
        /// </summary>
        public bool EmbeddedDeductiblesInd { get; set; }

        /// <summary>
        /// sk for individual, family, etc
        /// </summary>
        public long DeducblScopeTypeSK { get; set; }

        /// <summary>
        /// individual, family, etc
        /// </summary>
        public string DeducblScopeTypeCode { get; set; }

        /// <summary>
        /// individual, family, etc
        /// </summary>
        public string DeducblScopeTypeDescription { get; set; }

        /// <summary>
        /// plan level deductible for the scope type
        /// </summary>
        public decimal? PlanLevelDeductible { get; set; }

        /// <summary>
        /// max out of pocket for the scope type
        /// </summary>
        public decimal? MaxOutofPocket { get; set; }

        /// <summary>
        /// plan year max benefit for the scope type
        /// </summary>
        public decimal? PlanYearMaxBenefit { get; set; }

        /// <summary>
        /// lifetime benefit for for the scope type
        /// </summary>
        public decimal? MaxLifetimeBenefit { get; set; }

        /// <summary>
        /// RX Deductible for for the scope type
        /// </summary>
        public decimal? RXDeductible { get; set; }

        /// <summary>
        /// list of dynamic network tier info
        /// </summary>
        public List<CostShareMaximumsNetworkDetail> NetworkTiers { get; set; }

        /// <summary>
        /// If the whole row has been deleted.
        /// </summary>
        public bool Deleted { get; set; }

        public BenefitPlanCostShareMaximumsVM()
        {
            NetworkTiers = new List<CostShareMaximumsNetworkDetail>();
        }
    }
}