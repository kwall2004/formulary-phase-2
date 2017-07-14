using System.Collections.Generic;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Benefit Plan View Model for Service Area Configuration
    /// </summary>
    public class ServiceAreaConfigurationVM
    {
        /// <summary>The Plan Benefit Package Key</summary>
        public long PBPSK { get; set; }

        /// <summary>The Plan Benefit Package Name</summary>
        public string PBPName { get; set; }

        /// <summary>The List of Benefit Plans</summary>
        public List<ServiceAreaGetVM> ServiceAreas { get; set; }

        /// <summary>
        /// the Constructor
        /// </summary>
        public ServiceAreaConfigurationVM()
        {
            this.ServiceAreas = new List<ServiceAreaGetVM>();
        }
    }
}