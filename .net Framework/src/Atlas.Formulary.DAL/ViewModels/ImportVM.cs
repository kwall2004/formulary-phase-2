using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Atlas.Formulary.DAL.ViewModels
{
    public class ImportVM
    {
        [JsonProperty(PropertyName = "FilePath")]
        public string FilePath { get; set; }

        [JsonProperty(PropertyName = "FrmlrySK")]
        public long? FrmlrySK { get; set; }

        [JsonProperty(PropertyName = "DrugListSK")]
        public long? DrugListSK { get; set; }

        [JsonProperty(PropertyName = "UserId")]
        public string UserId { get; set; }

    }
}
