using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.ViewModels;
using System.Collections.Generic;

namespace Atlas.BenefitPlan.BLL.Interfaces
{
    /// <summary>
    /// The Interface for Coverage Set BLL for Benefit Plan
    /// </summary>
    public interface ICoverageSetBLL
    {
        /// <summary>
        /// Get Coverage Set Configuration By cvrgSetSK
        /// </summary>
        /// <param name="cvrgSetSK">cvrgSetSK</param>
        /// <returns>CoverageSetConfigurationVM</returns>
        CoverageSetConfigurationVM GetCoverageSetConfiguration(long cvrgSetSK);

        /// <summary>
        /// Add or Update Coverage Set Configuration
        /// </summary>
        /// <param name="itemToAddOrUpdate">CoverageSetConfigurationVM</param>
        /// <returns>CoverageSetConfigurationVM</returns>
        CoverageSetConfigurationVM SetCoverageSetConfiguration(CoverageSetConfigurationVM itemToAddOrUpdate);

        /// <summary>
        /// Validate Coverage Set Configuration
        /// </summary>
        /// <param name="itemToValidate">CoverageSetConfigurationVM</param>
        /// <returns>List&lt;Message&gt;.</returns>
        List<Message> ValidateCoverageSetConfiguration(CoverageSetConfigurationVM itemToValidate);

        ///// <summary>
        ///// Get Benefit CoverageSet Detail By BnftPlanBnftSK
        ///// </summary>
        ///// <param name="bnftPlanBnftSK">bnftPlanBnftSK</param>
        ///// <returns>BenefitCoverageSetDetailsVM</returns>
        //BenefitCoverageSetDetailsVM GetBenefitCoverageSetDetail(long bnftPlanBnftSK);

        ///// <summary>
        ///// Get the list of Benefit CoverageSet Details By BnftPlanSK
        ///// </summary>
        ///// <param name="bnftPlanSK">bnftPlanSK</param>
        ///// <returns>BenefitCoverageSetDetailsVM</returns>
        //List<BenefitCoverageSetDetailsVM> GetBenefitCoverageSetDetails(long bnftPlanSK);

        /// <summary>
        /// Add or Update Benefit CoverageSet Detail
        /// </summary>
        /// <param name="itemToAddOrUpdate">BenefitCoverageSetDetailsVM</param>
        /// <returns>BenefitCoverageSetDetailsVM</returns>
        BenefitCoverageSetDetailsVM SetBenefitCoverageSetDetail(BenefitCoverageSetDetailsVM itemToAddOrUpdate);

        /// <summary>
        /// Validate Benefit CoverageSet Detail
        /// </summary>
        /// <param name="itemToValidate">the Benefit CoverageSet Detail to Validate</param>
        /// <returns>List&lt;Message&gt;.</returns>
        List<Message> ValidateBenefitCoverageSetDetail(BenefitCoverageSetDetailsVM itemToValidate);
    }
}