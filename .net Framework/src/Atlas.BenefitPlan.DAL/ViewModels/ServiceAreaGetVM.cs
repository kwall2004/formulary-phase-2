using Atlas.BenefitPlan.DAL.Models.Containers;
using System.Collections.Generic;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Benefit Plan View Model for Service Area Get
    /// </summary>
    public class ServiceAreaGetVM : ServiceAreaVM
    {
        /// <summary>The Service Area County Lookup</summary>
        public ServiceAreaLookup CountryLookup { get; set; }

        /// <summary>The Service Area Hierarchy</summary>
        public List<HierarchyTreeNode> ServiceAreaHierarchy { get; set; }
    }
}