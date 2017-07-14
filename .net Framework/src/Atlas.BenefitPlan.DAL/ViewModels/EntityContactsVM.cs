using Atlas.BenefitPlan.DAL.Infrastructure.Attributes;
using Atlas.BenefitPlan.DAL.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Entity Contacts View Model
    /// </summary>
    public class EntityContactsVM : BaseViewModel
    {
        /// <summary>
        /// The Entity Type for the Tenant Family Hierarchy
        /// </summary>
        public TenantFamilyHierarchy EntityType { get; set; }

        /// <summary>
        /// The Entity Type for the Tenant Family Hierarchy</summary>
        [Range(1, double.MaxValue, ErrorMessage = "EntityTypeSK field is required.")]
        public long EntityTypeSK { get; set; }

        /// <summary>
        /// The Entity Contact Id
        /// </summary>
        public long EntityTypeContactSK { get; set; }

        /// <summary>
        /// The EntityContactsVM ContactId
        /// </summary>
        public long CntctSK { get; set; }

        /// <summary>
        /// The EntityContactsVM First Name
        /// </summary>
        [Required(AllowEmptyStrings = false, ErrorMessage = "First Name is required.")]
        [MaxLength(50)]
        public string FirstName { get; set; }

        /// <summary>
        /// The EntityContactsVM Last Name
        /// </summary>
        [Required(AllowEmptyStrings = false, ErrorMessage = "Last Name is required.")]
        [MaxLength(50)]
        public string LastName { get; set; }

        /// <summary>
        /// The EntityContactsVM Company
        /// </summary>
        [MaxLength(50)]
        public string Company { get; set; }

        /// <summary>
        /// The EntityContactsVM Responsibility type Description
        /// </summary>
        public string CntctRespCode { get; set; }

        /// <summary>
        /// The EntityContactsVM Priority
        /// </summary>
        public int Priority { get; set; }

        /// <summary>
        /// The Effective Start Date for the Contact
        /// </summary>
        [DateRequired(ErrorMessage = "Effective Start Date is required.")]
        public DateTime EfctvStartDt { get; set; }

        /// <summary>
        /// The Effective End Date for the Contact
        /// </summary>
        [DateRequired(ErrorMessage = "Effective End Date is required.")]
        [CompareEffectiveDates("EfctvStartDt")]
        public DateTime EfctvEndDt { get; set; }

        /// <summary>
        /// The Inactive Start date for the contact
        /// </summary>
        public DateTimeOffset? InctvTsDt { get; set; }

        /// <summary>
        /// The Print Name for the Contact
        /// </summary>
        [Required(AllowEmptyStrings = false, ErrorMessage = "Print Name is required.")]
        [MaxLength(80)]
        public string PrintName { get; set; }

        /// <summary>
        /// The Title for the Contact
        /// </summary>
        [Required(AllowEmptyStrings = false, ErrorMessage = "Title is required.")]
        [MaxLength(50)]
        public string Title { get; set; }

        /// <summary>
        /// Contact Communications for the Contact
        /// </summary>
        public IEnumerable<ContactCommunicationsVM> ContactCommunications { get; set; }

        /// <summary>
        /// Address of the Contact
        /// </summary>
        public EntityAddressVM ContactAddress { get; set; }

        /// <summary>
        /// TimeStamp for the set Contact
        /// </summary>
        public DateTime TimeStamp { get; set; }
    }
}