using Atlas.BenefitPlan.DAL.Models.Containers;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Tenant Hierarchy View Model
    /// </summary>
    public class TenantHierarchyVM
    {
        /// <summary>
        /// the Tenant ID
        /// </summary>
        public long TenantFamilySK { get; set; }

        public HierarchyTreeNode HierarchyTreeNode { get; set; }
    }
}