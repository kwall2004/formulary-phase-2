using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Models;
using Atlas.Reference.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.Repositories.Interfaces
{
    public interface INewDrugsToMarketRepository : IRepository<FDBDrugList>
    {
        List<spNewDrugsToMarket_Get_Result> GetAllNewDrugsToMarket(DateTime? fromDate, DateTime? thruDate, string drugType, int? etcId);
        List<spFrmlryForNDC_GetAll_Result> GetAllFormulariesByNDC(string NDC);
        List<spNewDrugsToMarket_FullText_Result> GetNewDrugsToMarketFullTextSearch(string searchString);
        List<spNewDrugsToMarket_FullTextMS_Result> GetNewDrugsToMarketFullTextSearchMedispan(string searchString);
        List<spNewDrugsToMarket_Medispan_Get_Result> GetNewDrugsToMarketMedispan(DateTime? fromDate, DateTime? thruDate, string drugType, string gpiId);
    }
}
