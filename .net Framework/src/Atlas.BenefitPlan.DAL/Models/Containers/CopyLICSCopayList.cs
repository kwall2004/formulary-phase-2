using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.BenefitPlan.DAL.Models.Containers
{
    /// <summary>
    /// The Copy LICS Copay List Container for Benefit Plan
    /// </summary>
    public class CopyLICSCopayList
    {
        /// <summary>
        /// </summary>
        /// <value>bnftPlanSK</value>
        public int? bnftPlanSK { get; set; }

        /// <summary>
        /// </summary>
        /// <value>copyFromLICSTypeSK</value>
        public int? copyFromLICSTypeSK { get; set; }

        /// <summary>
        /// </summary>
        /// <value>list of copyToLICSTypes</value>
        public List<int> copyToLICSTypes { get; set; }

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
        /// <value>username</value>
        public string username { get; set; }

        /// <summary>
        /// </summary>
        /// <value>overwriteDuplicates</value>
        public Boolean? overwriteDuplicates { get; set; }
    }
}
