using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Reference.DAL.ViewModels
{
    public class FormularyHeaderVM
    {
        [JsonProperty(PropertyName = "drugTypeVMs")]
        public List<FormularyHeaderDrugTypeVM> DrugTypeVMs { get; set; }

        [JsonProperty(PropertyName = "planTypeVMs")]
        public List<FormularyHeaderPlanTypeVM> PlanTypeVMs { get; set; }
    }
}
