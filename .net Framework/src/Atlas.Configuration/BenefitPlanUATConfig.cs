using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Configuration
{
    public class BenefitPlanUATConfig : IBenefitPlanConfig
    {
        public string AuditConnectionString
        {
            get
            {
                return @"data source=MISQL01-UVW\INST01U;initial catalog=AtlasLog;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework";

            }
        }

        public string DefaultConnectionString
        {
            get
            {
                return DefaultConnectionString_2014;
            }
        }

        private string DefaultConnectionString_2014
        {
            get
            {
                return @"metadata=res://*/Models.BenefitPlan.csdl|res://*/Models.BenefitPlan.ssdl|res://*/Models.BenefitPlan.msl;provider=System.Data.SqlClient;provider connection string='data source=MISQL2014CL01U\INST01U;initial catalog=AtlasBenefitPlan;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework'";
            }
        }

        private string DefaultConnectionString_2016
        {
            get
            {
                return @"metadata=res://*/Models.BenefitPlan.csdl|res://*/Models.BenefitPlan.ssdl|res://*/Models.BenefitPlan.msl;provider=System.Data.SqlClient;provider connection string='data source=MISQL01-UVW\INST01U;initial catalog=AtlasBenefitPlan;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework'";
            }
        }

        public string DeletedTimestampColumn
        {
            get
            {
                return @"DelTs";
            }
        }

        public string InactiveTimestampColumn
        {
            get
            {
                return @"InctvTs";
            }
        }

        public string ReferenceConnectionString
        {
            get
            {
                return @"metadata=res://*/Models.Reference.csdl|res://*/Models.Reference.ssdl|res://*/Models.Reference.msl;provider=System.Data.SqlClient;provider connection string='data source=MISQL01-UVW\INST01U;initial catalog=AtlasFormulary_ReferenceData;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework'";
            }
        }

        public string IntegrationMerlinExportPathString
        {
            get
            {
                return @"\\miisi01-ppa\APPS\MI\EDI\pbm\Atlas to Merlin\uat\benefitplan\";
            }
        }

        public string IntegrationMerlinSandboxExportPathString
        {
            get
            {
                return IntegrationMerlinExportPathString;
            }
        }

        public IDictionary<string, string> IntegrationMCSExportPathStrings
        {
            get
            {
                return new Dictionary<string, string>()
                {
                    { "MI", @"\\miisi01-ppa\APPS\MI\EDI\hpm\Atlas to MCS\uat\" },
                    { "IL", @"\\miisi01-ppa\APPS\MI\EDI\mhpil\Atlas to MCS\uat\" },
                };
            }
        }

        public IDictionary<string, string> IntegrationMCSSandboxExportPathStrings
        {
            get
            {
                return IntegrationMCSExportPathStrings;
            }
        }

        public string MerlinSoapURL
        {
            get
            {
                return "http://mirxdb01-uvl.caidan.local/pbm/wsa1";
            }
        }

        public string MerlinSoapSessionID
        {
            get
            {
                return "855bdd48-9b54-cf93-1c14-e6fc98474932";
            }
        }
    }
}
