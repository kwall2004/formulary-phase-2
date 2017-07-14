using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.BenefitPlan.DAL.Models.Enums;
using Atlas.BenefitPlan.DAL.ViewModels;
using System.Collections.Generic;

namespace Atlas.BenefitPlan.BLL.Interfaces
{
    /// <summary>
    /// The Interface for Plan Benefit Package Service Area BLL for Benefit Plan
    /// </summary>
    public interface IPlanBenefitPackageServiceAreaBLL
    {
        /// <summary>
        /// Get a Plan Benefit Package Service Areas
        /// </summary>
        /// <param name="pbpSk">the Plan Benefit Package ID</param>
        /// <returns>List of Service Area View Models</returns>
        List<ServiceAreaGetVM> GetPlanBenefitPackageServiceAreas(long pbpSk);

        /// <summary>
        /// Get the Service Area Lookup Class for a Service area and ID
        /// </summary>
        /// <param name="hierarchyType">the Service Area Hierarchy Type</param>
        /// <param name="svcAreaSK">the Service Area SK</param>
        /// <param name="lookupSK">the Lookup SK (Country = 0)</param>
        /// <returns>the Service Area Lookup object</returns>
        ServiceAreaLookup GetServiceAreaLookup(ServiceAreaAddressHierarchy hierarchyType, long svcAreaSK, long lookupSK = 0);

        /// <summary>
        /// Add or Update a Service Area Configuration for a Plan Benefit Package
        /// </summary>
        /// <param name="itemToAddOrUpdate">the Service Area Configuration to Add or Update</param>
        /// <returns>ServiceAreaUpdateVM.</returns>
        ServiceAreaUpdateVM SetServiceAreaConfiguration(ServiceAreaUpdateVM itemToAddOrUpdate);

        /// <summary>
        /// Get Service Area hierarchy by SvcAreaSK
        /// </summary>
        /// <param name="svcAreaSK">the id of the package</param>
        /// <returns>a Hierarchy Tree Node with all children for the family</returns>
        List<HierarchyTreeNode> GetServiceAreaForSvcAreaSK(long svcAreaSK);
    }
}