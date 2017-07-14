using System;

namespace Atlas.BenefitPlan.DAL.Models.Containers
{
    /// <summary>
    /// Network Tier Record With Type
    /// </summary>
    public class NtwrkTierWithType
    {
        /// <summary>
        /// Gets or sets the NTWRK tier sk.
        /// </summary>
        /// <value>The NTWRK tier sk.</value>
        public long NtwrkTierSK { get; set; }
        /// <summary>
        /// Gets or sets the BNFT plan sk.
        /// </summary>
        /// <value>The BNFT plan sk.</value>
        public long BnftPlanSK { get; set; }
        /// <summary>
        /// Gets or sets the NTWRK tier type sk.
        /// </summary>
        /// <value>The NTWRK tier type sk.</value>
        public long NtwrkTierTypeSK { get; set; }
        /// <summary>
        /// Gets or sets the NTWRK tier NBR.
        /// </summary>
        /// <value>The NTWRK tier NBR.</value>
        public int NtwrkTierNbr { get; set; }
        /// <summary>
        /// Gets or sets the name of the NTWRK tier.
        /// </summary>
        /// <value>The name of the NTWRK tier.</value>
        public string NtwrkTierName { get; set; }
        /// <summary>
        /// Gets or sets the efctv start dt.
        /// </summary>
        /// <value>The efctv start dt.</value>
        public System.DateTime EfctvStartDt { get; set; }
        /// <summary>
        /// Gets or sets the efctv end dt.
        /// </summary>
        /// <value>The efctv end dt.</value>
        public System.DateTime EfctvEndDt { get; set; }
        /// <summary>
        /// Gets or sets the created by.
        /// </summary>
        /// <value>The created by.</value>
        public string CreatedBy { get; set; }
        /// <summary>
        /// Gets or sets the created ts.
        /// </summary>
        /// <value>The created ts.</value>
        public System.DateTimeOffset CreatedTs { get; set; }
        /// <summary>
        /// Gets or sets the last modfd by.
        /// </summary>
        /// <value>The last modfd by.</value>
        public string LastModfdBy { get; set; }
        /// <summary>
        /// Gets or sets the last modfd ts.
        /// </summary>
        /// <value>The last modfd ts.</value>
        public System.DateTimeOffset LastModfdTs { get; set; }
        /// <summary>
        /// Gets or sets the inctv ts.
        /// </summary>
        /// <value>The inctv ts.</value>
        public Nullable<System.DateTimeOffset> InctvTs { get; set; }
        /// <summary>
        /// Gets or sets the delete ts.
        /// </summary>
        /// <value>The delete ts.</value>
        public Nullable<System.DateTimeOffset> DelTs { get; set; }
    }
}