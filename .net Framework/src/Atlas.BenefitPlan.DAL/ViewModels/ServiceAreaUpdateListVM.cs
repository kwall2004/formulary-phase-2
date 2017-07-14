using Atlas.BenefitPlan.DAL.Models.Enums;
using System.ComponentModel.DataAnnotations;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Benefit Plan View Model for Service Area Update List
    /// </summary>
    public class ServiceAreaUpdateListVM
    {
        /// <summary>The Service Area Key</summary>
        public long SvcAreaSK { get; set; }

        /// <summary>The Service Area Transaction Type</summary>
        public ServiceAreaAddressHierarchy TransactionType { get; set; }

        /// <summary>
        /// The Service Area Type Key
        /// Country = SvcAreaCntryCodeSK
        /// StateProvince = SvcAreaStPrvncCodeSK
        /// County = SvcAreaCntyCodeSK
        /// PostalCode = SvcAreaPstlCodeSK
        /// </summary>
        public long SvcAreaTypeSK { get; set; }

        /// <summary>
        /// The Transaction Type Key
        /// Country = ISOCountryCodeSK
        /// StateProvince = StPrvncCodeSK
        /// County = FIPSCntyCode
        /// PostalCode = PstlCodeSK
        /// </summary>
        [Range(1, double.MaxValue, ErrorMessage = "TransactionTypeSK field is required.")]
        public long TransactionTypeSK { get; set; }

        /// <summary>Is the Record Deleted</summary>
        public bool Deleted { get; set; }
    }
}