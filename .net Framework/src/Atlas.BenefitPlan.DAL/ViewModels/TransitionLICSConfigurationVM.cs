using Atlas.BenefitPlan.DAL.Models.Containers;
using System.Collections.Generic;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Transition LICS Configuration View Model
    /// </summary>
    public class TransitionLICSConfigurationVM
    {
        /// <summary>the Transition Rules</summary>
        public TransitionRulesVM TransitionRules { get; set; }

        /// <summary>List of LICS Setup Records</summary>
        public List<LowIncomeCostSharingSubsidyVM> LICSSetup { get; set; }

        public TransitionLICSConfigurationVM()
        {
            this.LICSSetup = new List<LowIncomeCostSharingSubsidyVM>();
        }

        #region " Reference Data "

        /// <summary>List of LICS Types</summary>
        public List<DropDownList> LICSType { get; set; }

        /// <summary>List of Formulary Tiers</summary>
        public List<DropDownList> FormularyTier { get; set; }

        /// <summary>List of CoveragePhases</summary>
        public List<DropDownList> CoveragePhase { get; set; }

        /// <summary>List of Copay Coinsurance Logic</summary>
        public List<DropDownList> CopayCoinsuranceLogic { get; set; }

        /// <summary>List of Months</summary>
        public List<DropDownList> Months { get; set; }

        #endregion " Reference Data "
    }
}