using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Reference.DAL.ViewModels
{
    public class CustomNdc
    {
        public int DrugListSK{ get; set; }

        public string NDC { get; set; }
        public string LabelName { get; set; }
        public decimal UnitPrice { get; set; }
        public DateTime DateToMarket { get; set; }

    }
}
