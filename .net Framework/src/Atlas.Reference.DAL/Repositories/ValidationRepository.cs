using Atlas.Core.DAL.Repositories;
using Atlas.Reference.DAL.Models;
using Atlas.Reference.DAL.Repositories.Interfaces;
using Atlas.Reference.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Reference.DAL.Repositories
{
    public class ValidationRepository : EFRepositoryBase<ETC, ReferenceEntities>, IValidationRepository
    {
        public ValidationRepository(ReferenceEntities db) : base(db)
        {

        }

        public ValidationVM ValidateETC(int ETC)
        {
            var result = new ValidationVM { IsValid = false };
            var queryResult = _db.ETC.FirstOrDefault(a => a.ETC_ID == ETC);
            if (queryResult != null)
            {
                result.ID = queryResult.ETC_ID.ToString();
                result.Name = queryResult.ETC_NAME;
                result.IsValid = true;
            }
            return result;
        }

        public ValidationVM ValidateGCN(long GCN)
        {
            var result = new ValidationVM { IsValid = false };
            var queryResult = _db.GCN.FirstOrDefault(a => a.GCN_SEQNO == GCN);
            if (queryResult != null)
            {
                result.ID = queryResult.GCN_SEQNO.ToString();
                result.Name = queryResult.GNN60;
                result.IsValid = true;
            }
            return result;
        }

        public ValidationVM ValidateGPI(string GPI)
        {
            var result = new ValidationVM { IsValid = false };
            var queryResult = _db.GPI.FirstOrDefault(a => a.GPI1 == GPI);
            if (queryResult != null)
            {
                result.ID = queryResult.GPI1.ToString();
                result.Name = queryResult.GPI_Name;
                result.IsValid = true;
            }
            return result;
        }

        public ValidationVM ValidateMedId(long MedId)
        {
            var result = new ValidationVM { IsValid = false };
            var queryResult = _db.MedId.FirstOrDefault(a => a.MedId1 == MedId);
            if (queryResult != null)
            {
                result.ID = queryResult.MedId1.ToString();
                result.Name = queryResult.MedIdDesc;
                result.IsValid = true;
            }
            return result;
        }

        public List<NdcSearchVM> ValidateNDC(string NDCs, string dataSource)
        {
            string[] ndcArray = NDCs.Split(',');
            List<NdcSearchVM> returnResults = new List<NdcSearchVM>();

            foreach (var ndc in ndcArray)
            {
                var result = new NdcSearchVM();
                result.ID = ndc;

                if (ndc.Length != 11)
                {
                    result.IsValid = false;
                    result.Name = string.Empty;
                }
                else
                {
                    if (dataSource == "FDB")
                    {
                        var queryResultFdb = _db.FDBDrugList.FirstOrDefault(a => a.NDC == ndc);
                        result.IsValid = queryResultFdb != null ? true : false;
                        result.Name = queryResultFdb != null ? queryResultFdb.LabelName : string.Empty;
                    }
                    else if (dataSource == "Medispan")
                    {
                        var queryResultMedispan = _db.MedispanDrugList.FirstOrDefault(a => a.NDC == ndc);
                        result.IsValid = queryResultMedispan != null ? true : false;
                        result.Name = queryResultMedispan != null ? queryResultMedispan.LabelName : string.Empty;
                    }
                }
                returnResults.Add(result);
            }

            return returnResults;
        }
    }
}
