using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BenefitPlanCompare.Models
{
    public class ProgramCode : CompareEntity
    {
        public string AtlasRecordId { get; set; } 
		public long? AtlasPlanGroupId { get; set; } 
		public long? AtlasBenefitId { get; set; } 
		public string ProgGroupCode { get; set; } 
		public string ProgBenefitCode { get; set; } 
		public string ProgDescription { get; set; } 
		public DateTime? EffDate { get; set; } 
		public DateTime? TermDate { get; set; } 
		public bool? Active { get; set; } 
		public string BenefitResetDate { get; set; } 
		public string EmpGroupName { get; set; } 
		public string GroupRiders { get; set; } 
		public decimal? RiderCovMax { get; set; } 
		public string RiderTierCodes { get; set; } 
    }
}