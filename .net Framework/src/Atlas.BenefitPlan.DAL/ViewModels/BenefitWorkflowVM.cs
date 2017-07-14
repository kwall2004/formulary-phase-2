using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.BenefitPlan.DAL.ViewModels
{
    /// <summary>
    /// The Benefit Workflow Update View Model
    /// </summary>
    public class BenefitWorkflowVM : BaseViewModel
    {
        public long BnftSK { get; set; }

        public string newStatType { get; set; }

        public long? StatTypeSK { get; set; }
    }
}
