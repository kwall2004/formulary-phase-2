using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Configuration;
using Atlas.Reference.DAL.Models;

namespace Atlas.Formulary.DAL.Repositories
{
    public class DrugSearchRepository : EFRepositoryBase<FDBDrugList, FormularyEntities>, IDrugSearchRepository
    {

        public DrugSearchRepository(IConfig config, FormularyEntities db) : base(config, db) { }
        
        public List<spDrugListSearchFDBv5_Result> DrugListSearchFDB(string whereCriteria, string etcId, long bitmask, long? formularySK, string orderByClasue, int? startIndex, int? count, string userId, bool? criteriaChange, Guid? sessionId, long? drugListSK, long? drugCatgSK, long? coveragePropertyProgramSK)
        {
            var queryResult = _db.spDrugListSearchFDBv5(whereCriteria, bitmask, formularySK, orderByClasue, startIndex, count, userId, criteriaChange, etcId, sessionId, drugListSK, drugCatgSK, coveragePropertyProgramSK).ToList();
            var result = queryResult.ToList();
            return result;
        }

        public List<spETCHierarchy_Get_Result> FormularyTreeSearch()
        {
            var queryResult = _db.spETCHierarchy_Get();
            var result = queryResult.ToList();
            return result;
        }

        public List<spDrugCatgCrtriaGrp_Get_Result> GetFormularyRule(int DrugCategoryID)
        {
            var queryResult = _db.spDrugCatgCrtriaGrp_Get(DrugCategoryID);
            var result = queryResult.ToList();
            return result;
        }

        public List<spFullTextDrugSearchExt_FDB_Result> SmartDrugSearchFDB(string smartDrugSearchFilter, long? smartDrugSearchColumnSK)
        {
            var queryResult = _db.spFullTextDrugSearchExt_FDB(smartDrugSearchFilter, smartDrugSearchColumnSK);
            var result = queryResult.ToList();
            return result;
        }

        public List<spFullTextDrugSearchExt_MS_Result> SmartDrugSearchMS(string smartDrugSearchFilter, long? smartDrugSearchColumnSK)
        {
            var queryResult = _db.spFullTextDrugSearchExt_MS(smartDrugSearchFilter, smartDrugSearchColumnSK);
            var result = queryResult.ToList();
            return result;
        }

        public List<spFullTextDrugSearchExt_Frmlry_Result> SmartDrugSearchFormulary(string smartDrugSearchFilter, long? frmlrySK, long? smartDrugSearchColumnSK)
        {
            var queryResult = _db.spFullTextDrugSearchExt_Frmlry(smartDrugSearchFilter, frmlrySK, smartDrugSearchColumnSK);
            var result = queryResult.ToList();
            return result;
        }

        public List<spFullTextDrugSearchExt_DrugList_Result> SmartDrugSearchDrugList(string smartDrugSearchFilter, long? drugListSK, long? smartDrugSearchColumnSK)
        {
            var queryResult = _db.spFullTextDrugSearchExt_DrugList(smartDrugSearchFilter, drugListSK, smartDrugSearchColumnSK);
            var result = queryResult.ToList();
            return result;
        }

        public List<spMissingNDCGCN_Search_Result> MissingNDCGCNSearch(string searchString)
        {
            var queryResult = _db.spMissingNDCGCN_Search(searchString);
            var result = queryResult.ToList();
            return result;
        }

        public List<spMissingNDCGPI_Search_Result> MissingNDCGpiSearch(string searchString)
        {
            var queryResult = _db.spMissingNDCGPI_Search(searchString).ToList();
            return queryResult;
        }

        public List<spMissingNDCMedispan_Search_Result> MissingNDCMedispanSearch(string searchString)
        {
            var queryResult = _db.spMissingNDCMedispan_Search(searchString);
            var result = queryResult.ToList();
            return result;
        }

        public List<spMissingNDCFDB_Search_Result> MissingNDCFdbSearch(string searchString)
        {
            var queryResult = _db.spMissingNDCFDB_Search(searchString).ToList();
            return queryResult;
        }

        //TODO: find a better home for this during refactor
        public List<spGPIHierarchy_Get_Result> GetGPIHierarchy()
        {
            var queryResult = _db.spGPIHierarchy_Get().ToList();
            return queryResult;
        }

        public List<spDrugListSearchMedispanV2_Result> DrugListSearchMedispan(string whereCriteria, string gpiId, long bitmask, long? formularySK, string orderByClasue, int? startIndex, int? count, string userId, bool? criteriaChange, Guid? sessionId, long? drugListSK, long? drugCatgSK, long? coveragePropertyProgramSK)
        {
            var queryResult = _db.spDrugListSearchMedispanV2(whereCriteria, bitmask, formularySK, orderByClasue, startIndex, count, userId, criteriaChange, gpiId, sessionId, drugListSK, drugCatgSK, coveragePropertyProgramSK).ToList();
            var result = queryResult.ToList();
            return result;
        }

        
        public List<spFullTextDrugSearchExt_DrugListMS_Result> SmartDrugListSearchMedispan(string searchString, long? drugListSK, long? smartSearchFieldSK)
        {
            var queryResult = _db.spFullTextDrugSearchExt_DrugListMS(searchString, drugListSK, smartSearchFieldSK).ToList();
            return queryResult;
        }

        public List<spFullTextDrugSearchExt_FrmlryMS_Result> SmartFormularyConfigSearchMedispan(string searchString, long? drugListSK, long? smartSearchFieldSK)
        {
            var queryResult = _db.spFullTextDrugSearchExt_FrmlryMS(searchString, drugListSK, smartSearchFieldSK).ToList();
            return queryResult;
        }
    }
}
