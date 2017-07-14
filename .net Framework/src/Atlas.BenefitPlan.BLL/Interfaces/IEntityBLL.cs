using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.Models.Enums;
using Atlas.BenefitPlan.DAL.ViewModels;
using System.Collections.Generic;
using System.Linq;

namespace Atlas.BenefitPlan.BLL.Interfaces
{
    /// <summary>
    /// Get the entity hierarchy by TenantFamilyId
    /// </summary>
    /// <param name="tenantFamSK">the id for the root tenant family</param>
    /// <returns>a Hierarchy Tree Node with all children for the family</returns>
    public interface IEntityBLL
    {
        #region Tenant Hierarchy #

        /// <summary>
        /// Get the entity hierarchy by TenantFamilyId
        /// </summary>
        /// <param name="tenantFamSK">the id for the root tenant family</param>
        /// <returns>a Hierarchy Tree Node with all children for the family</returns>
        HierarchyTreeNode GetTenantHierarchyForTenantFamily(long tenantFamSK);

        /// <summary>
        /// Get all entity hierarchy by PBPSK or BPSK
        /// </summary>
        /// <param name="rootSK">the id of the package</param>
        /// <param name="forBenefitPlan">is it for benefit plan or PBP</param>
        /// <returns>a Hierarchy Tree Node with all children for the family</returns>
        List<HierarchyTreeNode> GetTenantHierarchyForBPOrPBPSK(long rootSK, bool forBenefitPlan);

        /// <summary>
        /// Get Hierarchy Detail Information for an Entity
        /// </summary>
        /// <param name="entityHierarchyType">the Entity Type</param>
        /// <param name="entitySK">the Entity Key</param>
        /// <returns>a Hierarchy Node Detail</returns>
        HierarchyNodeDetail GetHierarchyDetailInformation(TenantFamilyHierarchy entityHierarchyType, long entitySK);

        #endregion Tenant Hierarchy #

        #region " Tenant Family #

        /// <summary>
        /// Get Tenant Family View Model by Tenant Family ID
        /// </summary>
        /// <param name="tenantFamSK">the Tenant Family ID</param>
        /// <returns>Tenant Family View Model</returns>
        TenantFamilyVM GetTenantFamily(long tenantFamSK);

        /// <summary>
        /// Add or Update a Tenant Family
        /// </summary>
        /// <param name="itemToAddOrUpdate">the Tenant Family Entry to Add or Update</param>
        /// <returns>TenantFamilyVM.</returns>
        TenantFamilyVM SetTenantFamily(TenantFamilyVM itemToAddOrUpdate);

        /// <summary>
        /// Validate a Tenant Family Name
        /// </summary>
        /// <param name="itemToValidate">the Tenant Family Entry to Validate</param>
        /// <returns>List&lt;Message&gt;.</returns>
        List<Message> ValidateTenantFamily(TenantFamilyVM itemToValidate);

        #endregion " Tenant Family #

        #region " Tenant #

        /// <summary>
        /// Get Tenant View Model by Tenant ID
        /// </summary>
        /// <param name="tenantSK">the Tenant ID</param>
        /// <returns>Tenant View Model</returns>
        TenantVM GetTenant(long tenantSK);

        /// <summary>
        /// Add or Update a Tenant
        /// </summary>
        /// <param name="itemToAddOrUpdate">the Tenant Entry to Add or Update</param>
        /// <returns>TenantVM.</returns>
        TenantVM SetTenant(TenantVM itemToAddOrUpdate);

        /// <summary>
        /// Validate a Tenant Name
        /// </summary>
        /// <param name="itemToValidate">the Tenant Entry to Validate</param>
        /// <returns>List&lt;Message&gt;.</returns>
        List<Message> ValidateTenant(TenantVM itemToValidate);

        #endregion " Tenant #

        #region " Account #

        /// <summary>
        /// Get Account View Model by Account ID
        /// </summary>
        /// <param name="acctSK">the Account ID</param>
        /// <returns>Account View Model</returns>
        AccountVM GetAccount(long acctSK);

