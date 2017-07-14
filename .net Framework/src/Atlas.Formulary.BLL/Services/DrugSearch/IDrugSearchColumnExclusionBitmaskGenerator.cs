using Atlas.Core.DAL.Models.Containers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.BLL.Services.DrugSearch
{
    /// <summary>
    /// Utility service for drug search column exculsions bit mask generation. 
    /// </summary>
    public interface IDrugSearchColumnExclusionBitmaskGenerator
    {
        /// <summary>
        /// Generates bitmask that's passed to drug search stored proc to determine which columns
        /// group by. 
        /// </summary>
        /// <param name="queries"></param>
        /// <param name="defaultBitmask"></param>
        /// <returns></returns>
        /// <remarks>
        /// Removes all queries with operation exclude from passed in collection and returns mutated collection.
        /// </remarks>
        long GenerateBitmask(List<Criteria> includes);
    }
}
