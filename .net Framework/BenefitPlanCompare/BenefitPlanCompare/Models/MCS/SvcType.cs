using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BenefitPlanCompare.Models
{
    public class SvcType : CompareEntity
    {
        public long? SvcTypeSK { get; set; }
        public string SvcTypeCode { get; set; }
        public string SvcTypeDesc { get; set; } 
		
    }
  //      ListItem as SvcType,
		//ListDescription as SvcDesc, 
}