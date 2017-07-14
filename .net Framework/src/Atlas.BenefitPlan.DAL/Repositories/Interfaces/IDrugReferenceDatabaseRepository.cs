using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.BenefitPlan.DAL.Repositories.Interfaces
{
    /// <summary>
    /// the interface for the Drug Reference Database Repository in Benefit Plan
    /// </summary>
    public interface IDrugReferenceDatabaseRepository : IRepository<DrugRefDb>
	{
	}
}

