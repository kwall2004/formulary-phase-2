using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.BenefitPlan.DAL.Models.Containers
{
    /// <summary>
    /// The Pharmacy Type With Network Tier Container for Benefit Plan
    /// </summary>
    public class PharmacyTypeWithNetworkTier
    {
        /// <summary>
        /// Gets or sets the BNFT plan sk.
        /// </summary>
        /// <value>The BNFT plan sk.</value>
        public long BnftPlanSK { get; set; }

        /// <summary>
        /// Gets or sets the NtwrkTier sk.
        /// </summary>
        /// <value>The NtwrkTier sk.</value>
        public long NtwrkTierSK { get; set; }

        /// <summary>
        /// Gets or sets the pharm type sk.
        /// </summary>
        /// <value>The pharm type sk.</value>
        public long PharmTypeSK { get; set; }

        /// <summary>
        /// Gets or sets the pharm type code.
        /// </summary>
        /// <value>The pharm type code.</value>
        public string PharmTypeCode { get; set; }
    }
}
