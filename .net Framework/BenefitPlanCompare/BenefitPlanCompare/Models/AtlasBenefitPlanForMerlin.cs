using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace BenefitPlanCompare.Models
{
    public class AtlasBenefitPlanForMerlin : CompareEntity
    {
        public Group Group { get; set; }

        public AtlasBenefitPlanForMerlin()
        {
            this.Group = new Group();
            this.ExcludedEntity.Add("Group");
        }

        public List<CompareResults> Compare(AtlasBenefitPlanForMerlin another)
        {
            List<CompareResults> results = new List<CompareResults>();
            results.AddRange(this.Group.CompareEx(another.Group));
            return results;
        }
    }
}