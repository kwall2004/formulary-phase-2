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
    public class FrmlryPlanSubTypeRepository : EFRepositoryBase<FrmlryPlanSubType, ReferenceEntities>, IFrmlryPlanSubTypeRepository
    {
        public FrmlryPlanSubTypeRepository(ReferenceEntities db) : base(db)
        {

        }

        public List<FrmlryPlanSubType> GetFormularyPlanSubType()
        {
            var queryResult = _db.FrmlryPlanSubType.Where(a => a.InctvTs == null && a.DelTs == null).ToList();
            return queryResult;
        }
    }
}
