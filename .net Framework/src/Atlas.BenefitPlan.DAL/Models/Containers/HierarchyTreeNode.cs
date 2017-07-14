using Atlas.BenefitPlan.DAL.Models.Enums;
using System;
using System.Collections.Generic;

namespace Atlas.BenefitPlan.DAL.Models.Containers
{
    /// <summary>
    /// Class HierarchyTreeNode.
    /// </summary>
    public class HierarchyTreeNode
    {
        /// <summary>
        /// Gets or sets the type of the entity.
        /// </summary>
        /// <value>The type of the entity.</value>
        public TenantFamilyHierarchy EntityType { get; set; }
        /// <summary>
        /// Gets or sets the entity sk.
        /// </summary>
        /// <value>The entity sk.</value>
        public long EntitySK { get; set; }
        /// <summary>
        /// Gets or sets the entity description.
        /// </summary>
        /// <value>The entity description.</value>
        public string EntityDescription { get; set; }
        /// <summary>
        /// Gets or sets the children nodes.
        /// </summary>
        /// <value>The children nodes.</value>
        public IList<HierarchyTreeNode> ChildrenNodes { get; set; }
        /// <summary>
        /// Gets or sets the active.
        /// </summary>
        /// <value>The active.</value>
        public Boolean Active { get; set; }
    }
}