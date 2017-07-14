namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Benefit Plan View Model for Service Type
    /// </summary>
    public class ServiceTypeVM : BaseViewModel
    {
        /// <summary>
        /// the Service Type SK
        /// </summary>
        public long SvcTypeSK { get; set; }

        /// <summary>
        /// The Service Type Name
        /// </summary>
        public string ServiceTypeName { get; set; }
    }
}