using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Models;
using Atlas.Reference.DAL.Models;
using Atlas.Reference.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.Repositories.Interfaces
{
    public interface ICustomNdcRepository : IRepository<FDBDrugList>
    {
        List<spCustomNDC_GetFormularies_Result> GetFormulariesByNDC(string NDC);
        List<spNDCChangeHistory_GetAll_Result> GetAllNDCChangeHistory(string NDC);
        void DeleteMissingNDC(string NDC, string dataSource);
        void DeleteCustomNDC(string NDC);
        void PutCustomNDC(CustomNdc request);
    }
}
