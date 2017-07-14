using System.Collections.Generic;

namespace Atlas.BenefitPlan.DAL.Models.DataCompare.Merlin
{
    /// <summary>
    /// the Merlin Copay Class for Data Compare
    /// </summary>
    public class Copay : CompareEntity
    {
        public string AtlasRecordId { get; set; }
        public long? AtlasBenefitId { get; set; }
        public string FulfillmentType { get; set; }
        public string PharmNetworkId { get; set; }
        public int? FormularyTierId { get; set; }
        public long? AtlasCoveragePhaseId { get; set; }
        public long? CoveragePhaseId { get; set; }
        public string Maintenance { get; set; }
        public decimal? CoinsurancePercent { get; set; }
        public decimal? CopayAmount { get; set; }
        public bool? CopayLesserOf { get; set; }
        public decimal? CopayPercent { get; set; }
        public decimal? MaxCopayAmount { get; set; }

        /// <summary>
        /// the Constructor
        /// </summary>
        public Copay()
        {
            this.ExcludedEntity.AddRange(new List<string>() { "CoveragePhaseId" });
        }
    }
}