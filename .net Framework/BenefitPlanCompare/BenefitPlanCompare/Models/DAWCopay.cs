using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BenefitPlanCompare.Models
{
    public class DAWCopay : CompareEntity
    {
        public string AtlasRecordId { get; set; } 		
		public long? AtlasBenefitId { get; set; } 
		public string PharmNetworkId { get; set; } 
		public string Maintenance { get; set; } 
		public int? FormularyTierId { get; set; }
		public string DAWType { get; set; }
		public decimal? CoinsurancePercent { get; set; } 
		public decimal? CopayAmount { get; set; } 
		public decimal? CopayPercent { get; set; } 
		public decimal? CostDiffMemberRespPct { get; set; } 
		public decimal? CostDiffPharmaRespPct { get; set; } 
		public decimal? CostDiffPlanRespPct { get; set; } 
    }
}