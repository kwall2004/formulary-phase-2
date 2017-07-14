using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.ViewModels
{
    public class DrugSearchResults
    {
        public string NDC { get; set; }
        public string OTC { get; set; }
        public string DrugType { get; set; }
        public string Strength { get; set; }
        public string Dosage { get; set; }
        public string RouteOfAdministration { get; set; }
        public string MEDID { get; set; }
        public string LabelName { get; set; }
        public string GCN { get; set; }
        public string BrandName { get; set; }
        public string HICL { get; set; }
        public string ETC { get; set; }
    }
}
