using Atlas.Core.DAL.Repositories;
using Atlas.Reference.DAL.Models;
using Atlas.Reference.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Reference.DAL.Repositories.Interfaces
{
    public interface IValidationRepository : IRepository<ETC>
    {
        ValidationVM ValidateETC(int ETC);
        ValidationVM ValidateGCN(long GCN);
        ValidationVM ValidateGPI(string GPI);
        ValidationVM ValidateMedId(long MedId);
        List<NdcSearchVM> ValidateNDC(string NDCs, string dataSource);
    }
}
