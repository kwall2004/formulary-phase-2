using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BenefitPlanCompare.Models
{
    public class BnftSvcType_MCS : CompareEntity
    {
        public long? BnftSK { get; set; }
        public long? SvcTypeSK { get; set; }
    }
}