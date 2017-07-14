using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.ViewModels.SummaryVM
{
    public class SummaryConfigBackVM
    {

        [JsonProperty(PropertyName = "DefaultBackTextPath")]
        public string DefaultBackTextPath { get; set; }
    }
}