namespace Atlas.BenefitPlan.DAL.Models.DataCompare.Merlin
{
    /// <summary>
    /// the Merlin Coverage Phase Class for Data Compare
    /// </summary>
    public class CoveragePhase : CompareEntity
    {
        public string AtlasRecordId { get; set; }
        public long? AtlasPlanGroupId { get; set; }
        public long? AtlasBenefitId { get; set; }
        public int? RankOrder { get; set; }
        public long? AtlasCoveragePhaseId { get; set; }
        public string CoverageCode { get; set; }
        public string CoveragePhaseName { get; set; }
        public decimal? MaxTDSAmount { get; set; }
        public decimal? MaxTROOPAmount { get; set; }
    }
}