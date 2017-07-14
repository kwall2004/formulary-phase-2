using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BenefitPlanCompare.Models
{
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