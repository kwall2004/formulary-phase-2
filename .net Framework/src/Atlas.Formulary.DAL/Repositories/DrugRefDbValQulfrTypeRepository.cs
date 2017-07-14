using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.Repositories.Interfaces;
using System.Linq;
using System.Collections.Generic;
using Atlas.Configuration;

namespace Atlas.Formulary.DAL.Repositories
{
    public class DrugRefDbValQulfrTypeRepository : IDrugRefDbValQulfrTypeRepository
    {
        private FormularyEntities _db;

        public DrugRefDbValQulfrTypeRepository(FormularyEntities db)
        {
            _db = db;
        }

        public List<object> Get(long? drugRefDbSk = null)
        {
            var result = (from vqt in _db.ValQulfrType
                          join drvqt in _db.DrugRefDbValQulfrType on vqt.ValQulfrTypeSK equals drvqt.ValQulfrTypeSK
                          where (drugRefDbSk == null || drvqt.DrugRefDbSK == drugRefDbSk) && drvqt.InctvTs == null && drvqt.DelTs == null
                          select new
                          {
                              ValQulfrTypeSK = drvqt.ValQulfrTypeSK,
                              DrufRefDbSK = drvqt.DrugRefDbSK,
                              ValQulfrCode = vqt.ValQulfrCode
                          }).ToList<object>();
            return result;
        }

        public void Dispose()
        {
            _db.Dispose();
        }
    }
}