        /// <summary>
        /// Gets the accounts by tenant fam sk.
        /// </summary>
        /// <param name="tenantFamSK">The tenant fam sk.</param>
        /// <returns>List&lt;Acct&gt;.</returns>
        List<Acct> GetAccountsByTenantFamSK(long tenantFamSK);

        /// <summary>
        /// Gets all of the Account PCN for a Account ID
        /// </summary>
        /// <param name="acctSK">the AcctID</param>
        /// <returns>an IQuerable of all the Account PCNs</returns>
        IQueryable<AcctPCN> GetAccountIndustryIdentifierPCN(long acctSK);

        /// <summary>
        /// Gets the account industry identifier rxbin.
        /// </summary>
        /// <param name="acctSK">The acct sk.</param>
        /// <returns>IQueryable&lt;AcctRXBIN&gt;.</returns>
        IQueryable<AcctRXBIN> GetAccountIndustryIdentifierRXBIN(long acctSK);

        /// <summary>
        /// Gets the account industry identifier payer identifier.
        /// </summary>
        /// <param name="acctSK">The acct sk.</param>
        /// <returns>IQueryable&lt;AcctPayerID&gt;.</returns>
        IQueryable<AcctPayerID> GetAccountIndustryIdentifierPayerID(long acctSK);

        /// <summary>
        /// Add or Update a Account
        /// </summary>
        /// <param name="itemToAddOrUpdate">the Account Entry to Add or Update</param>
        /// <returns>AccountVM.</returns>
        AccountVM SetAccount(AccountVM itemToAddOrUpdate);

        /// <summary>
        /// Validate a Account Name
        /// </summary>
        /// <param name="itemToValidate">the Account Entry to Validate</param>
        /// <returns>List&lt;Message&gt;.</returns>
        List<Message> ValidateAccount(AccountVM itemToValidate);

        #endregion " Account #

        #region " Group #

        /// <summary>
        /// Get Group View Model by Group ID
        /// </summary>
        /// <param name="grpSK">the Group ID</param>
        /// <returns>Group View Model</returns>
        GroupVM GetGroup(long grpSK);

        /// <summary>
        /// Get Group View Models by AcctSK
        /// </summary>
        /// <param name="acctSK">the account ID</param>
        /// <returns>List of Group View Model</returns>
        List<GroupVM> GetGroupsByAcctSK(long acctSK);

        /// <summary>
        /// Add or Update a Group
        /// </summary>
        /// <param name="itemToAddOrUpdate">the Group Entry to Add or Update</param>
        /// <returns>GroupVM.</returns>
        GroupVM SetGroup(GroupVM itemToAddOrUpdate);

        /// <summary>
        /// Validate a Group Name
        /// </summary>
        /// <param name="itemToValidate">the Group Entry to Validate</param>
        /// <returns>List&lt;Message&gt;.</returns>
        List<Message> ValidateGroup(GroupVM itemToValidate);

        #endregion " Group #

        #region " Population Group #

        /// <summary>
        /// Get Population Group View Model by Population Group ID
        /// </summary>
        /// <param name="popGrpSK">the Population Group ID</param>
        /// <returns>Population Group View Model</returns>
        PopulationGroupVM GetPopulationGroup(long popGrpSK);

        /// <summary>
        /// Get population Group View Models by GrpSK
        /// </summary>
        /// <param name="grpSK">the group ID</param>
        /// <returns>List of PopulationGroup View Model</returns>
        List<PopulationGroupVM> GetPopulationGroupsByGrpSK(long grpSK);

        /// <summary>
        /// Add or Update a Population Group
        /// </summary>
        /// <param name="itemToAddOrUpdate">the Population Group Entry to Add or Update</param>
        /// <returns>PopulationGroupVM.</returns>
        PopulationGroupVM SetPopulationGroup(PopulationGroupVM itemToAddOrUpdate);

        /// <summary>
        /// Validate a Population Group Name
        /// </summary>
        /// <param name="itemToValidate">the Population Group Entry to Validate</param>
        /// <returns>List&lt;Message&gt;.</returns>
        List<Message> ValidatePopulationGroup(PopulationGroupVM itemToValidate);

        #endregion " Population Group #
    }
}