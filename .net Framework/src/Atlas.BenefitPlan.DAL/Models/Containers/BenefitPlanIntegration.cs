using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.BenefitPlan.DAL.Models.Containers
{
    /// <summary>
    /// The Benefit Plan Integration Container for Benefit Plan
    /// </summary>
    public class BenefitPlanIntegration
    {
        [JsonProperty(PropertyName = "popGrpPBPSK")]
        public long PopGrpPBPSK { get; set; }
        [JsonProperty(PropertyName = "isSandbox")]
        public bool isSandbox { get; set; }

        public BenefitPlanIntegration()
        {
            this.isSandbox = true;
        }
    }
}
