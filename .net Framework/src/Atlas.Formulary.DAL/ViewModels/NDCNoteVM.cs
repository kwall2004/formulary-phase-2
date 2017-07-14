using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.ViewModels
{
    public class NDCNoteVM
    {
        [JsonProperty(PropertyName = "NDCNoteSK")]
        public long? NDCNoteSK { get; set; }

        [JsonProperty(PropertyName = "NDC")]
        public string NDC { get; set; }

        [JsonProperty(PropertyName = "UserId")]
        public string UserId { get; set; }

        [JsonProperty(PropertyName = "NDCNotes")]
        public string NDCNotes { get; set; }
    }
}
