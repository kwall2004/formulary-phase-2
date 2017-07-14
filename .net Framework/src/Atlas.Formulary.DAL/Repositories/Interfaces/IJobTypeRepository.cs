using System;
using System.Collections.Generic;

namespace Atlas.Formulary.DAL.Repositories.Interfaces
{
    public interface IJobTypeRepository : IDisposable
    {
        List<object> Get();
    }
}
