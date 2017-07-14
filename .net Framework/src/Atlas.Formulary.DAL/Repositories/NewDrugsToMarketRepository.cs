using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Atlas.Reference.DAL.Models;
using System.Linq.Expressions;
using Atlas.Configuration;

namespace Atlas.Formulary.DAL.Repositories
{
    public class NewDrugsToMarketRepository : EFRepositoryBase<FDBDrugList, FormularyEntities>, INewDrugsToMarketRepository
    {

        public NewDrugsToMarketRepository(IConfig config, FormularyEntities db) : base(config, db) { }
        public List<spNewDrugsToMarket_Get_Result> GetAllNewDrugsToMarket(DateTime? fromDate, DateTime? thruDate, string drugType, int? etcId)
        {
            return _db.spNewDrugsToMarket_Get(fromDate, thruDate, drugType, etcId).ToList();
        }

        public List<spFrmlryForNDC_GetAll_Result> GetAllFormulariesByNDC(string NDC)
        {
            return _db.spFrmlryForNDC_GetAll(NDC).ToList();
        }

        public List<spNewDrugsToMarket_FullText_Result> GetNewDrugsToMarketFullTextSearch(string searchString)
        {
            var queryResult = _db.spNewDrugsToMarket_FullText(searchString).ToList();
            return queryResult;
        }

        public List<spNewDrugsToMarket_FullTextMS_Result> GetNewDrugsToMarketFullTextSearchMedispan(string searchString)
        {
            var queryResult = _db.spNewDrugsToMarket_FullTextMS(searchString).ToList();
            return queryResult;
        }

        public List<spNewDrugsToMarket_Medispan_Get_Result> GetNewDrugsToMarketMedispan(DateTime? fromDate, DateTime? thruDate, string drugType, string gpiId)
        {
            var result = _db.spNewDrugsToMarket_Medispan_Get(fromDate, thruDate, drugType, gpiId).ToList();
            return result;
        }
    }
}
