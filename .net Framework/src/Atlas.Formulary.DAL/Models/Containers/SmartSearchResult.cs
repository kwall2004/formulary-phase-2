using Atlas.Core.DAL.Models.Containers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.Models.Containers
{
    public class SmartSearchResult
    {
        public Criteria Rule { get; set; }
        public string NDC { get; set; }
        public string LabelName { get; set; }
        public string BrandName { get; set; }
        public string GCN { get; set; }
        public string HICL { get; set; }
        public string GenericName { get; set; }
        public string MedId { get; set; }
        public string GPI { get; set; }

    }
}
