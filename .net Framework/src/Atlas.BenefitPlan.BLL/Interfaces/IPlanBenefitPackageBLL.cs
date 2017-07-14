using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.ViewModels;
using System;
using System.Collections.Generic;

namespace Atlas.BenefitPlan.BLL.Interfaces
{
    /// <summary>
    /// The Interface for Plan Benefit Package BLL for Benefit Plan
    /// </summary>
    public interface IPlanBenefitPackageBLL
    {
        /// <summary>
        /// PBP Search
        /// </summary>
        /// <param name="pBPSK">the PBP ID</param>
        /// <param name="lOBSK">the line of business</param>
        /// <param name="bnftPlanTypeSK">the benefit plan type</param>
        /// <param name="tenantFamName">tenant family name to search</param>
        /// <param name="tenantName">tenant name to search</param>
        /// <param name="acctName">account name</param>
        /// <param name="grpName">group name</param>
        /// <param name="popGrpName">population group name</param>
        /// <param name="efctvStartDt">effective start date</param>
        /// <param name="efctvEndDt">effective end date</param>
        /// <returns>list of PBPs</returns>
        List<spPlanBenefitPackageSearch_Result> PlanBenefitPackageSearch(long? pBPSK, long? lOBSK, long? bnftPlanTypeSK
            , string tenantFamName, string tenantName, string acctName, string grpName, string popGrpName
            , DateTime? efctvStartDt, DateTime? efctvEndDt);

        /// <summary>
        /// PBP Search By Text
        /// </summary>
        /// <param name="pbpName">the PBP Name</param>
        /// <param name="lOBSK">the line of business</param>
        /// <param name="bnftPlanTypeSK">the benefit plan type</param>
        /// <param name="tenantFamName">tenant family name to search</param>
        /// <param name="tenantName">tenant name to search</param>
        /// <param name="acctName">account name</param>
        /// <param name="grpName">group name</param>
        /// <param name="popGrpName">population group name</param>
        /// <param name="efctvStartDt">effective start date</param>
        /// <param name="efctvEndDt">effective end date</param>
        /// <returns>list of PBPs</returns>
        List<spPlanBenefitPackageSearchByText_Result> PlanBenefitPackageSearchByText(string pbpName, long? lOBSK, long? bnftPlanTypeSK
            , string tenantFamName, string tenantName, string acctName, string grpName, string popGrpName
            , DateTime? efctvStartDt, DateTime? efctvEndDt);

        #region " Plan Benefit Package - PBP"

        /// <summary>
        /// Adds/Update the PlanBenefitPackage
        /// </summary>
        /// <param name="itemToAddOrUpdate">the Plan Benefit Package View Model to Update</param>
        /// <returns>a Plan Benefit Package View Model</returns>
        PlanBenefitPackageVM AddOrUpdatePlanBenefitPackage(PlanBenefitPackageVM itemToAddOrUpdate);

        /// <summary>
        /// Assign the Benefit Plan TO PlanBenefitPackage
        /// </summary>
        /// <param name="pbpSK">the Plan Benefit Package SK</param>
        /// <param name="bnftPlanSK">the Benefit Plan SK</param>
        /// <param name="currentUser">The current user.</param>
        /// <returns>key of new addition</returns>
        long AssignBnftPlanToPlanBnftPackage(long pbpSK, long bnftPlanSK, string currentUser);

        /// <summary>
        /// Get the Benefit Package details and Benefit Plans
        /// </summary>
        /// <param name="pbpSK">the Plan Benefit Package SK</param>
        /// <returns>the Plan Benefit Package View Model</returns>
        PlanBenefitPackageVM GetPlanBenefitPackage(long pbpSK);

        /// <summary>
        /// Validate Plan Benefit Package
        /// </summary>
        /// <param name="itemToValidate">PlanBenefitPackageVM</param>
        /// <returns>List of Message</returns>
        List<Message> ValidatePlanBenefitPackage(PlanBenefitPackageVM itemToValidate);

        #endregion " Plan Benefit Package - PBP"

        #region " Plan Benefit Package - Savings Account"

        /// <summary>
        /// Get all savings account for given PBPSK
        /// STS
        /// </summary>
        /// <param name="pbpsk">The PBPSK.</param>
        /// <returns>List&lt;SavingsAccountVM&gt;.</returns>
        List<SavingsAccountVM> GetAllSavingsAccounts(long pbpsk);

        /// <summary>
        /// Add or update savings account
        /// STS
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <returns>SavingsAccountVM.</returns>
        SavingsAccountVM AddOrUpdateSavingsAccount(SavingsAccountVM itemToAddOrUpdate);

        #endregion " Plan Benefit Package - Savings Account"

        #region PBP Business Rules

        /// <summary>
        /// Get the business rules for the PBPSK
        /// </summary>
        /// <param name="pBPSK">The pBPSK.</param>
        /// <param name="categoryTypeCodes">The Category Type Codes.</param>
        /// <returns>list of business rule view models</returns>
        List<BusinessRulesVM> GetBusinessRules(long pBPSK, string[] categoryTypeCodes);

        /// <summary>
        /// Add or update business rules
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <returns>true if success</returns>
        BusinessRulesUpdateVM AddOrUpdateBusinessRules(BusinessRulesUpdateVM itemToAddOrUpdate);

        #endregion PBP Business Rules
    }
}