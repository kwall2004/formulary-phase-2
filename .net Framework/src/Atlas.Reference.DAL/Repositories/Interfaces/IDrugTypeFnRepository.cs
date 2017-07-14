using Atlas.Core.DAL.Repositories;
using Atlas.Reference.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Reference.DAL.Repositories.Interfaces
{
    public interface IDrugTypeFnRepository : IRepository<DrugTypeFn>
    {
        List<DrugTypeFn> GetDrugTypeFns(long drugRefDbSK);
    }
}
