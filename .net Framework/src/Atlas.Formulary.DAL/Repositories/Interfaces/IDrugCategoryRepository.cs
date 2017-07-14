using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.Models.Containers;
using Atlas.Formulary.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.Repositories.Interfaces
{
    public interface IDrugCategoryRepository : IRepository<DrugCatg>
    {
        List<spCoverageProperties_Get_Result> GetCoverageProperties(long drugCategoryID);
        int SetCoverageProperties(spCoverageProperties_Get_Result drugCoverage);
        List<spDrugCatgCrtriaGrp_Get_Result> GetDrugCategoryCriteria(long DrugCategoryID);
        void SetDrugCategoryCriteria(DrugCatgCrtriaGrpSP drugCategoryCriteria);
        List<spDrugCatg_GetAll_Result> GetAllDrugCategories(long formularySK);

        void DeleteDrugCategory(long drugCategorySk);

        List<spDrugCatg_GetAllPaged_Result> DrugCategoryPaged(PagedRequestVM pagedRequest, string userId, Guid sessionId);
        void CacheDrugCategory(long drugCategorySk, long formularyTierSK);

    }
}
