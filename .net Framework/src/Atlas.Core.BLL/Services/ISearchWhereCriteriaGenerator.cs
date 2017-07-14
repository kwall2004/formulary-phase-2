using Atlas.Core.DAL.Models.Containers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Core.BLL.Services
{
    public interface ISearchWhereCriteriaGenerator
    {
        string BuildSearchWhereQuery(List<Criteria> criteria);
    }
}
