using Atlas.BenefitPlan.DAL.Infrastructure.Attributes;
using Atlas.BenefitPlan.DAL.Models.Enums;
using System;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Entity Address View Model for Benefit Plan
    /// </summary>
    public class EntityAddressVM : BaseViewModel
    {
        /// <summary>
        /// The Entity Type for the Tenant Family Hierarchy
        /// </summary>
        public EntityAddressType EntityType { get; set; }

        /// <summary>
        /// The Entity Address Id
        /// </summary>
        public long EntityTypeAddressSK { get; set; }

        /// <summary>
        /// The Entity Type for the Tenant Family Hierarchy</summary>
        [Range(1, double.MaxValue, ErrorMessage = "EntityTypeSK field is required.")]
        public long EntityTypeSK { get; set; }

        /// <summary>
        /// The Entity Effective Start Date
        /// </summary>
        [DateRequired]
        public System.DateTime EntityEfctvStartDt { get; set; }

        /// <summary>
        /// The Entity Effective Start Date
        /// </summary>
        [DateRequired]
        public System.DateTime EntityEfctvEndDt { get; set; }

        /// <summary>
        /// The Entity Type for the Tenant Family Hierarchy
        /// </summary>
        public long AddrSK { get; set; }

        /// <summary>
        /// The Effective Start Date
        /// </summary>
        [DateRequired]
        [DateBetween("EntityEfctvStartDt,EntityEfctvEndDt")]
        public System.DateTime EfctvStartDt { get; set; }

        /// <summary>
        /// The Effective End Date
        /// </summary>
        [DateRequired]
        [CompareEffectiveDates("EfctvStartDt")]
        [DateBetween("EntityEfctvStartDt,EntityEfctvEndDt")]
        public System.DateTime EfctvEndDt { get; set; }

        /// <summary>
        /// Address Line 1
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        [MaxLength(55)]
        public string AddrLine1 { get; set; }

        /// <summary>
        /// Address Line 2
        /// </summary>
        [MaxLength(55)]
        public string AddrLine2 { get; set; }

        /// <summary>
        /// City
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        [MaxLength(30)]
        public string City { get; set; }

        /// <summary>
        /// County Code ID
        /// </summary>
        public Nullable<long> FIPSCntyCodeSK { get; set; }

        /// <summary>
        /// State or Province Code ID
        /// </summary>
        [Range(1, double.MaxValue, ErrorMessage = "StPrvncCodeSK field is required.")]
        public long StPrvncCodeSK { get; set; }

        /// <summary>
        /// Postal Code ID
        /// </summary>
        public long PstlCodeSK { get; set; }

        /// <summary>
        /// Postal Code
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        [PostalCode]
        public string PostalCode { get; set; }

        /// <summary>
        /// ISO Country Code ID
        /// </summary>
        [Range(1, double.MaxValue, ErrorMessage = "ISOCntryCodeSK field is required.")]
        public long ISOCntryCodeSK { get; set; }

        #region " Constructors "

        /// <summary>
        /// the Constructor for the EntityType View Model
        /// </summary>
        public EntityAddressVM()
        {
        }

        /// <summary>
        /// the Constructor for the EntityType View Model
        /// </summary>
        /// <param name="entityType">the Entity Type - EntityAddressType</param>
        public EntityAddressVM(EntityAddressType entityType)
        {
            this.EntityType = entityType;
        }

        #endregion " Constructors "
    }
}