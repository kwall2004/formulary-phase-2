using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Atlas.BenefitPlan.DAL.Repositories.Interfaces
{
    /// <summary>
	/// the interface for all Stored Procedure Repository in Benefit Plan
	/// </summary>
    public interface IAtlasBenefitPlanStoredProcsRepository : IRepository<object>
    {
        /// 

        /// <summary>
        /// PopGrpBnftPkgWorkflow stored procedure
        /// </summary>
        /// <param name="statusType"></param>
        /// <param name="startDate"></param>
        /// <param name="endDate"></param>
        /// <returns></returns>
        List<spPopGrpBnftPkgWorkflow_Result> GetPopGrpBnftPkgWorkflows(long statusType, DateTime startDate, DateTime endDate);

        /// <summary>
        /// Execute the Copay Setup Copy Stored Procedure
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan Key</param>
        /// <param name="copyFromPharmTypeSK">the Pharmacy Type SK to copy From</param>
        /// <param name="copyToPharmTypes">the Pharmacy Type SKs to copy To</param>
        /// <param name="copyFromNtwrkTierSK">the Network Tier SK to copy From</param>
        /// <param name="copyToNtwrkTierSK">the Network Tier SK to copy To</param>
        /// <param name="overwriteDuplicates">the overwrite duplicates indicator</param>
        /// <param name="username">the Current Username</param>
        /// <returns>execution return code</returns>
        int CopaySetupCopy(int? bnftPlanSK, int? copyFromPharmTypeSK, string copyToPharmTypes, int? copyFromNtwrkTierSK, int? copyToNtwrkTierSK, Boolean? overwriteDuplicates ,string username);

        /// <summary>
        /// Execute the LICS Setup Copy Stored Procedure
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan Key</param>
        /// <param name="copyFromLICSTypeSK">the LICS Type SK to copy From</param>
        /// <param name="copyToLICSTypes">the LICS Type SKs to copy To</param>
        /// <param name="copyFromPharmTypeSK">the Pharm Type SK to copy From</param>
        /// <param name="copyToPharmTypes">the Pharm Type SKs to copy To</param>
        /// <param name="overwriteDuplicates">the overwrite duplicates indicator</param>
        /// <param name="username">the Current Username</param>
        /// <returns>execution return code</returns>
        int LICSSetupCopy(int? bnftPlanSK, int? copyFromLICSTypeSK, string copyToLICSTypes, int? copyFromPharmTypeSK, string copyToPharmTypes, Boolean? overwriteDuplicates, string username);

        /// <summary>
        /// Execute the Benefit Definition Copy Stored Procedure
        /// </summary>
        /// <param name="origBnftSK">the Copy From Benefit SK</param>
        /// <param name="username">the Current Username</param>
        /// <returns>execution return code</returns>
        long BenefitCopyDefinition(long origBnftSK, string username);

        /// <summary>
        /// Execute the Group Contents Copy Stored Procedure
        /// </summary>
        /// <param name="jsonString">the JSON String</param>
        /// <returns>execution return code</returns>
        int GroupCopyContents(string jsonString);
        
        /// <summary>
        /// Executes the spAccountTenantIndustryIdentifier stored procedure
        /// </summary>
        /// <param name="acctSK">the Account ID</param>
        /// <returns>List of Tenant Hierarchy Search Results</returns>
        IQueryable<spAccountTenantIndustryIdentifier_Result> GetAccountTenantIndustryIdentifier(long acctSK);

        /// <summary>
        /// Executes the spTenantHierarchySearch stored procedure
        /// </summary>
        /// <param name="SearchText">the Search Text for spTenantHierarchySearch</param>
        /// <returns>List of Tenant Hierarchy Search Results</returns>
        IQueryable<TenantHierarchySearch_Result> GetTenantHierarchySearch(string SearchText);

        /// <summary>
        /// Executes the spTenantHierarchyAdvancedSearch stored procedure
        /// </summary>
        /// <param name="SearchField">the Search Field for spTenantHierarchyAdvancedSearch</param>
        /// <param name="SearchText">the Search Text for spTenantHierarchyAdvancedSearch</param>
        /// <returns>List of Tenant Hierarchy Search Results</returns>
        IQueryable<TenantHierarchySearch_Result> GetTenantHierarchyAdvancedSearch(string SearchField, string SearchText);

        /// <summary>
        /// spPlanBenefitPackageSearch
        /// </summary>
        /// <param name="pBPSK">the PBP ID</param>
        /// <param name="lOBSK">the line of business </param>
        /// <param name="bnftPlanTypeSK">the benefit plan type</param>
        /// <param name="tenantFamName"> tenant family name to search</param>
        /// <param name="tenantName">tenant name to search</param>
        /// <param name="acctName">account name</param>
        /// <param name="grpName">group name</param>
        /// <param name="popGrpName">population group name</param>
        /// <param name="efctvStartDt">effective start date</param>
        /// <param name="efctvEndDt">effective end date</param>
        /// <returns>list of PBPs</returns>
        IQueryable<spPlanBenefitPackageSearch_Result> GetPlanBenefitPackageSearch(long? pBPSK, long? lOBSK, long? bnftPlanTypeSK, string tenantFamName, string tenantName
            , string acctName, string grpName, string popGrpName, DateTime? efctvStartDt, DateTime? efctvEndDt);

        /// <summary>
        /// spPlanBenefitPackageSearchByText
        /// </summary>
        /// <param name="pbpName">the PBP Name</param>
        /// <param name="lOBSK">the line of business </param>
        /// <param name="bnftPlanTypeSK">the benefit plan type</param>
        /// <param name="tenantFamName"> tenant family name to search</param>
        /// <param name="tenantName">tenant name to search</param>
        /// <param name="acctName">account name</param>
        /// <param name="grpName">group name</param>
        /// <param name="popGrpName">population group name</param>
        /// <param name="efctvStartDt">effective start date</param>
        /// <param name="efctvEndDt">effective end date</param>
        /// <returns>list of PBPs</returns>
        IQueryable<spPlanBenefitPackageSearchByText_Result> GetPlanBenefitPackageSearchByText(string pbpName, long? lOBSK, long? bnftPlanTypeSK, string tenantFamName, string tenantName
            , string acctName, string grpName, string popGrpName, DateTime? efctvStartDt, DateTime? efctvEndDt);

        /// <summary>
        /// spBenefitDefinitionSearch
        /// </summary>
        /// <param name="bnftName">the bnft name</param>
        /// <param name="bnftCode">the bnft Code</param>
        /// <param name="svcTypeSK">the svcTypeSK</param>
        /// <param name="efctvStartDt">effective start date</param>
        /// <param name="efctvEndDt">effective end date</param>
        /// <returns>list of PBPs</returns>
        IQueryable<spBenefitDefinitionSearch_Result> BenefitDefinitionSearch(string bnftName = null, string bnftCode = null, long? svcTypeSK = null, DateTime? efctvStartDt = null, DateTime? efctvEndDt = null);

        /// <summary>
        ///  BenefitPlan Search EndPoint
        /// </summary>
        /// <param name = "bnftPlanSK">benefit plan ID</ param >
        /// < param name="lOBSK">line of business id</param>
        /// <param name = "pBPSK" >Plan benefit package Id</ param >
        /// < param name="bnftPlanTypeSK">benefit plan type Id</param>
        /// <param name = "tmpltInd" >template indicator</ param >
        /// < param name="efctvStartDt">effective start date</param>
        /// <param name = "efctvEndDt" >effective end date</ param >
        /// <returns>list of Benefit plans</returns>
        IQueryable<spBenefitPlanSearch_Result> GetBenefitPlanSearch(long? bnftPlanSK, long? LOBSK, long? pBPSK, long? bnftPlanTypeSK, Boolean? tmpltInd, DateTime? efctvStartDt, DateTime? efctvEndDt);

        /// <summary>
        ///  BenefitPlan Search By Text EndPoint
        /// </summary>
        /// <param name="bnftPlanName">benefit plan name</ param >
        /// <param name="lOBSK">line of business id</param>
        /// <param name="pBPSK" >Plan benefit package Id</ param >
        /// <param name="bnftPlanTypeSK">benefit plan type Id</param>
        /// <param name="tmpltInd" >template indicator</ param >
        /// <param name="efctvStartDt">effective start date</param>
        /// <param name="efctvEndDt" >effective end date</ param >
        /// <returns>list of Benefit plans</returns>
        IQueryable<spBenefitPlanSearchByText_Result> GetBenefitPlanSearchByText(string bnftPlanName, long? LOBSK, long? pBPSK, long? bnftPlanTypeSK, bool? tmpltInd, DateTime? efctvStartDt, DateTime? efctvEndDt);

        /// <summary>
        /// Executes the spTenantTenantIndustryIdentifier stored procedure
        /// </summary>
        /// <param name="tenantSK">the Tenant ID</param>
        /// <returns>List of Tenant Hierarchy Search Results</returns>
        IQueryable<spTenantTenantIndustryIdentifier_Result> GetTenantIndustryIdentifier(long tenantSK);

        /// <summary>
        /// get the service areas by svcareaSK
        /// </summary>
        /// <param name="svcAreaSK"></param>
        /// <returns>spSvcAreaHierarchyGetBySvcAreaSK_Results</returns>
        IQueryable<spSvcAreaHierarchyGetBySvcAreaSK_Result> GetSvcAreaHierarchyGetBySvcAreaSK(long svcAreaSK);

        /// <summary>
        /// Copy the benefit plan
        /// </summary>
        /// <param name="bnftPlanSKToCopy">the benefti plan to copy</param>
        /// <param name="currentUser">the current user</param>
        /// <returns>new benefit plan id</returns>
        long? CopyBenefitPlan(long bnftPlanSKToCopy, string currentUser);

        /// <summary>
        /// Delete one network tier
        /// </summary>
        /// <param name="ntwrkTierSK"></param>
        /// <param name="currentUser"></param>
        /// <returns>NtwrkTierSK delete</returns>
        int DeleteNetworkTier(long? ntwrkTierSK, string currentUser);

        /// <summary>
        /// Delete one formulary tier
        /// </summary>
        /// <param name="frmlryTierSK"></param>
        /// <param name="currentUser"></param>
        /// <returns>frmlryTierSK delete</returns>
        int DeleteFormularyTier(long? frmlryTierSK, string currentUser);

        /// <summary>
        /// Execute Benefit Plan to MCS 
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan Key</param>
        /// <param name="popGrpPBPSK">the Population Group PBP Key</param>
        /// <returns>XML Code</returns>
        string ExportBenefitPlanToMCS(long? bnftPlanSK, long? popGrpPBPSK);

        /// <summary>
        /// Execute Benefit Plan to Merlin 
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan Key</param>
        /// <param name="planPgmCode">the Plan Program Code</param>
        /// <returns>XML Code</returns>
        string ExportBenefitPlanToMerlin(long? bnftPlanSK, string planPgmCode);

        /// <summary>
        /// Execute Benefit to MCS 
        /// </summary>
        /// <param name="status">the Status</param>
        /// <returns>XML Code</returns>
        string ExportBenefitToMCS(string status);

        /// <summary>
        /// Executes the spGetPopulationGroupPBPList stored procedure
        /// </summary>
        /// <param name="popGrpSK">the Population Group ID</param>
        /// <returns>List of Population Group PBP List</returns>
        IQueryable<spGetPopulationGroupPBPList_Result> GetPopulationGroupPBPList(long popGrpSK);

        /// <summary>
        /// Executes the spViewExistingBenefitsWithRules stored procedure
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan SK</param>
        /// <returns>List of Existing Benefits With Rules</returns>
        IQueryable<spViewExistingBenefitsWithRules_Result> ViewExistingBenefitsWithRules(long bnftPlanSK);
    }
}
