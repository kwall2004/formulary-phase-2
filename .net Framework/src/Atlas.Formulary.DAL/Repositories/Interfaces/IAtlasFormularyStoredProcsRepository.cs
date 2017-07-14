using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.Repositories.Interfaces
{
    public interface IAtlasFormularyStoredProcsRepository : IRepository<object>
    {
        IQueryable<spFormulary_GetAccess_Result> GetAccess(int FormularyId);
        IQueryable<spFormulary_GetDrugLists_Result> GetDrugLists(int FormularyId);
        IQueryable<spFormulary_GetHeader_Result> GetHeader(int FormularyId);
        IQueryable<spFormulary_GetTierNames_Result> GetTierNames(int FormularyId);

        int PutFormularyHeader(Nullable<long> frmlrySK, 
                                  Nullable<long> lOBSK, 
                                  Nullable<long> drugThrputcClsTypeSK, 
                                  Nullable<long> drugRefDbSK, 
                                  Nullable<int> drugPostObsltAlwdDays, 
                                  string frmlryName,
                                  Nullable<System.DateTime> efctvStartDt,
                                  Nullable<System.DateTime> efctvEndDt, 
                                  string planType, 
                                  string drugTypeFn, string userId, 
                                  string drugListName_List, 
                                  string tierName_List, 
                                  Nullable<long> ownerUserGrpSk,
                                  string accessUserGrpSk_List,
                                  Nullable<System.DateTimeOffset> inctvTs, 
                                  Nullable<System.DateTimeOffset> delTs);

    }
}
