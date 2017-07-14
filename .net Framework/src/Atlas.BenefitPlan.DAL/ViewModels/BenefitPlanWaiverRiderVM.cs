namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Benefit Plan View Model for Benefit Plan with benefit plan details
    /// </summary>
    public class BenefitPlanWaiverRiderVM : BaseViewModel
    {
        #region BnftPlanWvrRider fields

        /// <summary>
        /// the Benefit plan SK
        /// </summary>
        public long BnftPlanWvrRiderSK { get; set; }

        public long WvrRiderTypeSK { get; set; }

        public bool Deleted { get; set; }

        #endregion BnftPlanWvrRider fields
    }
}