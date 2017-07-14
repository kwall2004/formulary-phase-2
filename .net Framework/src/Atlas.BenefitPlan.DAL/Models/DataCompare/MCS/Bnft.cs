using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Atlas.BenefitPlan.DAL.Models.DataCompare.MCS
{
    public class Bnft 
    {
        public long? BnftSK { get; set; }
        public string BnftCode { get; set; }
        public string BnftName { get; set; } 
		public int? BnftOrder { get; set; } 
		
    }

    //BnftCode = SubString(ReasonCode, 1,80)
    //BnftName = SubString(ReasonDesc,    1,80)
    //BnftSeq = cast(PolicyId as Int)
}