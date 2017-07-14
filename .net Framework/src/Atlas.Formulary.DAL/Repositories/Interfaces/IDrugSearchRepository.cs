using Atlas.Core.DAL.Models.Containers;
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
    public interface IDrugSearchRepository : IRepository<FDBDrugList>
    {
        List<spDrugListSearchFDBv5_Result> DrugListSearchFDB(string whereCriteria, string etcId, long bitmask, long? formularySK, string orderByClasue, int? startIndex, int? count, string userId, bool? criteriaChange, Guid? sessionId, long? drugListSK, long? drugCatgSK, long? coveragePropertyProgramSK);

        List<spFullTextDrugSearchExt_FDB_Result> SmartDrugSearchFDB(string smartDrugSearchFilter, long? smartDrugSearchColumnSK);

        List<spFullTextDrugSearchExt_MS_Result> SmartDrugSearchMS(string smartDrugSearchFilter, long? smartDrugSearchColumnSK);

        List<spFullTextDrugSearchExt_Frmlry_Result> SmartDrugSearchFormulary(string smartDrugSearchFilter, long? frmlrySK, long? smartDrugSearchColumnSK);

        List<spFullTextDrugSearchExt_DrugList_Result> SmartDrugSearchDrugList(string smartDrugSearchFilter, long? drugListSK, long? smartDrugSearchColumnSK);

        List<spETCHierarchy_Get_Result> FormularyTreeSearch();

        List<spDrugCatgCrtriaGrp_Get_Result> GetFormularyRule(int DrugCategoryID);

        List<spMissingNDCGCN_Search_Result> MissingNDCGCNSearch(string searchString);

        List<spMissingNDCGPI_Search_Result> MissingNDCGpiSearch(string searchString);

        List<spMissingNDCMedispan_Search_Result> MissingNDCMedispanSearch(string searchString);

        List<spMissingNDCFDB_Search_Result> MissingNDCFdbSearch(string searchString);

        List<spGPIHierarchy_Get_Result> GetGPIHierarchy();

        List<spDrugListSearchMedispanV2_Result> DrugListSearchMedispan(string whereCriteria, string gpiId, long bitmask, long? formularySK, string orderByClasue, int? startIndex, int? count, string userId, bool? criteriaChange, Guid? sessionId, long? drugListSK, long? drugCatgSK, long? coveragePropertyProgramSK);

        List<spFullTextDrugSearchExt_FrmlryMS_Result> SmartFormularyConfigSearchMedispan(string searchString, long? drugListSK, long? smartSearchFieldSK);

        List<spFullTextDrugSearchExt_DrugListMS_Result> SmartDrugListSearchMedispan(string searchString, long? drugListSK, long? smartSearchFieldSK);
    }
}
