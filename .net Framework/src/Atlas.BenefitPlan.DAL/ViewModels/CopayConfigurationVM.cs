using Atlas.BenefitPlan.DAL.Models.Containers;
using System.Collections.Generic;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// Copay Configuration View Model
    /// </summary>
    public class CopayConfigurationVM
    {
        /// <summary>List of LICS Setup Records</summary>
        public List<CopaySetupVM> CopaySetup { get; set; }

        public CopayConfigurationVM()
        {
            this.CopaySetup = new List<CopaySetupVM>();
        }

        #region " Reference Data "

        /// <summary>List of CoveragePhases</summary>
        public List<DropDownList> CoveragePhase { get; set; }

        /// <summary>List of Copay Coinsurance Logic</summary>
        public List<DropDownList> CopayCoinsuranceLogic { get; set; }

        /// <summary>List of Formulary Tiers</summary>
        public List<DropDownList> FormularyTier { get; set; }

        /// <summary>List of Network Tiers</summary>
        public List<DropDownList> NetworkTier { get; set; }

        /// <summary>List of Network Tiers</summary>
        public List<PharmacyTypeWithDaySupply> PharmacyTypes { get; set; }

        #endregion " Reference Data "
    }
}