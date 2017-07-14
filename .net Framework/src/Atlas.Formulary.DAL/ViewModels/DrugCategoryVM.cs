using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.ViewModels
{
    public class DrugCategoryVM
    {
        [JsonProperty(PropertyName = "formularySK")]
        public long FormularySK { get; set; }
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
        [JsonProperty(PropertyName = "drugCategorySK")]
        public long DrugCategorySK { get; set; }
    }
}
