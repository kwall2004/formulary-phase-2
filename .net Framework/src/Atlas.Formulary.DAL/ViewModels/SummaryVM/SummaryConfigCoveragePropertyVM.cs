using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.ViewModels.SummaryVM
{
    public class SummaryConfigCoveragePropertyVM
    {
        public long SumRptCfgSK { get; set; }
        public long SumRptCfgCvrgPrptyTypeSK { get; set; }
        public string Display_Code { get; set; }
        public string Display_Description { get; set; }
    }
}
