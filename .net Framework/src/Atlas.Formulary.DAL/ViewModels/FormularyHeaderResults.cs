using Atlas.Formulary.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.ViewModels
{
    public class FormularyHeaderResults
    {
        public IEnumerable<spFormulary_GetAccess_Result> Access { get; set; }
        public IEnumerable<spFormulary_GetDrugLists_Result> DrugLists { get; set; }
        public IEnumerable<spFormulary_GetHeader_Result> Header { get; set; }
        public IEnumerable<spFormulary_GetTierNames_Result> TierNames { get; set; }

    }
}
