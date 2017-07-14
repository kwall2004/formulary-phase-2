using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.ViewModels
{
    public class SummaryConfigReportPutVM
    {
        public long SummaryReportConfigSK { get; set; }
        public string SectionSortOrderList { get; set; }
        public string SumRptCfgName { get; set; }
        public string SumRptCfgDesc { get; set; }
        public long FileFmtSK { get; set; }
        public long LangSK { get; set; }
        public long FontSizeSK { get; set; }
        public bool InclUMInd { get; set; }
        public bool InclNotCvrdInd { get; set; }
        public long TierDisplSK { get; set; }

    }
}

