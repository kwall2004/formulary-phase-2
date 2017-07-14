using System.Collections.Generic;

namespace Atlas.BenefitPlan.DAL.Models.Containers
{
    /// <summary>
    /// Population Group Plan Benefit Package List
    /// </summary>
    public class PopulationGroupList
    {
        /// <summary>
        /// The Population Group Key
        /// </summary>
        /// <value>The pop GRP sk.</value>
        public long PopGrpSK { get; set; }

        /// <summary>
        /// The Group Key
        /// </summary>
        /// <value>The GRP sk.</value>
        public long GrpSK { get; set; }

        /// <summary>
        /// The Population Group Name
        /// </summary>
        /// <value>The name of the pop GRP.</value>
        public string PopGrpName { get; set; }

        /// <summary>
        /// The Effective Start Date for the Population Group
        /// </summary>
        /// <value>The efctv start dt.</value>
        public System.DateTime EfctvStartDt { get; set; }

        /// <summary>
        /// The Effective End Date for the Population Group
        /// </summary>
        /// <value>The efctv end dt.</value>
        public System.DateTime EfctvEndDt { get; set; }

        /// <summary>
        /// List of Plan Benefit Packages
        /// </summary>
        /// <value>The plan benefit packages.</value>
        public List<PopulationGroupPlanBenefitPackageList> PlanBenefitPackages { get; set; }

        /// <summary>
        /// the Constructor
        /// </summary>
        public PopulationGroupList()
        {
            PlanBenefitPackages = new List<PopulationGroupPlanBenefitPackageList>();
        }
    }
}