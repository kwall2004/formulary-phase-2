using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.ViewModels
{
    public class GpiTreeNode
    {
        public string GPI { get; set; }
        public string GPI_Parent { get; set; }
        public string GPI_Name { get; set; }
        public bool leaf { get; set; }
        public List<GpiTreeNode> children { get; set; }

        public GpiTreeNode()
        {
            this.children = new List<GpiTreeNode>();
        }
    }
}
