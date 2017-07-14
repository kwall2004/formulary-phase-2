using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.ViewModels;
using Atlas.Reference.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.Repositories.Interfaces
{
    public interface INDCRepository : IRepository<NDCNote>
    {
        List<spNDCNotes_GetAll_Result> GetAll(string NDC);

        long PutNDCNotes(NDCNoteVM NDC);

        List<spFDBClinicalData_Get_Result> GetFdbClinicalData(string NDC);
    }
}
