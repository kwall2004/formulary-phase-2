using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EntityFrameworkExtras.EF6;

namespace Atlas.Formulary.DAL.Models.Containers
{
    [UserDefinedTableType("CriteriaDetailTableType")]
    public class CriteriaDetailTableType
    {
        [UserDefinedTableTypeColumn(1)]
        public string ValQulfrCode { get; set; }
        [UserDefinedTableTypeColumn(2)]
        public string OperTypeCode { get; set; }
        [UserDefinedTableTypeColumn(3)]
        public int CrtriaPrity { get; set; }
        [UserDefinedTableTypeColumn(4)]
        public string CrtriaVal { get; set; }
    }
}
