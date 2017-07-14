using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Core.WebApi.Models.Requests
{
    public class DrugSearchRequest<T> : PagedRequest<T>
    {
        [JsonProperty(PropertyName = "formularySK")]
        public long? FormularySK { get; set; }

        [JsonProperty(PropertyName = "orderBy")]
        public string OrderBy { get; set; }

        [JsonProperty(PropertyName = "userId")]
        public string userId { get; set; }

        [JsonProperty(PropertyName = "criteriaChange")]
        public bool CriteriaChange { get; set; }

        [JsonProperty(PropertyName = "sessionId")]
        public Guid? SessionId { get; set; }

        [JsonProperty(PropertyName = "drugListSK")]
        public long? DrugListSK { get; set; }

        [JsonProperty(PropertyName = "coveragePropertyProgramSK")]
        public long? CoveragePropertyProgramSK { get; set; }

    }
}
