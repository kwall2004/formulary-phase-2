using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Repositories.Interfaces;
using Atlas.Configuration;
using Atlas.Core.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Atlas.BenefitPlan.DAL.Repositories
{
    /// <summary>
    /// the Stored Procedure Repository in Benefit Plan
    /// </summary>
    public class AtlasBenefitPlanStoredProcsRepository : EFRepositoryBase<object, BenefitPlanEntities>, IAtlasBenefitPlanStoredProcsRepository
    {
        /// 

        /// <summary>
        /// the Constructor for All Benefit Plan Stored Procedure Repository
        /// </summary>
        /// <param name="db">the Benefit Plan Entity Framework</param>
        public AtlasBenefitPlanStoredProcsRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
        {
        }

        /// <summary>
        /// Get all workflows
        /// </summary>
        /// <param name="statusType"></param>
        /// <param name="startDate"></param>
        /// <param name="endDate"></param>
        /// <returns>execution return code</returns>
        public List<spPopGrpBnftPkgWorkflow_Result> GetPopGrpBnftPkgWorkflows(long statusType, DateTime startDate, DateTime endDate)
        {
            return _db.spPopGrpBnftPkgWorkflow(statusType, startDate, endDate).ToList();
        }

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
        public int CopaySetupCopy(int? bnftPlanSK, int? copyFromPharmTypeSK, string copyToPharmTypes, int? copyFromNtwrkTierSK, int? copyToNtwrkTierSK, Boolean? overwriteDuplicates, string username)
        {
            return _db.spCopaySetupCopy(bnftPlanSK,copyFromPharmTypeSK,copyToPharmTypes,copyFromNtwrkTierSK,copyToNtwrkTierSK,overwriteDuplicates,username).FirstOrDefault() ?? 0;
        }

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
        public int LICSSetupCopy(int? bnftPlanSK, int? copyFromLICSTypeSK, string copyToLICSTypes, int? copyFromPharmTypeSK, string copyToPharmTypes, Boolean? overwriteDuplicates, string username)
        {
            return _db.spLICSSetupCopy(bnftPlanSK, copyFromLICSTypeSK, copyToLICSTypes, copyFromPharmTypeSK, copyToPharmTypes, overwriteDuplicates, username).FirstOrDefault() ?? 0;
        }

        /// <summary>
        /// Execute the Benefit Definition Copy Stored Procedure
        /// </summary>
        /// <param name="origBnftSK">the Copy From Benefit SK</param>
        /// <param name="username">the Current Username</param>
        /// <returns>execution return code</returns>
        public long BenefitCopyDefinition(long origBnftSK, string username)
        {
            return _db.spBenefitCopyDefinition(origBnftSK, username).FirstOrDefault() ?? 0;
        }

        /// <summary>
        /// Execute the Group Contents Copy Stored Procedure
        /// </summary>
        /// <param name="jsonString">the JSON String</param>
        /// <returns>execution return code</returns>
        public int GroupCopyContents(string jsonString)
        {
            return _db.spGroupCopyContents(jsonString);
        }

        /// <summary>
        /// Executes the spAccountTenantIndustryIdentifier stored procedure
        /// </summary>
        /// <param name="acctSK">the Account ID</param>
        /// <returns>List of Tenant Hierarchy Search Results</returns>
        public IQueryable<spAccountTenantIndustryIdentifier_Result> GetAccountTenantIndustryIdentifier(long acctSK)
        {
            return _db.spAccountTenantIndustryIdentifier(acctSK).AsQueryable();
        }

        /// <summary>
        /// Executes the spTenantHierarchySearch stored procedure
        /// </summary>
        /// <param name="SearchText">the Search Text for spTenantHierarchySearch</param>
        /// <returns>List of Tenant Hierarchy Search Results</returns>
        public IQueryable<TenantHierarchySearch_Result> GetTenantHierarchySearch(string SearchText)
        {
            return _db.spTenantHierarchySearch(SearchText).AsQueryable();
        }

        /// <summary>
        /// Executes the spTenantHierarchyAdvancedSearch stored procedure
        /// </summary>
        /// <param name="SearchField">the Search Field for spTenantHierarchyAdvancedSearch</param>
        /// <param name="SearchText">the Search Text for spTenantHierarchyAdvancedSearch</param>
        /// <returns>List of Tenant Hierarchy Search Results</returns>
        public IQueryable<TenantHierarchySearch_Result> GetTenantHierarchyAdvancedSearch(string SearchField, string SearchText)
        {
            return _db.spTenantHierarchyAdvancedSearch(SearchField, SearchText).AsQueryable();
        }

        /// <summary>
        /// Executes the spTenantTenantIndustryIdentifier stored procedure
        /// </summary>
        /// <param name="tenantSK">the Tenant ID</param>
        /// <returns>List of Tenant Hierarchy Search Results</returns>
        public IQueryable<spTenantTenantIndustryIdentifier_Result> GetTenantIndustryIdentifier(long tenantSK)
        {
            return _db.spTenantTenantIndustryIdentifier(tenantSK).AsQueryable();
        }

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
        /// <returns>List of PBPs</returns>
        public IQueryable<spPlanBenefitPackageSearch_Result> GetPlanBenefitPackageSearch(long? pBPSK = null, long? lOBSK = null, long? bnftPlanTypeSK = null, string tenantFamName = null, string tenantName = null
            , string acctName = null, string grpName = null, string popGrpName = null
            , DateTime? efctvStartDt = null, DateTime? efctvEndDt = null)
        {
            //DateTimeOffset? efctvStartDtTO = null;
            //if (efctvStartDt != null)
            //{
            //    efctvStartDtTO = new DateTimeOffset(efctvStartDt.Value);
            //}

            //DateTimeOffset? efctvEndDtTO = null;
            //if (efctvEndDt != null)
            //{
            //    efctvEndDtTO = new DateTimeOffset(efctvEndDt.Value);
            //}

            return _db.spPlanBenefitPackageSearch(pBPSK, lOBSK, bnftPlanTypeSK, tenantFamName, tenantName, acctName, grpName, popGrpName, efctvStartDt, efctvEndDt).AsQueryable();
        }

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
        public IQueryable<spPlanBenefitPackageSearchByText_Result> GetPlanBenefitPackageSearchByText(string pbpName, long? lOBSK = null, long? bnftPlanTypeSK = null, string tenantFamName = null, string tenantName = null
            , string acctName = null, string grpName = null, string popGrpName = null
            , DateTime? efctvStartDt = null, DateTime? efctvEndDt = null)
        {
            return _db.spPlanBenefitPackageSearchByText(pbpName, lOBSK, bnftPlanTypeSK, tenantFamName, tenantName, acctName, grpName, popGrpName, efctvStartDt, efctvEndDt).AsQueryable();
        }

        /// <summary>
        /// spBenefitDefinitionSearch
        /// </summary>
        /// <param name="bnftName">the bnft name</param>
        /// <param name="bnftCode">the bnft Code</param>
        /// <param name="svcTypeSK">the svcTypeSK</param>
        /// <param name="efctvStartDt">effective start date</param>
        /// <param name="efctvEndDt">effective end date</param>
        /// <returns>list of PBPs</returns>
        public IQueryable<spBenefitDefinitionSearch_Result> BenefitDefinitionSearch(string bnftName = null, string bnftCode = null, long? svcTypeSK = null, DateTime? efctvStartDt = null, DateTime? efctvEndDt = null)
        {
            DateTimeOffset? efctvStartDtTO = null;
            if (efctvStartDt != null)
            {
                efctvStartDtTO = new DateTimeOffset(efctvStartDt.Value);
            }

            DateTimeOffset? efctvEndDtTO = null;
            if (efctvEndDt != null)
            {
                efctvEndDtTO = new DateTimeOffset(efctvEndDt.Value);
            }

            return _db.spBenefitDefinitionSearch(bnftName, bnftCode, svcTypeSK, efctvStartDtTO, efctvEndDtTO).AsQueryable();
        }

        /// <summary>
        ///  BenefitPlan Search EndPoint
        ///  
        /// </summary>
        /// <param name = "bnftPlanSK">benefit plan ID</ param >
        /// < param name="lOBSK">line of business id</param>
        /// <param name = "pBPSK" >Plan benefit package Id</ param >
        /// < param name="bnftPlanTypeSK">benefit plan type Id</param>
        /// <param name = "tmpltInd" >template indicator</ param >
        /// < param name="efctvStartDt">effective start date</param>
        /// <param name = "efctvEndDt" >effective end date</ param >
        /// <returns>list of Benefit plans</returns>
        public IQueryable<spBenefitPlanSearch_Result> GetBenefitPlanSearch(long? bnftPlanSK, long? lOBSK, long? pBPSK, long? bnftPlanTypeSK, Boolean? tmpltInd, DateTime? efctvStartDt, DateTime? efctvEndDt)
        {
            //DateTimeOffset? efctvStartDtTO = null;
            //if (efctvStartDt != null)
            //{
            //    efctvStartDtTO = new DateTimeOffset(efctvStartDt.Value);
            //}

            //DateTimeOffset? efctvEndDtTO = null;
            //if (efctvEndDt != null)
            //{
            //    efctvEndDtTO = new DateTimeOffset(efctvEndDt.Value);
            //}

            return _db.spBenefitPlanSearch(bnftPlanSK, lOBSK, pBPSK, bnftPlanTypeSK, tmpltInd, efctvStartDt, efctvEndDt).AsQueryable();
        }

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
        public IQueryable<spBenefitPlanSearchByText_Result> GetBenefitPlanSearchByText(string bnftPlanName, long? lOBSK, long? pBPSK, long? bnftPlanTypeSK, bool? tmpltInd, DateTime? efctvStartDt, DateTime? efctvEndDt)
        {
            return _db.spBenefitPlanSearchByText(bnftPlanName, lOBSK, pBPSK, bnftPlanTypeSK, tmpltInd, efctvStartDt, efctvEndDt).AsQueryable();
        }

        /// <summary>
        /// get the service areas by svcareaSK
        /// </summary>
        /// <param name="svcAreaSK"></param>
        /// <returns>spSvcAreaHierarchyGetBySvcAreaSK_Results</returns>
        public IQueryable<spSvcAreaHierarchyGetBySvcAreaSK_Result> GetSvcAreaHierarchyGetBySvcAreaSK(long svcAreaSK)
        {
            return _db.spSvcAreaHierarchyGetBySvcAreaSK(svcAreaSK).AsQueryable();
        }

        /// <summary>
        /// Copy the benefit plan
        /// </summary>
        /// <param name="bnftPlanSKToCopy">the benefti plan to copy</param>
        /// <param name="currentUser">the current user</param>
        /// <returns>new benefit plan id</returns>
        public long? CopyBenefitPlan(long bnftPlanSKToCopy, string currentUser)
        {
            return _db.spBenefitPlanDeepCopy(bnftPlanSKToCopy, currentUser).FirstOrDefault();
        }

        /// <summary>
        /// Delete one network tier
        /// </summary>
        /// <param name="ntwrkTierSK"></param>
        /// <param name="currentUser"></param>
        /// <returns>NtwrkTierSK delete</returns>
        public int DeleteNetworkTier(long? ntwrkTierSK,string currentUser)
        {
            return _db.spNetworkTierDelete(ntwrkTierSK, currentUser);
        }

        /// <summary>
        /// Delete one formulary tier
        /// </summary>
        /// <param name="frmlryTierSK"></param>
        /// <param name="currentUser"></param>
        /// <returns>frmlryTierSK delete</returns>
        public int DeleteFormularyTier(long? frmlryTierSK, string currentUser)
        {
            return _db.spFormularyTierDelete(frmlryTierSK, currentUser);
        }

        /// <summary>
        /// Execute Benefit Plan to MCS 
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan Key</param>
        /// <param name="popGrpPBPSK">the Population Group PBP Key</param>
        /// <returns>XML Code</returns>
        public string ExportBenefitPlanToMCS(long? bnftPlanSK, long? popGrpPBPSK)
        {
            StringBuilder result = new StringBuilder();
            foreach (string item in _db.spIntegrate_MCS_XMLFile(bnftPlanSK, popGrpPBPSK))
            {
                result.Append(item);
            }

            return result.ToString();
        }
        
        /// <summary>
        /// Execute Benefit Plan to Merlin 
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan Key</param>
        /// <param name="planPgmCode">the Plan Program Code</param>
        /// <returns>XML Code</returns>
        public string ExportBenefitPlanToMerlin(long? bnftPlanSK, string planPgmCode)
        {
            StringBuilder result = new StringBuilder();
            foreach (string item in _db.spIntegrate_Merlin_XMLFile(bnftPlanSK, planPgmCode))
            {
                result.Append(item);
            }

            return result.ToString();
        }

        /// <summary>
        /// Execute Benefit to MCS 
        /// </summary>
        /// <param name="status">the Status</param>
        /// <returns>XML Code</returns>
        public string ExportBenefitToMCS(string status)
        {
            StringBuilder result = new StringBuilder();
            foreach (string item in _db.spIntegrate_MCS_Create_Benefit_XML(status))
            {
                result.Append(item);
            }

            return result.ToString();
        }

        /// <summary>
        /// Executes the spGetPopulationGroupPBPList stored procedure
        /// </summary>
        /// <param name="popGrpSK">the Population Group ID</param>
        /// <returns>List of Population Group PBP List</returns>
        public IQueryable<spGetPopulationGroupPBPList_Result> GetPopulationGroupPBPList(long popGrpSK)
        {
            return _db.spGetPopulationGroupPBPList(popGrpSK).AsQueryable();
        }

        /// <summary>
        /// Executes the spViewExistingBenefitsWithRules stored procedure
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan SK</param>
        /// <returns>List of Existing Benefits With Rules</returns>
        public IQueryable<spViewExistingBenefitsWithRules_Result> ViewExistingBenefitsWithRules(long bnftPlanSK)
        {
            return _db.spViewExistingBenefitsWithRules(bnftPlanSK).AsQueryable();
        }
    }
}
