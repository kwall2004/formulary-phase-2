using Atlas.Core.DAL.Models.Containers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Reference.BLL.Services
{
    public class EtcHelpers : IEtcHelpers
    {
        /// <summary>
        /// Removes all queries with operation exclude from passed in collection and 
        /// returns a bool if in either Medispan or FDB druglist
        /// </summary>
        /// <param name="queries"></param>
        /// <param name="i"></param>
        /// <returns></returns>
        public bool CheckIfInDrugList(ref List<Core.DAL.Models.Containers.Criteria> queries, int i)
        {
            bool result = true;

            if (queries == null)
            {
                throw new ArgumentException("Argument queries cannot be null!");
            }

            
            
            List<Criteria> exempts = queries.Where(q => q.Operator == "exclude").ToList();

            
            queries = queries.Except(exempts).ToList();
              

            return result;
        }
    }
}
