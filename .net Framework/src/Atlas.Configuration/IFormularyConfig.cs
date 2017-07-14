using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Configuration
{
    public interface IFormularyConfig : IConfig
    {
        string FormularyRulesImportPathString { get; }
        string FormularyDetailsImportPathString { get; }
        string DrugListDetailsImportPathString { get; }
        string FormularySummaryFrontPagePathString { get; }
        string FormularySummaryBackPagePathString { get; }
        string FormularySummaryTitlePagePathString { get; }
    }
}
