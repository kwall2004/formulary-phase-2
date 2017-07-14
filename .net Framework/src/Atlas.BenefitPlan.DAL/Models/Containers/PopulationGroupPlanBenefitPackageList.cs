using System;

namespace Atlas.BenefitPlan.DAL.Models.Containers
{
    /// <summary>
    /// Population Group Plan Benefit Package List
    /// </summary>
    public class PopulationGroupPlanBenefitPackageList
    {
        /// <summary>
        /// The Population Group PBP Key
        /// </summary>
        /// <value>The pop GRP PBPSK.</value>
        public long PopGrpPBPSK { get; set; }

        /// <summary>
        /// The Population Group Key
        /// </summary>
        /// <value>The pop GRP sk.</value>
        public long PopGrpSK { get; set; }

        /// <summary>
        /// The PBP Key
        /// </summary>
        /// <value>The PBPSK.</value>
        public long PBPSK { get; set; }

        /// <summary>
        /// The Plan Benefit Package Name
        /// </summary>
        /// <value>The name of the PBP.</value>
        public string PBPName { get; set; }

        /// <summary>
        /// The Plan Benefit Package ID
        /// </summary>
        /// <value>The pbpid.</value>
        public string PBPID { get; set; }

        /// <summary>
        /// The Plan Benefit Code
        /// </summary>
        /// <value>The plan PGM code.</value>
        public string PlanPgmCode { get; set; }

        /// <summary>
        /// The Effective Start Date for the Population Group Plan Benefit Package
        /// </summary>
        /// <value>The efctv start dt.</value>
        public DateTime EfctvStartDt { get; set; }

        /// <summary>
        /// The Effective End Date for the Population Group Plan Benefit Package
        /// </summary>
        /// <value>The efctv end dt.</value>
        public DateTime EfctvEndDt { get; set; }

        /// <summary>
        /// The Effective Start Date for the Population Group Plan Benefit Package
        /// </summary>
        /// <value>The efctv start dt.</value>
        public DateTime? DOSProcsngStartDt { get; set; } 

        /// <summary>
        /// The Effective End Date for the Population Group Plan Benefit Package
        /// </summary>
        /// <value>The efctv end dt.</value>
        public DateTime? DOSProcsngEndDt { get; set; }

        /// <summary>
        /// Current Status
        /// </summary>
        /// <value>Current Workflow Status.</value>
        public string CurrentStatus { get; set; }

        /// <summary>
        /// Active Flag
        /// </summary>
        /// <value><c>true</c> if active; otherwise, <c>false</c>.</value>
        public bool Active { get; set; }

        /// <summary>
        /// Locked - if the Status is approved or not.
        /// </summary>
        /// <value><c>true</c> if locked; otherwise, <c>false</c>.</value>
        public bool isLocked { get; set; }

        /// <summary>
        /// The New Plan Benefit Code
        /// </summary>
        /// <value>The New plan PGM code.</value>
        public string NewPlanPgmCode { get; set; }
    }
}