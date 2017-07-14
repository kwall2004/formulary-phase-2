using Atlas.Core.DAL.Models.Containers;
using Atlas.Formulary.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.BLL.DrugCategory
{
    /// <summary>
    /// Business logic for drug categories.
    /// </summary>
    /// <remarks>
    /// Drug categories are also commonly refered to as rules. 
    /// </remarks>
    public interface IDrugCategoryBLL
    {
        /// <summary>
        /// Gets all drug categories related to a formulary. 
        /// </summary>
        /// <param name="formularySK"></param>
        /// <returns></returns>
        QueryResult<DrugCategoryVM> GetDrugCategoriesByFormularySK(long formularySK);
    }
}
