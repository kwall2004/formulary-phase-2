using Atlas.BenefitPlan.DAL.Models.DataCompare;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.BenefitPlan.BLL.Interfaces
{
    /// <summary>
    /// The Interface for Data Compare Merlin BLL for Benefit Plan
    /// </summary>
    public interface IDataCompareMerlinBLL
    {
        List<CompareResults> ComparePlan(long? bnftPlanSK, string planPgmCode);
    }
}
