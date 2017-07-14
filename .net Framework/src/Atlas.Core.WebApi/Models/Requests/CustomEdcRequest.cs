using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Core.WebApi.Models.Requests
{
    public class CustomNDCRequest
    {

        // [JsonProperty(PropertyName = "customNDC")]
        public int customNDC { get; set; }

        //[JsonProperty(PropertyName = "labelName")]
        public string labelName { get; set; }

        //[JsonProperty(PropertyName = "unitPrice")]
        public string userPrice { get; set; }

        //[JsonProperty(PropertyName = "priceDate")]
        public System.DateTime priceDate { get; set; }
    }
}
