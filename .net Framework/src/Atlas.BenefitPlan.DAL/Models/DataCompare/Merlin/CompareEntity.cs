using System.Collections.Generic;

namespace Atlas.BenefitPlan.DAL.Models.DataCompare.Merlin
{
    public class CompareEntity
    {
        public bool Processed { get; set; }
        public List<string> ExcludedEntity { get; set; }

        public CompareEntity()
        {
            this.ExcludedEntity = new List<string>() { "Processed", "ExcludedEntity" };

            // These Items will never match
            this.ExcludedEntity.AddRange(new List<string>() { "AtlasRecordId", "AtlasPlanGroupId", "AtlasBenefitId", "AtlasCoveragePhaseId" });
        }
    }
}
