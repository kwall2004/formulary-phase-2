using System.Collections.Generic;

namespace Atlas.BenefitPlan.DAL.Models.Containers
{
    /// <summary>
    /// The Pharmacy Type With DaySupply Container for Benefit Plan
    /// </summary>
    public class PharmacyTypeWithDaySupply
    {
        /// <summary>
        /// Gets or sets the BNFT plan pharm type sk.
        /// </summary>
        /// <value>The BNFT plan pharm type sk.</value>
        public long BnftPlanPharmTypeSK { get; set; }
        /// <summary>
        /// Gets or sets the BNFT plan sk.
        /// </summary>
        /// <value>The BNFT plan sk.</value>
        public long BnftPlanSK { get; set; }
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

        /// <summary>
        /// List of Day Supply for the Pharmacy Type
        /// </summary>
        /// <value>The day supply.</value>
        public List<DaySupply> DaySupply { get; set; }

        /// <summary>
        /// the Constructor for Pharmacy Type With Day Supply
        /// </summary>
        public PharmacyTypeWithDaySupply()
        {
            this.DaySupply = new List<DaySupply>();
        }
    }
}