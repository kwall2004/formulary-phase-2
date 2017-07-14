using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.ViewModels
{
    public class DrugCategoryPagedVM
    {
        public long? drugCategorySK { get; set; }
        public string name { get; set; }
        public bool? cvrdInd { get; set; }
        public long? formularyTierSK { get; set; }
        public string formularyTierName { get; set; }
        public int? NDCCount { get; set; }
        public long? formularySK { get; set; }
        public long? cacheStatusSK { get; set; }
        public string cacheStatusDesc { get; set; }
    }
}
