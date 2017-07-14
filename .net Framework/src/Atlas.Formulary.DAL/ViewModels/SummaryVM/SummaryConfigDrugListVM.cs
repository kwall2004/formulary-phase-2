using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.ViewModels.SummaryVM
{
    public class SummaryConfigDrugListVM
    {
        public long summaryReportConfigSectionSK { get; set; }

        [JsonProperty(PropertyName = "SumRptOrgBySK")]
        public long SumRptOrgBySK { get; set; }

        [JsonProperty(PropertyName = "SumRptDrugSortBy")]
        public long SumRptDrugSortBy { get; set; }

        [JsonProperty(PropertyName = "SumRptOTCSK")]
        public long SumRptOTCSK { get; set; }

        [JsonProperty(PropertyName = "ColumnOneHeading")]
        public string ColumnOneHeading { get; set; }

        [JsonProperty(PropertyName = "ColumnTwoHeading")]
        public string ColumnTwoHeading { get; set; }

        [JsonProperty(PropertyName = "ColumnThreeHeading")]
        public string ColumnThreeHeading { get; set; }

        [JsonProperty(PropertyName = "ColumnFourHeading")]
        public string ColumnFourHeading { get; set; }
    }
}