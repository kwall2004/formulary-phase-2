using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Atlas.Formulary.DAL.Repositories.Interfaces
{
    public interface IFormularyRepository : IRepository<Frmlry>
    {

        IQueryable<spFormulary_GetAccess_Result> GetAccess(long FormularySK);
        IQueryable<spFormulary_GetDrugLists_Result> GetDrugLists(long FormularySK);

        IQueryable<spFormulary_PutDrugLists_Result> PutDrugLists(long FormularySK, string DrugListNames, string UserId);

        spFormulary_GetHeader_Result GetHeader(long FormularySK);
        IQueryable<spFormulary_GetTierNames_Result> GetTierNames(long FormularySK);

        long PutFormularyHeader(Nullable<long> frmlrySK,
                                  Nullable<long> lOBSK,
                                  Nullable<long> drugThrputcClsTypeSK,
                                  Nullable<long> drugRefDbSK,
                                  Nullable<int> drugPostObsltAlwdDays,
                                  string frmlryName,
                                  DateTime efctvStartDt,
                                  DateTime efctvEndDt,
                                  string planType,
                                  string drugTypeFn,
                                  bool? isExcludeOTC,
                                  string userId,
                                  string drugListName_List,
                                  string tierName_List,
                                  Nullable<long> ownerUserGrpSk,
                                  string accessUserGrpSk_List,
                                  Nullable<System.DateTimeOffset> inctvTs,
                                  Nullable<System.DateTimeOffset> delTs, 
                                  bool autoAddNewDrugs,
                                  long? summaryReportConfigSK);

        List<spFormulary_GetAll_Result> GetAll();

        List<spFormulary_FullTextSearch_Result> FormularyFullSearch(string searchString);

        void DeleteFormulary(long formularySK);

        int FormularyValidation(long formularySK);

        long CopyOrUpdateVersion(int formularySK_From, bool isNewVersion, string userId);

        void DashboardFormularyApprove(int formularySk, int ApprvlTypePrty, string AprvlNotes ,string userId);
        void DashboardFormularyReject(DashboardVM parms);
        List<FrmlryNotes> GetFormularyNotes(long formularySK);

        void ConvertRulesToMedId(long formularySK, string userId);

        void CombineFormularyRules(long formularySK, string userId);

        List<spFormulariesForNDC_Get_Result> GetFormulariesByNDC(string NDC);

        long PutFormularyNotes(FormularyNotesVM data, string userId);

        void DeleteFormularyNotes(long formularyNoteSK);

        List<StatType> GetStatTypes();

    }

}
