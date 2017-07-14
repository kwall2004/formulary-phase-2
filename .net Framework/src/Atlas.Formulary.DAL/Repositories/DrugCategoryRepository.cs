using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Formulary.DAL.ViewModels;
using Atlas.Formulary.DAL.Models.Containers;
using System.Data.Entity;
using EntityFrameworkExtras.EF6;
using Atlas.Configuration;
using Atlas.Core.WebApi.Models.Requests;

namespace Atlas.Formulary.DAL.Repositories
{
    public class DrugCategoryRepository : EFRepositoryBase<DrugCatg, FormularyEntities>, IDrugCategoryRepository
    {

        public DrugCategoryRepository(IConfig config, FormularyEntities db) : base(config, db) { }

        public List<spCoverageProperties_Get_Result> GetCoverageProperties(long drugCategoryID)
        {
            var queryResult = _db.spCoverageProperties_Get(drugCategoryID);
            var result = queryResult.ToList();
            return result;
        }

        public int SetCoverageProperties(spCoverageProperties_Get_Result drugCoverage)
        { 
            var queryResult = _db.spCoverageProperties_Put(
                                drugCoverage.DrugCatgSK,
                                drugCoverage.IsCovered,
                                drugCoverage.IsOverrideGenericCheck,
                                drugCoverage.IsSpeciality,
                                drugCoverage.IsRestrictToPkgSize,
                                drugCoverage.IsMedicaidCarveOut,
                                drugCoverage.IsMedicaidFeeScreen,
                                drugCoverage.IsMaintenanceDrug,
                                drugCoverage.ExtendedDaysSupply,
                                drugCoverage.PAInd,
                                drugCoverage.PAMinAge,
                                drugCoverage.PAMaxAge,
                                drugCoverage.PAAgeLimitType,
                                drugCoverage.PAName,
                                drugCoverage.IsSTRequired,
                                drugCoverage.StepTherapyName,
                                drugCoverage.MaxFillQty,
                                drugCoverage.MaxFillPerPeriod,
                                drugCoverage.MaxFillPeriodType,
                                drugCoverage.QLFillQty,
                                drugCoverage.QLFillPerPeriod,
                                drugCoverage.QLFillPeriodType,
                                drugCoverage.DaysSupplyFillQty,
                                drugCoverage.DaysSupplyFillPerPeriod,
                                drugCoverage.DaysSupplyPeriodType,
                                drugCoverage.Gender,
                                drugCoverage.AgeLimitMin,
                                drugCoverage.AgeLimitMax,
                                drugCoverage.AgeLimitType,
                                drugCoverage.MaleAgeLimitMin,
                                drugCoverage.MaleAgeLimitMax,
                                drugCoverage.MaleAgeLimitType,
                                drugCoverage.FemaleAgeLimitMin,
                                drugCoverage.FemaleAgeLimitMax,
                                drugCoverage.FemaleAgeLimitType,
                                drugCoverage.PDLStatus,
                                drugCoverage.PDFMessage,
                                drugCoverage.UserNotes,
                                drugCoverage.UserId);


            return queryResult;
        }

        public List<spDrugCatgCrtriaGrp_Get_Result> GetDrugCategoryCriteria(long DrugCategoryID)
        {
            var queryResult = _db.spDrugCatgCrtriaGrp_Get(DrugCategoryID);
            var result = queryResult.ToList();
            return result;
        }
        public void SetDrugCategoryCriteria(DrugCatgCrtriaGrpSP drugCategoryCriteria)
        {
            _db.Database.ExecuteStoredProcedure(drugCategoryCriteria);
        }

        public List<spDrugCatg_GetAll_Result> GetAllDrugCategories(long formularySK)
        {
            var queryResult = _db.spDrugCatg_GetAll(formularySK).ToList();
            return queryResult;
        }

        public void DeleteDrugCategory(long drugCategorySk)
        {
            var queryResult = _db.spDrugCatg_CascadeDelete(drugCategorySk).FirstOrDefault();

            if (queryResult.ErrorNumber != 0)
            {
                throw new Exception(queryResult.ErrorMessage.ToString());
            }

            return;
        }

        public List<spDrugCatg_GetAllPaged_Result> DrugCategoryPaged(PagedRequestVM pagedRequest, string userId, Guid sessionId)
        {

            var queryResult = _db.spDrugCatg_GetAllPaged(pagedRequest.FormularySK, 
                                                         pagedRequest.IsNewRequest, 
                                                         pagedRequest.StartIndex, 
                                                         pagedRequest.Count, 
                                                         userId,
                                                         sessionId).ToList();
            return queryResult;
        }

        public void CacheDrugCategory(long drugCategorySk, long formularyTierSK)
        {
            _db.spFormularyCache_UpdateRuleV2(drugCategorySk, formularyTierSK);
        }
    }
}
