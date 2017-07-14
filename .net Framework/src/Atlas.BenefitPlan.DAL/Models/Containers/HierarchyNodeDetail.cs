using Atlas.BenefitPlan.DAL.Models.Enums;

namespace Atlas.BenefitPlan.DAL.Models.Containers
{
    /// <summary>
    /// Class HierarchyNodeDetail.
    /// </summary>
    public class HierarchyNodeDetail
    {
        /// <summary>
        /// The Tenant Family Hierarcy Type for Tenanat Family
        /// </summary>
        public TenantFamilyHierarchy TenantFamHierarchyType { get; }

        /// <summary>
        /// Tenant Family ID
        /// </summary>
        /// <value>The tenant fam sk.</value>
        public long TenantFamSK { get; set; }

        /// <summary>
        /// Tenant Family Name
        /// </summary>
        /// <value>The name of the tenant fam.</value>
        public string TenantFamName { get; set; }

        /// <summary>
        /// The Tenant Family Hierarcy Type for Tenanat
        /// </summary>
        public TenantFamilyHierarchy TenantHierarchyType { get; }

        /// <summary>
        /// Tenant ID
        /// </summary>
        /// <value>The tenant sk.</value>
        public long TenantSK { get; set; }

        /// <summary>
        /// Tenant Name
        /// </summary>
        /// <value>The name of the tenant.</value>
        public string TenantName { get; set; }

        /// <summary>
        /// The Tenant Family Hierarcy Type for Account
        /// </summary>
        public TenantFamilyHierarchy AcctHierarchyType { get; }

        /// <summary>
        /// Account ID
        /// </summary>
        /// <value>The acct sk.</value>
        public long AcctSK { get; set; }

        /// <summary>
        /// Account Name
        /// </summary>
        /// <value>The name of the acct.</value>
        public string AcctName { get; set; }

        /// <summary>
        /// The Tenant Family Hierarcy Type for Group
        /// </summary>
        public TenantFamilyHierarchy GrpHierarchyType { get; }

        /// <summary>
        /// Group ID
        /// </summary>
        /// <value>The GRP sk.</value>
        public long GrpSK { get; set; }

        /// <summary>
        /// Group Name
        /// </summary>
        /// <value>The name of the GRP.</value>
        public string GrpName { get; set; }

        /// <summary>
        /// The Tenant Family Hierarcy Type for PopulationGroup
        /// </summary>
        public TenantFamilyHierarchy PopGrpHierarchyType { get; }

        /// <summary>
        /// Population Group ID
        /// </summary>
        /// <value>The pop GRP sk.</value>
        public long PopGrpSK { get; set; }

        /// <summary>
        /// Population Group Name
        /// </summary>
        /// <value>The name of the pop GRP.</value>
        public string PopGrpName { get; set; }

        /// <summary>
        /// The Constructor - Default the Hierarchy Types
        /// </summary>
        public HierarchyNodeDetail()
        {
            this.TenantFamHierarchyType = TenantFamilyHierarchy.TenantFamily;
            this.TenantHierarchyType = TenantFamilyHierarchy.Tenant;
            this.AcctHierarchyType = TenantFamilyHierarchy.Account;
            this.GrpHierarchyType = TenantFamilyHierarchy.Group;
            this.PopGrpHierarchyType = TenantFamilyHierarchy.PopulationGroup;
        }
    }
}