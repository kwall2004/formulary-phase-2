using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.Repositories.Interfaces;
using System.Linq;
using System.Collections.Generic;
using Atlas.Configuration;

namespace Atlas.Formulary.DAL.Repositories
{
    public class DrugRefDbRepository : EFRepositoryBase<DrugRefDb, FormularyEntities>, IDrugRefDbRepository
    {
        public DrugRefDbRepository(IConfig config, FormularyEntities db) : base(config, db) { }

        public List<DrugRefDb> Get()
        {
            var queryResult = _db.DrugRefDb.Where(a => a.InctvTs == null && a.DelTs == null).ToList();
            return queryResult;
        }
    }
}
