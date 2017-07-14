using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.BenefitPlan.DAL.ViewModels;
using System.Collections.Generic;

namespace Atlas.BenefitPlan.BLL.Interfaces
{
    /// <summary>
    /// The Interface for Benefit Plan Pharmacy Type BLL for Benefit Plan
    /// </summary>
    public interface IBenefitPlanPharmacyTypeBLL
    {
        /// <summary>
        /// Adds Or Updates the Benefit Plan - Pharmacy Pricing Details
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <returns>PharmacyPricingDetailVM.</returns>
        PharmacyPricingDetailVM AddOrUpdateAllBenefitPlanPharmPrcg(PharmacyPricingDetailVM itemToAddOrUpdate);

        #region " Benefit Plan Pharmacy Type "
        /// <summary>
        /// Gets all the Day Supply for the selected Benefit Plan-Pharmacy Type
        /// </summary>
        /// <param name="bnftPlanSK">The BNFT plan sk.</param>
        /// <returns>List&lt;BenefitPlanPharmacyTypeVM&gt;.</returns>
        List<BenefitPlanPharmacyTypeVM> GetBenefitPlanPharmTypes(long bnftPlanSK);

        /// <summary>
        /// Gets all the Pharmacy Types by Network Tier for the selected Benefit Plan
        /// </summary>
        /// <param name="bnftPlanSK">The BNFT plan sk.</param>
        /// <param name="ntwrkTierSK">The Ntwrk Tier sk.</param>
        /// <returns>List of PharmacyTypeWithNetworkTier</returns>
        List<PharmacyTypeWithNetworkTier> GetBenefitPlanPharmTypes(long bnftPlanSK, long ntwrkTierSK);

        /// <summary>
        /// Add/Update Benefit Plan Pharmacy Type Day Supply
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <returns>BenefitPlanPharmacyTypeVM.</returns>
        BenefitPlanPharmacyTypeVM SetBenefitPlanPharmType(BenefitPlanPharmacyTypeVM itemToAddOrUpdate);

        #endregion " Benefit Plan Pharmacy Type "
        #region " Copay Configuration "

        /// <summary>
        /// Get Method to Get all Copay Setup for a Benefit Plan
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan Key</param>
        /// <returns>List of Copay Setup View Models</returns>
        List<CopaySetupVM> GetAllCopaySetup(long bnftPlanSK);

        /// <summary>
        /// Add or Update a Copay Setup for a Plan Benefit Package
        /// </summary>
        /// <param name="itemToAddOrUpdate">theCopay Setup to Add or Update</param>
        /// <returns>CopaySetupVM.</returns>
        CopaySetupVM SetCopaySetup(CopaySetupVM itemToAddOrUpdate);

        #endregion " Copay Configuration "
    }
}