using Atlas.Configuration;
using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.Repositories
{
    public class DrugSourceFileHistoryRepository : EFRepositoryBase<spDrugSourceFileHistory_Get_Result, FormularyEntities>, IDrugSourceFileHistoryRepository
    {
        public DrugSourceFileHistoryRepository(IConfig config, FormularyEntities db) : base(config, db) { }
        public List<spDrugSourceFileHistory_Get_Result> GetDrugSourceFileHistory(DateTime startTime, DateTime endTime)
        {
            var queryResult = _db.spDrugSourceFileHistory_Get(startTime, endTime);
            var listResults = queryResult.ToList();
            return listResults;
        }
    }
}
