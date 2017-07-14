using Atlas.BenefitPlan.DAL.Models.Enums;
using Atlas.BenefitPlan.DAL.ViewModels;
using System.Collections.Generic;

namespace Atlas.BenefitPlan.BLL.Interfaces
{
    /// <summary>
    /// Interface IEntityContactBLL
    /// </summary>
    public interface IEntityContactBLL
    {
        /// <summary>
        /// Get Entity Contact
        /// </summary>
        /// <param name="entityType">Type of the entity.</param>
        /// <param name="entityId">The entity identifier.</param>
        /// <param name="isActive">if set to <c>true</c> [is active].</param>
        /// <returns>IEnumerable&lt;EntityContactsVM&gt;.</returns>
        IEnumerable<EntityContactsVM> GetAllEntityContacts(TenantFamilyHierarchy entityType, long entityId, bool isActive);

        /// <summary>
        /// Adds or Updates the Entity Contact
        /// </summary>
        /// <param name="itemToAddOrUpdate">The item to add or update.</param>
        /// <returns>EntityContactsVM.</returns>
        EntityContactsVM AddOrUpdateEntityContact(EntityContactsVM itemToAddOrUpdate);
    }
}