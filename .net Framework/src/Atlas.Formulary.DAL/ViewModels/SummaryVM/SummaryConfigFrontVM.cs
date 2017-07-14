using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.ViewModels.SummaryVM
{
    public class SummaryConfigFrontVM
    {

        [JsonProperty(PropertyName = "DefaultFrontTextPath")]
        public string DefaultFrontTextPath { get; set; }

        [JsonProperty(PropertyName = "isTitlePageOnly")]
        public bool IsTitlePageOnly { get; set; }
    }
}