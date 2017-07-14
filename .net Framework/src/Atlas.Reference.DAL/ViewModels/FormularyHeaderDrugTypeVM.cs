using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Reference.DAL.ViewModels
{
    public class FormularyHeaderDrugTypeVM
    {
        [JsonProperty(PropertyName = "drugTypeFnCd")]
        public string DrugTypeFnCd { get; set; }

        [JsonProperty(PropertyName = "drugTypeFnName")]
        public string DrugTypeFnName { get; set; }
    }
}
