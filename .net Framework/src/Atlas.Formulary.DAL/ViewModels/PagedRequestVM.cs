using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.ViewModels
{
    public class PagedRequestVM
    {
        public long FormularySK { get; set; }
        public bool IsNewRequest { get; set; }
        public int StartIndex { get; set; }
        public int Count { get; set; }
    
    }
}
