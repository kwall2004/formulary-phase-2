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
    public interface IDrugListRepository : IRepository<spFormularyImport_Put_Result>
    {
        long SetDrugListHeader(DrugListHeaderVM data);
        List<spDrugList_GetHeader_Result> GetDrugListHeader(long drugListSK);
        long CopyDrugList(long drugListSK, string userId);
        long DeleteDrugList(long drugListSK);
        List<spDrugList_GetAll_Result> GetAllDrugLists(bool includeInactive);
        List<spDrugList_GetFormularies_Result> GetFormulariesByDrugList(long drugListSK);
        List<spDrugList_FullTextSearch_Result> DrugListFullTextSearch(string searchString);
        void SetDrugListDetailCriteriaGroup(DrugListDtlCrtriaGrpSP data);
        List<spDrugListDtlCrtriaGrp_Get_Result> GetDrugListDetailCriteriaGroup(long drugListDetailSK);
        List<spDrugListDtl_GetAllPaged_Result> GetDrugListsDetailPaged(long drugListSK, bool isNewRequest, int startIndex,
                int count, string userId, Guid sessionId);
        void DeleteDrugListDetail(long DrugListDetailSK);
        void ActivateDrugList(long drugListSK, string userId);


    }
}
