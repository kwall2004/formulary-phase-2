using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.ViewModels.SummaryVM
{
    public class SummaryConfigTitleVM
    {
        public long summaryReportConfigSectionSK { get; set; }

        [JsonProperty(PropertyName = "DefaultTitlePagePath")]
        public string DefaultTitlePagePath { get; set; }
    }
}