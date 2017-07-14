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
    public class DrugTypeFnRepository : EFRepositoryBase<DrugTypeFn, ReferenceEntities>, IDrugTypeFnRepository
    {
        public DrugTypeFnRepository(ReferenceEntities db) : base(db)
        {

        }

        public List<DrugTypeFn> GetDrugTypeFns(long drugRefDbSK)
        {
            var queryResult = _db.DrugTypeFn.Where(a => a.InctvTs == null && a.DelTs == null && a.DrugRefDbSK == drugRefDbSK).ToList();
            return queryResult;
        }
    }
}
