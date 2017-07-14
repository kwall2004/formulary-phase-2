using Atlas.Configuration;
using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.Repositories.Interfaces;
using Atlas.Formulary.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EntityFrameworkExtras.EF6;
using Atlas.Formulary.DAL.Models.Containers;
using System.Data.SqlClient;

namespace Atlas.Formulary.DAL.Repositories
{
    public class DrugListRepository : EFRepositoryBase<spFormularyImport_Put_Result, FormularyEntities>, IDrugListRepository
    {
        public DrugListRepository(IConfig config, FormularyEntities db) : base(config, db) { }

        public long SetDrugListHeader(DrugListHeaderVM data)
        {
            var result = _db.spDrugList_PutHeader(data.DrugListSK,
                                                  data.LOBSK,
                                                  data.DrugRefDBSK,
                                                  data.DrugListName,
                                                  data.DrugPostObsltAlwdDays,
                                                  data.AutomaticallyAssignNewNDCsInd,
                                                  data.EfctvStartDt,
                                                  data.EfctvEndDt,
                                                  data.InactiveTimestamp,
                                                  data.DeleteTimestamp,
                                                  data.UserId).ToList();
            if (result.First().ErrorNumber != 0)
            {
                throw new Exception(result.First().ErrorMessage.ToString());
            }
            return result.First().ErrorSeverity.HasValue ? result.First().ErrorSeverity.Value : data.DrugListSK.Value;
        }

        public List<spDrugList_GetHeader_Result> GetDrugListHeader(long drugListSK)
        {
            var result = _db.spDrugList_GetHeader(drugListSK).ToList();
            return result;
        }

        public long CopyDrugList(long drugListSK, string userId)
        {
            var result = _db.spDrugListCopy_Put(drugListSK, userId).ToList();
            if (result.First().ErrorNumber != 0)
            {
                throw new Exception(result.First().ErrorMessage.ToString());
            }
            return result.First().ErrorSeverity.HasValue ? result.First().ErrorSeverity.Value : drugListSK;
        }

        public long DeleteDrugList(long drugListSK)
        {
            var drugList = new DrugListHeaderVM { DrugListSK = drugListSK, DeleteTimestamp = DateTimeOffset.Now, UserId = "TheBatman" }; //temp because this fails without a userId
            return SetDrugListHeader(drugList);
        }

        public List<spDrugList_GetAll_Result> GetAllDrugLists(bool includeInactive)
        {
            var result = _db.spDrugList_GetAll(includeInactive).ToList();
            return result;
        }

        public List<spDrugList_GetFormularies_Result> GetFormulariesByDrugList(long drugListSK)
        {
            var result = _db.spDrugList_GetFormularies(drugListSK).ToList();
            return result;
        }

        public List<spDrugList_FullTextSearch_Result> DrugListFullTextSearch(string searchString)
        {
            var result = _db.spDrugList_FullTextSearch(searchString).ToList();
            return result;
        }

        public List<spDrugListDtl_GetAllPaged_Result> GetDrugListsDetailPaged(long drugListSK, bool isNewRequest, int startIndex,
                int count, string userId, Guid sessionId)
        {
            var result = _db.spDrugListDtl_GetAllPaged(drugListSK, isNewRequest, startIndex, count, userId, sessionId).ToList();
            return result;
        }

        public void SetDrugListDetailCriteriaGroup(DrugListDtlCrtriaGrpSP data)
        {
            _db.Database.ExecuteStoredProcedure(data);
        }

        public List<spDrugListDtlCrtriaGrp_Get_Result> GetDrugListDetailCriteriaGroup(long drugListDetailSK)
        {
            var result = _db.spDrugListDtlCrtriaGrp_Get(drugListDetailSK).ToList();
            return result;
        }

        public void DeleteDrugListDetail(long DrugListDetailSK)
        {
            var result = _db.spDrugListDtl_DeleteOne(DrugListDetailSK);
            if(result.First().ErrorNumber != 0)
            {
                throw new Exception(result.First().ErrorMessage);
            }
        }

        public void ActivateDrugList(long drugListSK, string userId)
        {
            _db.spDrugList_Finish(drugListSK, userId);            
        }

    }
};
