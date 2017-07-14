using System;
using System.Collections.Generic;

namespace Atlas.Formulary.DAL.Repositories.Interfaces
{
    public interface IDrugRefDbValQulfrTypeRepository : IDisposable
    {
        List<object> Get(long? drugRefDbSk);
    }
}
