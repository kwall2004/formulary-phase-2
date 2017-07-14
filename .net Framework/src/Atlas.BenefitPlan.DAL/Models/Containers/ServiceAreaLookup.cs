using Atlas.BenefitPlan.DAL.Models.Enums;
using System.Collections.Generic;

namespace Atlas.BenefitPlan.DAL.Models.Containers
{
    /// <summary>
    /// The DropDown List Container for Service Area Lookup
    /// </summary>
    public class ServiceAreaLookup
    {
        /// <summary>
        /// The Plan Benefit Package Key
        /// </summary>
        /// <value>The SVC area sk.</value>
        public long SvcAreaSK { get; set; }

        /// <summary>
        /// The Service Area Lookup Type
        /// </summary>
        /// <value>The type of the lookup.</value>
        public ServiceAreaAddressHierarchy LookupType { get; set; }

        /// <summary>
        /// The Service Area Lookup Details
        /// </summary>
        /// <value>The lookup details.</value>
        public List<ServiceAreaLookupDetail> LookupDetails { get; set; }

        /// <summary>
        /// The Service Area Node Detail
        /// </summary>
        /// <value>The service area bread crumb.</value>
        public ServiceAreaNodeDetail ServiceAreaBreadCrumb { get; set; }

        /// <summary>
        /// Initializes a new instance of the <see cref="ServiceAreaLookup"/> class.
        /// </summary>
        public ServiceAreaLookup()
        {
            this.LookupDetails = new List<ServiceAreaLookupDetail>();
            this.ServiceAreaBreadCrumb = new ServiceAreaNodeDetail();
        }
    }
}