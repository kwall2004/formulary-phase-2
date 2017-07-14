namespace Atlas.BenefitPlan.DAL.Models.DataCompare.Merlin
{
    /// <summary>
    /// the Merlin Location Coverage Class for Data Compare
    /// </summary>
    public class LocationCoverage : CompareEntity
    {
        public string AtlasRecordId { get; set; }
        public long? AtlasPlanGroupId { get; set; }
        public string PlanCoverageCounty { get; set; }
        public string PlanCoverageState { get; set; }
    }
}