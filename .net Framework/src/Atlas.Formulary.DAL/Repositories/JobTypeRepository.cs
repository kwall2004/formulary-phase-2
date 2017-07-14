using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.Repositories.Interfaces;
using System.Linq;
using System.Collections.Generic;
using Atlas.Configuration;

namespace Atlas.Formulary.DAL.Repositories
{
    public class JobTypeRepository : IJobTypeRepository
    {
        private FormularyEntities _db;

        public JobTypeRepository(FormularyEntities db)
        {
            _db = db;
        }

        public List<object> Get()
        {
            var result = (from jt in _db.JobType
                          where jt.InctvTs == null && jt.DelTs == null
                          select new
                          {
                              JobTypeCode = jt.JobTypeCode
                          }).ToList<object>();
            return result;
        }

        public void Dispose()
        {
            _db.Dispose();
        }
    }
}
