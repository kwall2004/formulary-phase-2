using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.ViewModels;
using System.Collections.Generic;

namespace Atlas.BenefitPlan.BLL.Interfaces
{
    /// <summary>
    /// The Interface for Benefit Plan Transition BLL for Benefit Plan
    /// </summary>
    public interface IBenefitPlanTransitionBLL
    {
        /// <summary>
        /// Get Low Income Cost Sharing Subsidy
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan ID</param>
        /// <returns>List of Low Income Cost Sharing Subsidy View Models</returns>
        List<LowIncomeCostSharingSubsidyVM> GetLowIncomeCostSharingSubsidys(long bnftPlanSK);

        /// <summary>
        /// Get Transition Rules
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan ID</param>
        /// <returns>Transition Rules for the Benefit Plan</returns>
        TransitionRulesVM GetTransitionRules(long bnftPlanSK);

        /// <summary>
        /// Set Low Income Cost Sharing Subsidy
        /// </summary>
        /// <param name="itemToAddOrUpdate">Low Income Cost Sharing Subsidy View Models</param>
        /// <returns>LowIncomeCostSharingSubsidyVM.</returns>
        LowIncomeCostSharingSubsidyVM SetLowIncomeCostSharingSubsidys(LowIncomeCostSharingSubsidyVM itemToAddOrUpdate);

        /// <summary>
        /// Add or Update Transition Rules
        /// </summary>
        /// <param name="itemToAddOrUpdate">the Transition Rules to Add or Update</param>
        /// <returns>TransitionRulesVM.</returns>
        TransitionRulesVM SetTransitionRules(TransitionRulesVM itemToAddOrUpdate);

        /// <summary>
        /// Validate Transition Rules
        /// </summary>
        /// <param name="itemToValidate">the TransitionRule Entry to Validate</param>
        /// <returns>List&lt;Message&gt;.</returns>
        List<Message> ValidateTransitionRules(TransitionRulesVM itemToValidate);
    }
}