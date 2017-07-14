using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.ViewModels.SummaryVM
{
    public class SummaryConfigPaStVM
    {
        public long summaryReportConfigSectionSK { get; set; }

        [JsonProperty(PropertyName = "SumRptOrgBySK")]
        public long SumRptOrgBySK { get; set; }
    }
}