using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BenefitPlanCompare.Models
{
    public class AllowedPrescriber : CompareEntity
    {
        public string AtlasRecordId { get; set; }
        public long? atlasPlanGroupId { get; set; }
        public string NPI { get; set; }
    }
}