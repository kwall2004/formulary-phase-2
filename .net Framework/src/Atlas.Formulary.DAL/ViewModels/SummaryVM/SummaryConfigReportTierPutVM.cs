using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.ViewModels.SummaryVM
{
    public class SummaryConfigReportTierPutVM
    {
        public long SummaryConfigReportSK { get; set; }
        public long FormularySK { get; set; }
        public string FormularyTierSelectedList { get; set; }
        public string TierDescList { get; set; }
    }
}
