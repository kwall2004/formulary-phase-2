namespace Atlas.BenefitPlan.DAL.Models.DataCompare.Merlin
{
    /// <summary>
    /// the Merlin Allowed Prescriber Class for Data Compare
    /// </summary>
    public class AllowedPrescriber : CompareEntity
    {
        public string AtlasRecordId { get; set; }
        public long? AtlasPlanGroupId { get; set; }
        public string NPI { get; set; }
    }
}