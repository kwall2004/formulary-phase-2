using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.ViewModels.SummaryVM
{
    public class SummaryConfigHeaderFooterVM
    {
        public long summaryReportConfigSectionSK { get; set; }

        [JsonProperty(PropertyName = "FormularyOwnerHeader")]
        public bool FormularyOwnerHeader { get; set; }

        [JsonProperty(PropertyName = "FormularyOwnerFooter")]
        public bool FormularyOwnerFooter { get; set; }

        [JsonProperty(PropertyName = "FormularyNameHeader")]
        public bool FormularyNameHeader { get; set; }

        [JsonProperty(PropertyName = "FormularyNameFooter")]
        public bool FormularyNameFooter { get; set; }

        [JsonProperty(PropertyName = "FormularyIdHeader")]
        public bool FormularyIdHeader { get; set; }

        [JsonProperty(PropertyName = "FormularyIdFooter")]
        public bool FormularyIdFooter { get; set; }

        [JsonProperty(PropertyName = "FormularyVersionHeader")]
        public bool FormularyVersionHeader { get; set; }

        [JsonProperty(PropertyName = "FormularyVersionFooter")]
        public bool FormularyVersionFooter { get; set; }

        [JsonProperty(PropertyName = "FormularyEffectiveDateHeader")]
        public bool FormularyEffectiveDateHeader { get; set; }

        [JsonProperty(PropertyName = "FormularyEffectiveDateFooter")]
        public bool FormularyEffectiveDateFooter { get; set; }

        [JsonProperty(PropertyName = "FormularyEndDateHeader")]
        public bool FormularyEndDateHeader { get; set; }

        [JsonProperty(PropertyName = "FormularyEndDateFooter")]
        public bool FormularyEndDateFooter { get; set; }
    }
}