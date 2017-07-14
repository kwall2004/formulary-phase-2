using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.Repositories.Interfaces;
using System.Linq;
using System.Collections.Generic;
using Atlas.Configuration;

namespace Atlas.Formulary.DAL.Repositories
{
    public class JobStatTypeRepository : IJobStatTypeRepository
    {
        private FormularyEntities _db;

        public JobStatTypeRepository(FormularyEntities db)
        {
            _db = db;
        }

        public List<object> Get()
        {
            var result = (from jst in _db.JobStatType
                          where jst.InctvTs == null && jst.DelTs == null
                          select new
                          {
                              JobStatTypeCode = jst.JobStatTypeCode
                          }).ToList<object>();
            return result;
        }

        public void Dispose()
        {
            _db.Dispose();
        }
    }
}
