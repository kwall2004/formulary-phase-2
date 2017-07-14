using System;
using System.Collections.Generic;

namespace Atlas.Formulary.DAL.Repositories.Interfaces
{
    public interface IJobStatTypeRepository : IDisposable
    {
        List<object> Get();
    }
}
