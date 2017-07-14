using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.Models.Enums;
using Atlas.BenefitPlan.DAL.ViewModels;
using System.Collections.Generic;

namespace Atlas.BenefitPlan.BLL.Interfaces
{
    /// <summary>
    /// The Interface for Criteria Group BLL for Benefit Plan
    /// </summary>
    public interface ICriteriaGroupBLL
    {
        /// <summary>
        /// Get ValueQualifierTypes by Criteria Set Type
        /// </summary>
        /// <param name="criteriaSetType">CriteriaSetType</param>
        /// <returns>List of ValQulfrType</returns>
        List<ValQulfrType> GetAllValueQualifierTypes(long? criteriaSetType = null);

        /// <summary>
        /// Get Rule Sets by Criteria Set Type and objectSK
        /// </summary>
        /// <param name="criteriaSetType">CriteriaSetType</param>
        /// <param name="objectSK">bnft or cvrgSet</param>
        /// <returns>List of RuleSetVM</returns>
        List<RuleSetVM> GetAllRuleSets(CriteriaSetType criteriaSetType, long objectSK);

        /// <summary>
        /// Get Criteria Sets by CriteriaSetType
        /// </summary>
        /// <param name="criteriaSetType">CriteriaSetType</param>
        /// <returns>List of CriteriaSetVM</returns>
        List<CriteriaSetVM> GetCriteriaSets(CriteriaSetType criteriaSetType);

        /// <summary>
        /// Get all Criteria Sets by CriteriaSetType and objectSK
        /// </summary>
        /// <param name="criteriaSetType">CriteriaSetType</param>
        /// <param name="objectSK">bnft or cvrgSet</param>
        /// <returns>List of CriteriaSetVM</returns>
        List<CriteriaSetVM> GetAllCriteriaSets(CriteriaSetType criteriaSetType, long objectSK);

        /// <summary>
        /// Get Rule Sets by Criteria Set
        /// </summary>
        /// <param name="crtriaSetSK">crtriaSetSK</param>
        /// <returns>List of CriteriaDetailVM</returns>
        List<CriteriaDetailVM> GetAllRuleDetails(long crtriaSetSK);

        /// <summary>
        /// Add or Update or Delete a Benefit Criteria Set
        /// </summary>
        /// <param name="itemToAddOrUpdate">A Benefit Criteria Set</param>
        /// <returns>A CriteriaSetVM</returns>
        CriteriaSetVM SetBenefitCriteriaSet(CriteriaSetVM itemToAddOrUpdate);

        /// <summary>
        /// Add or Update or Delete a Criteria Detail
        /// </summary>
        /// <param name="itemToAddOrUpdate">A Criteria Detail</param>
        /// <returns>A CriteriaDetailVM</returns>
        CriteriaDetailVM SetCriteriaDetail(CriteriaDetailVM itemToAddOrUpdate);

        /// <summary>
        /// Validate CriteriaSet
        /// </summary>
        /// <param name="itemToValidate">the CriteriaSet to Validate</param>
        /// <returns>List of Message</returns>
        List<Message> ValidateCriteriaSet(CriteriaSetVM itemToValidate);

        /// <summary>
        /// Remove a Criteria Detail from a Criteria Set
        /// </summary>
        /// <param name="crtriaDtlSK">the Criteria Detail SK</param>
        /// <param name="currentUser">the Current Username</param>
        void RemoveRuleDetail(long crtriaDtlSK, string currentUser);

        /// <summary>
        /// Remove a Criteria Set from a Benefit Definition
        /// </summary>
        /// <param name="bnftCrtriaSetSK">the Benefit Criteria Set SK</param>
        /// <param name="currentUser">the Current Username</param>
        void RemoveRuleSet(long bnftCrtriaSetSK, string currentUser);

    }
}