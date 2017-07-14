using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Reference.BLL.Services
{
    public interface IEtcHelpers
    {

        bool CheckIfInDrugList(ref List<Core.DAL.Models.Containers.Criteria> queries, int i);

    }
}
