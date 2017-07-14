using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.ViewModels
{
    public class DashboardVM
    {
        [JsonProperty(PropertyName = "FrmlrySK")]
        public int FrmlrySK { get; set; }

        [JsonProperty(PropertyName = "AprvlTypePrity")]
        public int AprvlTypePrity { get; set; }

        [JsonProperty(PropertyName = "AprvlNotes")]
        public string AprvlNotes { get; set; }

        [JsonProperty(PropertyName = "UserId")]
        public string UserId { get; set; }


    }
}
