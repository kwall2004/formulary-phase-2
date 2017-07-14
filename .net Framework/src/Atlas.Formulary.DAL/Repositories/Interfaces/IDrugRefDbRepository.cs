using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Models;
using System.Collections.Generic;

namespace Atlas.Formulary.DAL.Repositories.Interfaces
{
    public interface IDrugRefDbRepository : IRepository<DrugRefDb>
    {
        List<DrugRefDb> Get();
    }
}
