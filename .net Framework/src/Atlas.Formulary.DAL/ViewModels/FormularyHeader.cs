using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.ViewModels
{

    public class FormularyHeader
    {
        [JsonProperty(PropertyName = "formularySK_From")]
        public int FormularySK_From { get; set; }


        [JsonProperty(PropertyName = "isNewVersion")]
        public bool IsNewVersion { get; set; }

        [JsonProperty(PropertyName = "userId")]
        public string UserId { get; set; }


    }


}
