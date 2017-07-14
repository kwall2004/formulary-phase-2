using Atlas.BenefitPlan.DAL.Models.DataCompare.Extensions;
using System.Collections.Generic;

namespace Atlas.BenefitPlan.DAL.Models.DataCompare.Merlin
{
    /// <summary>
    /// the Atlas Benefit Plan for Merlin Class for Data Compare
    /// </summary>
    public class AtlasBenefitPlanForMerlin : CompareEntity
    {
        public Group Group { get; set; }

        /// <summary>
        /// the Constructor for AtlasBenefitPlanForMerlin
        /// </summary>
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
