using System.Collections.Generic;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Benefit Plan View Model for Service Area Update
    /// </summary>
    public class ServiceAreaUpdateVM : ServiceAreaVM
    {
        /// <summary>Is the Record Deleted</summary>
        public bool Deleted { get; set; }

        /// <summary>The List of Transactions</summary>
        public List<ServiceAreaUpdateListVM> Transactions { get; set; }

        /// <summary>
        /// the Constructor for Service Area UpdateVM
        /// </summary>
        public ServiceAreaUpdateVM()
        {
            this.Deleted = false;
            this.Transactions = new List<ServiceAreaUpdateListVM>();
        }
    }
}