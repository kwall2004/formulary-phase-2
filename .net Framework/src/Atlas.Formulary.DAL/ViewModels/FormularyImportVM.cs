using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.ViewModels
{
    public class FormularyImportVM
    {
        public string ImportFilePath { get; set; }
        public int BatchID { get; set; }
        public long FormularySK { get; set; }
        public string userID { get; set; }
    }
}
