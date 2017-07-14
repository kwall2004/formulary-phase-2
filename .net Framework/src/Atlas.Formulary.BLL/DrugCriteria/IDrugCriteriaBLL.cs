using Atlas.Core.DAL.Models.Containers;
using Atlas.Formulary.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.BLL.DrugCriteria
{
    /// <summary>
    /// Business logic for drug criteria.
    /// </summary>
    /// <remarks>
    /// Drug criteria are the parts that make up a drug category.
    /// Drug categories are also comonly refered to as rules. 
    /// </remarks>
    public interface IDrugCriteriaBLL
    {
        /// <summary>
        /// Get's all the criteria for a drug category. 
        /// </summary>
        /// <param name="drugCategorySK"></param>
        /// <returns></returns>
        QueryResult<Criteria> GetCriteriaForDrugCategorySK(long drugCategorySK);
    }
}
