using Atlas.Core.DAL.Repositories;
using Atlas.Reference.DAL.Models;
using System.Collections.Generic;

namespace Atlas.Reference.DAL.Repositories.Interfaces
{
    public interface IFrmlryPlanTypeRepository : IRepository<FrmlryPlanType>
    {
        List<FrmlryPlanType> GetFormularyPlanType();
    }
}
