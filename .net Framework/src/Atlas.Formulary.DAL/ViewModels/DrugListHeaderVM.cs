using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.ViewModels
{
    public class DrugListHeaderVM
    {
        public long? DrugListSK { get; set; }
        public long? LOBSK { get; set; }
        public long? DrugRefDBSK { get; set; }
        public string DrugListName { get; set; }
        public bool? AutomaticallyAssignNewNDCsInd { get; set; }
        public int? DrugPostObsltAlwdDays { get; set; }
        public DateTime? EfctvStartDt { get; set; }
        public DateTime? EfctvEndDt { get; set; }
        public DateTimeOffset? InactiveTimestamp { get; set; }
        public DateTimeOffset? DeleteTimestamp { get; set; }
        public string UserId { get; set; }

        public Guid? SessionId { get; set; }
    }
}
