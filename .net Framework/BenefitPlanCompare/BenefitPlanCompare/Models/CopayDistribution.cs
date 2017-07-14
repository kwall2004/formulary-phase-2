using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BenefitPlanCompare.Models
{
    public class CopayDistribution : CompareEntity
    {
        public string AtlasRecordId { get; set; }
        public long? atlasBenefitId { get; set; }
        public long? atlasCoveragePhaseId { get; set; }
        public int? formularyTierId { get; set; }
        public decimal? memberResponsibilityAmt { get; set; }
        public decimal? memberResponsibilityPct { get; set; }
        public decimal? mfrResponsibilityPct { get; set; }
        public decimal? planDeductAmt { get; set; }
        public decimal? licsSubsidyPct { get; set; }
        public decimal? maxCoverageMonthly { get; set; }
        public decimal? maxCoverageYearl { get; set; }
        public decimal? maxOOPMonthly { get; set; }
        public decimal? maxOOPYearly { get; set; }
    }
}