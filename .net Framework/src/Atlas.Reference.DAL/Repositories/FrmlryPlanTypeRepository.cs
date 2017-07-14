using Atlas.Core.DAL.Repositories;
using Atlas.Reference.DAL.Models;
using Atlas.Reference.DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Reference.DAL.Repositories
{
    public class FrmlryPlanTypeRepository : EFRepositoryBase<FrmlryPlanType, ReferenceEntities>, IFrmlryPlanTypeRepository
    {
        public FrmlryPlanTypeRepository(ReferenceEntities db) : base(db)
        {
        }

        public List<FrmlryPlanType> GetFormularyPlanType()
        {
            var queryResult = _db.FrmlryPlanType.Where(a => a.InctvTs == null && a.DelTs == null).ToList();
            return queryResult;
        }
    }
}
