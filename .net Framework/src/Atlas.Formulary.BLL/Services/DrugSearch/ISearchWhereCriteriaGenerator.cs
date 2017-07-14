using Atlas.Core.DAL.Models.Containers;
using Atlas.Formulary.DAL.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.BLL.Services.DrugSearch
{
    /// <summary>
    /// Utility service that builds an SQL where clause from a collection of
    /// Criteria.
    /// </summary>
    public interface ISearchWhereCriteriaGenerator
    {
        /// <summary>
        /// Builds an SQL where clause from a collection of Criteria.
        /// </summary>
        /// <param name="criteria"></param>
        /// <returns></returns>
        string BuildDrugSearchWhereQuery(List<Criteria> criteria, DataSourceEnum dataSource);
    }
}
