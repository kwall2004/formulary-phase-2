using Atlas.Configuration;
using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.Repositories.Interfaces;
using Atlas.Formulary.DAL.ViewModels;
using Atlas.Reference.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.Repositories
{
    public class NDCRepository : EFRepositoryBase<NDCNote, FormularyEntities>, INDCRepository
    {
        public NDCRepository(IConfig config, FormularyEntities db) : base(config, db) { }
        
        public List<spNDCNotes_GetAll_Result> GetAll(string NDC)
        {
            var queryResult = _db.spNDCNotes_GetAll(NDC);
            var results = queryResult.ToList();
            return results;
        }



        public long PutNDCNotes(NDCNoteVM NDC)
        {
            
                var result = (_db.spNDCNotes_Put(NDC.NDCNoteSK, NDC.NDC, NDC.UserId, NDC.NDCNotes)).ToList();

                if (result.First().ErrorNumber != 0)
                {
                    throw new Exception(result.First().ErrorMessage.ToString());
                }

            return result.First().ErrorSeverity.Value;     
        }

        public List<spFDBClinicalData_Get_Result> GetFdbClinicalData(string NDC)
        {
            var result = _db.spFDBClinicalData_Get(NDC).ToList();
            return result;
        }

    }
}
