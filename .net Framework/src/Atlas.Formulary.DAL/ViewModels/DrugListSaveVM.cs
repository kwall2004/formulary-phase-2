using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.ViewModels
{
    public class DrugListSaveVM
    {
        public long formularySK { get; set; }
        public string userId { get; set; }
        public string drugListNames { get; set; }
    }
}
