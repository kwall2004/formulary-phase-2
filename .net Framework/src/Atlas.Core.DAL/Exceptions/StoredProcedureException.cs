using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Core.DAL.Exceptions
{
    public class StoredProcedureException : Exception
    {
        public StoredProcedureException(string message) : base(message) { }
    }
}
