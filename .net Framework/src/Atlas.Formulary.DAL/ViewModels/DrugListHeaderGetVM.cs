using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.ViewModels
{
    public class DrugListHeaderGetVM
    {
        public long DrugListSK { get; set; }
        public Nullable<long> LOBSK { get; set; }
        public string LOBName { get; set; }
        public long DrugRefDbSK { get; set; }
        public string DrugRefDbName { get; set; }
        public string DrugListName { get; set; }
        public int DrugPostObsltAlwdDays { get; set; }
        public bool AutomaticallyAssignNewNDCsInd { get; set; }
        public System.DateTime EfctvStartDt { get; set; }
        public System.DateTime EfctvEndDt { get; set; }
    }
}
