using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.BenefitPlan.DAL.Models.Containers
{
    /// <summary>
    /// The Benefit Integration Container for Benefit Plan
    /// </summary>
    public class BenefitIntegration
    {
        [JsonProperty(PropertyName = "status")]
        public string Status { get; set; }

        public BenefitIntegration()
        {
            this.Status = string.Empty;
        }
    }
}
