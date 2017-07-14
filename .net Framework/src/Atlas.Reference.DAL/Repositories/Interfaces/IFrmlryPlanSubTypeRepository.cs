using Atlas.Core.DAL.Repositories;
using Atlas.Reference.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Reference.DAL.Repositories.Interfaces
{
    public interface IFrmlryPlanSubTypeRepository : IRepository<FrmlryPlanSubType>
    {
        List<FrmlryPlanSubType> GetFormularyPlanSubType();
    }
}
