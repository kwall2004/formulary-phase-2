using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.ViewModels
{
    public class FormularyNotesVM
    {
        public long? FrmlryNoteSK { get; set; }
        public long FrmlrySK { get; set; }
        public long? AprvlTypeSK { get; set; }
        public string Notes { get; set; }
        public string Subject { get; set; }
    }
}
