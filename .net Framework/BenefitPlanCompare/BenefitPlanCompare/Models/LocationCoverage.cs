using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BenefitPlanCompare.Models
{
    public class LocationCoverage : CompareEntity
    {
		public string AtlasRecordId { get; set; } 
		public long? atlasPlanGroupId { get; set; } 
		public string planCoverageCounty { get; set; } 
		public string planCoverageState { get; set; }
    }
}