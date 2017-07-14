using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.Models.Containers
{
    public class TreeChildren
    {
        public int ETC_ID { get; set; }
        public int? PARENT_ETC_ID { get; set; }
        public string ETC_NAME { get; set; }
        public bool leaf { get; set; }
        public List<TreeChildren> children { get; set; }
    }
}
