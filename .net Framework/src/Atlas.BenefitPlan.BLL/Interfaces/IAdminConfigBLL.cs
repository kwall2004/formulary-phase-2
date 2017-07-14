using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.ViewModels;
using System;
using System.Collections.Generic;

namespace Atlas.BenefitPlan.BLL.Interfaces
{
    /// <summary>
    /// The Interface for AdminConfig BLL for Benefit Plan
    /// </summary>
    public interface IAdminConfigBLL
    {
        /// <summary>
        /// Gets the Prescribers from Allowed Prescribers List
        /// </summary>
        /// <returns>List&lt;AllowedPrescribersVM&gt;.</returns>
        List<AllowedPrescribersVM> GetAllAllowedPrescriberLists();

        /// <summary>
        /// Add or Update an AllowedPrescriber List
        /// </summary>
        /// <param name="itemToAddOrUpdate">the AllowedPrescriber List to Add or Update</param>
        /// <returns>AllowedPrescribersVM.</returns>
        AllowedPrescribersVM SetAllowedPrescriberList(AllowedPrescribersVM itemToAddOrUpdate);

        /// <summary>
        /// Validate Allowed Prescriber List
        /// </summary>
        /// <param name="itemToValidate">the AllowedPrescriber List to Validate</param>
        /// <returns>List&lt;Message&gt;.</returns>
        List<Message> ValidateAllowedPrescriberList(AllowedPrescribersVM itemToValidate);

        /// <summary>
        /// Gets the Prescribers from PrescriberDrugOverride List
        /// </summary>
        /// <returns>List&lt;PrescriberDrugOverrideVM&gt;.</returns>
        List<PrescriberDrugOverrideVM> GetAllPrescriberDrugOverrideLists();

        /// <summary>
        /// Add or Update a PrescriberDrugOverride List
        /// </summary>
        /// <param name="itemToAddOrUpdate">the PrescriberDrugOverride List to Add or Update</param>
        /// <returns>PrescriberDrugOverrideVM.</returns>
        PrescriberDrugOverrideVM SetPrescriberDrugOverrideList(PrescriberDrugOverrideVM itemToAddOrUpdate);

        /// <summary>
        /// Validate PrescriberDrugOverride List
        /// </summary>
        /// <param name="itemToValidate">thePrescriberDrugOverride List to Validate</param>
        /// <returns>List&lt;Message&gt;.</returns>
        List<Message> ValidatePrescriberDrugOverrideList(PrescriberDrugOverrideVM itemToValidate);

        /// <summary>
        /// Get all Benefit Definitions by Search Params
        /// </summary>
        /// <param name="bnftName">the bnft name</param>
        /// <param name="bnftCode">the bnft Code</param>
        /// <param name="svcTypeSK">The SVC type sk.</param>
        /// <param name="efctvStartDt">The efctv start dt.</param>
        /// <param name="efctvEndDt">The efctv end dt.</param>
        /// <returns>List&lt;spBenefitDefinitionSearch_Result&gt;.</returns>
        List<spBenefitDefinitionSearch_Result> BenefitDefinitionSearch(string bnftName = null, string bnftCode = null, long? svcTypeSK = null, DateTime? efctvStartDt = null, DateTime? efctvEndDt = null);

        /// <summary>
        /// Get all Benefits by Search Text
        /// </summary>
        /// <returns>List&lt;BenefitServiceTypeVM&gt;.</returns>
        List<BenefitServiceTypeVM> GetAllBenefitServiceTypes();

        /// <summary>
        /// Get all Benefits by Search Text
        /// </summary>
        /// <param name="searchText">The search text.</param>
        /// <returns>List&lt;BenefitServiceTypeVM&gt;.</returns>
        List<BenefitServiceTypeVM> GetAllBenefitServiceTypes(string searchText);

        /// <summary>
        /// Get all Benefits
        /// </summary>
        /// <returns>List&lt;Bnft&gt;.</returns>
        List<Bnft> GetAllBenefits();

        /// <summary>
        /// Get all Benefits by BenefitSK
        /// </summary>
        /// <param name="BnftSK">BnftSK</param>
        /// <returns>List&lt;Bnft&gt;.</returns>
        List<Bnft> GetAllBenefits(long BnftSK);

        /// <summary>
        /// Get BenefitDefinition by BenefitSK
        /// </summary>
        /// <param name="BnftSK">BnftSK</param>
        /// <returns>BenefitDefinitionVM.</returns>
        BenefitDefinitionVM GetBenefitDefinition(long BnftSK);

        /// <summary>
        /// Add or Update a BenefitDefinition
        /// </summary>
        /// <param name="itemToAddOrUpdate">the BenefitDefinition to Add or Update</param>
        /// <returns>BenefitDefinitionVM.</returns>
        BenefitDefinitionVM SetBenefitDefinition(BenefitDefinitionVM itemToAddOrUpdate);

        /// <summary>
        /// Validate BenefitDefinition
        /// </summary>
        /// <param name="itemToValidate">the BenefitDefinition to Validate</param>
        /// <returns>List of Message.</returns>
        List<Message> ValidateBenefitDefinition(BenefitDefinitionVM itemToValidate);

        /// <summary>
        /// Get BenefitDetail by BenefitSK
        /// </summary>
        /// <param name="BnftSK">BnftSK</param>
        /// <returns>BenefitDetailVM.</returns>
        BenefitDetailVM GetBenefitDetail(long BnftSK);

        /// <summary>
        /// Add or Update a BenefitDetail
        /// </summary>
        /// <param name="itemToAddOrUpdate">the BenefitDetail to Add or Update</param>
        /// <returns>BenefitDetailVM.</returns>
        BenefitDetailVM SetBenefitDetail(BenefitDetailVM itemToAddOrUpdate);

        /// <summary>
        /// Validate BenefitDetail
        /// </summary>
        /// <param name="itemToValidate">the BenefitDetail to Validate</param>
        /// <returns>List of Message</returns>
        List<Message> ValidateBenefitDetail(BenefitDetailVM itemToValidate);
    }
}