using Atlas.Configuration;
using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.Repositories.Interfaces;
using Atlas.Reference.DAL.Models;
using Atlas.Reference.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.Repositories
{
    public class CustomNdcRepository : EFRepositoryBase<FDBDrugList, FormularyEntities>, ICustomNdcRepository
    {
        public CustomNdcRepository(IConfig config, FormularyEntities db) : base(config, db) { }

        public List<spCustomNDC_GetFormularies_Result> GetFormulariesByNDC(string NDC)
        {
            var result = _db.spCustomNDC_GetFormularies(NDC).ToList();
            return result;
        }

        public List<spNDCChangeHistory_GetAll_Result> GetAllNDCChangeHistory(string NDC)
        {
            var result = _db.spNDCChangeHistory_GetAll(NDC).ToList();
            return result;
        }

        public void DeleteMissingNDC(string NDC, string dataSource)
        {
            var result = _db.spMissingNDC_Delete(NDC, dataSource).ToList();
            if(result.FirstOrDefault().ErrorNumber != 0)
            {
                throw new Exception(result.FirstOrDefault().ErrorMessage);
            }
        }

        public void DeleteCustomNDC(string NDC)
        {
            var result = _db.spCustomNDC_Delete(NDC).ToList();
            if (result.FirstOrDefault().ErrorNumber != 0)
            {
                throw new Exception(result.FirstOrDefault().ErrorMessage);
            }
        }

        public void PutCustomNDC(CustomNdc request)
        {
            
            var result = _db.spCustomNDC_Update(request.DrugListSK, request.NDC, request.LabelName, request.UnitPrice, request.DateToMarket).FirstOrDefault();
            if (result.ErrorNumber != 0)
            {
                throw new Exception(result.ErrorMessage.ToString());
            }
            
           
        }
    }
}
