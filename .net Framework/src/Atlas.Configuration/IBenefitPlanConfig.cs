using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Configuration
{
    public interface IBenefitPlanConfig : IConfig
    {
        string IntegrationMerlinExportPathString { get; }

        string IntegrationMerlinSandboxExportPathString { get; }

        string MerlinSoapURL { get; }

        string MerlinSoapSessionID { get; }

        IDictionary<string, string> IntegrationMCSExportPathStrings { get; }

        IDictionary<string, string> IntegrationMCSSandboxExportPathStrings { get; }
    }
}
