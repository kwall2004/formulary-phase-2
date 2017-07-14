using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace BenefitPlanCompare.Models
{
/// <summary>
/// Compare Entity Class
/// </summary>
    public class CompareEntity
    {
        public bool Processed { get; set; }
        public List<string> ExcludedEntity { get; set; }

/// <summary>
/// Constructor
/// </summary>
        public CompareEntity()
        {
            this.ExcludedEntity = new List<string>() { "Processed", "ExcludedEntity" };

            // These Items will never match
            this.ExcludedEntity.AddRange(new List<string>() { "AtlasRecordId", "AtlasPlanGroupId", "AtlasBenefitId", "AtlasCoveragePhaseId" });
        }
    }
}