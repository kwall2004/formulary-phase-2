using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.ViewModels
{
    public class CustomNDCFormularyVM
    {
        public string TenantOwner { get; set; }

        public List<CustomNDCFormularyFormularyVM> Formularies;

        public CustomNDCFormularyVM()
        {
            Formularies = new List<CustomNDCFormularyFormularyVM>();
        }

        public class CustomNDCFormularyFormularyVM
        {
            public long? FormularySK { get; set; }
            public string FormularyId { get; set; }
            public int? FormularyVersion { get; set; }
            public string FrmlryName { get; set; }
            public DateTime EfctvStartDt { get; set; }
        }
    }
}
