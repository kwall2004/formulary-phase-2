using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.BenefitPlan.DAL.Models.Containers
{
    /// <summary>
    /// Class CopyCopaySetupList
    /// </summary>
    public class CopyCopaySetupList
    {
        /// <summary>
        /// </summary>
        /// <value>bnftPlanSK</value>
        public int? bnftPlanSK { get; set; }

        /// <summary>
        /// </summary>
        /// <value>copyFromPharmTypeSK</value>
        public int? copyFromPharmTypeSK { get; set; }

        /// <summary>
        /// </summary>
        /// <value>list of copyToPharmTypes</value>
        public List<int> copyToPharmTypes { get; set; }

        /// <summary>
        /// </summary>
        /// <value>copyFromNtwrkTierSK</value>
        public int? copyFromNtwrkTierSK { get; set; }

        /// <summary>
        /// </summary>
        /// <value>copyToNtwrkTierSK</value>
        public int? copyToNtwrkTierSK { get; set; }

        /// <summary>
        /// </summary>
        /// <value>username</value>
        public string username { get; set; }

        /// <summary>
        /// </summary>
        /// <value>overwriteDuplicates</value>
        public Boolean? overwriteDuplicates { get; set; }
    }
}
