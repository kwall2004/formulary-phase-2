using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Core.DAL.Models.Containers
{
    public class QueryResult<T>
    {
        public int Count { get; set; }
        public List<T> Rows { get; set; }

        public QueryResult()
        {
           Rows = new List<T>();
        }
    }
}
