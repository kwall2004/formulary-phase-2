using Atlas.BenefitPlan.DAL.Models.Enums;

namespace Atlas.BenefitPlan.DAL.Models.Containers
{
    /// <summary>
    /// The DropDown List Container for Service Area Lookup Details
    /// </summary>
    public class ServiceAreaLookupDetail
    {
        /// <summary>
        /// The Service Area Lookup Type
        /// </summary>
        /// <value>The lookup type child.</value>
        public ServiceAreaAddressHierarchy LookupTypeChild { get; set; }

        /// <summary>
        /// The Service Area Type Key
        /// Country = SvcAreaCntryCodeSK
        /// StateProvince = SvcAreaStPrvncCodeSK
        /// County = SvcAreaCntyCodeSK
        /// PostalCode = SvcAreaPstlCodeSK
        /// </summary>
        /// <value>The SVC area type sk.</value>
        public long SvcAreaTypeSK { get; set; }

        /// <summary>
        /// The Lookup Type SK
        /// </summary>
        /// <value>The lookup type sk.</value>
        public long LookupTypeSK { get; set; }

        /// <summary>
        /// The Lookup Type Description
        /// </summary>
        /// <value>The lookup type description.</value>
        public string LookupTypeDescription { get; set; }

        /// <summary>
        /// Indicator if the Lookup Description is a US Zip + 4
        /// </summary>
        /// <value><c>true</c> if [us zip plus4 ind]; otherwise, <c>false</c>.</value>
        public bool USZipPlus4Ind { get; set; }

        /// <summary>
        /// The Service Area Entity Selected
        /// </summary>
        /// <value><c>true</c> if selected; otherwise, <c>false</c>.</value>
        public bool Selected { get; set; }
    }
}