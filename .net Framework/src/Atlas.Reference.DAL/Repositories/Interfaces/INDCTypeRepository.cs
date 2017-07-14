using Atlas.Core.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Atlas.Reference.DAL.Models;

namespace Atlas.Reference.DAL.Repositories.Interfaces
{
    public interface INDCTypeRepository:IRepository<NDCType>
    {
        NDCType GetNdcType(string ndcTypeName);
    }
}
