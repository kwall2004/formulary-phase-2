using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Reference.DAL.ViewModels
{
    public class ValidationVM
    {
        public string ID { get; set; }
        public string Name { get; set; }
        public bool IsValid { get; set; }
    }
}
