using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.Models.Enums;
using Atlas.BenefitPlan.DAL.ViewModels;
using System.Collections.Generic;

namespace Atlas.BenefitPlan.BLL.Interfaces
{
    /// <summary>
    /// The Interface for Entity Address BLL for Benefit Plan
    /// </summary>
    public interface IEntityAddressBLL
    {
        /// <summary>
        /// Get all Entity Address records for a Hierarchy Type
        /// </summary>
        /// <param name="entityType">The Entity Type</param>
        /// <param name="entityId">The entity identifier.</param>
        /// <returns>List of Entity Address View Models</returns>
        IEnumerable<EntityAddressVM> GetAllEntityAddress(EntityAddressType entityType, long entityId);

        /// <summary>
        /// Get the Copy Demographic From List for an Entity
        /// </summary>
        /// <param name="entityType">the Entity Type</param>
        /// <param name="entityId">the Entity SK</param>
        /// <returns>List of current address for each parent entity</returns>
        List<DropDownList> GetCopyDemographicFromList(EntityAddressType entityType, long entityId);

        /// <summary>
        /// Get the Current Entity Address record for a Hierarchy Type By Entity Type ID
        /// </summary>
        /// <param name="entityType">The Entity Type</param>
        /// <param name="entityId">The entity identifier.</param>
        /// <returns>Entity Address View Model Record</returns>
        EntityAddressVM GetCurrentEntityAddress(EntityAddressType entityType, long entityId);

        /// <summary>
        /// Get a Specific Entity Address record for a Hierarchy Type By Entity Type ID
        /// </summary>
        /// <param name="entityType">The Entity Type</param>
        /// <param name="entityId">The entity identifier.</param>
        /// <param name="entityTypeAddressId">the Entity Type Address ID</param>
        /// <returns>Entity Address View Model Record</returns>
        EntityAddressVM GetEntityAddress(EntityAddressType entityType, long entityId, long entityTypeAddressId);

        /// <summary>
        /// Set the Entity Address
        /// </summary>
        /// <param name="itemToAddOrUpdate">the Entity Address View Model to Update</param>
        /// <returns>EntityAddressVM.</returns>
        EntityAddressVM SetEntityAddress(EntityAddressVM itemToAddOrUpdate);

        /// <summary>
        /// Validate Entity Address
        /// </summary>
        /// <param name="itemToValidate">the Entity Address View Model to Update</param>
        /// <returns>List of Error Messages</returns>
        List<Message> ValidateEntityAddress(EntityAddressVM itemToValidate);
    }
}