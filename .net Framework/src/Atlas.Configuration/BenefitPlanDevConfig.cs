using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Configuration
{
    public class BenefitPlanDevConfig : IBenefitPlanConfig
    {
        public string AuditConnectionString
        {
            get
            {
                return @"data source=MIRXSQL01-DVW\INST01D;initial catalog=AtlasLog;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework";
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
                return @"metadata=res://*/Models.BenefitPlan.csdl|res://*/Models.BenefitPlan.ssdl|res://*/Models.BenefitPlan.msl;provider=System.Data.SqlClient;provider connection string='data source=MISQL2014CL01D\INST01D; initial catalog=AtlasBenefitPlan;integrated security =True;MultipleActiveResultSets=True;App=EntityFramework'";
            }
        }

        private string DefaultConnectionString_2016
        {
            get
            {
                return @"metadata=res://*/Models.BenefitPlan.csdl|res://*/Models.BenefitPlan.ssdl|res://*/Models.BenefitPlan.msl;provider=System.Data.SqlClient;provider connection string='data source=MIRXSQL01-DVW\INST01D; initial catalog=AtlasBenefitPlan;integrated security =True;MultipleActiveResultSets=True;App=EntityFramework'";
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
                return @"metadata=res://*/Models.Reference.csdl|res://*/Models.Reference.ssdl|res://*/Models.Reference.msl;provider=System.Data.SqlClient;provider connection string='data source=MIRXSQL01-DVW\INST01D;initial catalog=AtlasFormulary_ReferenceData;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework'";
            }
        }

        public string IntegrationMerlinExportPathString
        {
            get
            {
                return @"\\miisi01-ppa\APPS\MI\EDI\pbm\Atlas to Merlin\dev\benefitplan\";
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
                    { "MI", @"\\miisi01-ppa\APPS\MI\EDI\hpm\Atlas to MCS\dev\" },
                    { "IL", @"\\miisi01-ppa\APPS\MI\EDI\mhpil\Atlas to MCS\dev\" },
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
                return "http://mirxdb01-dvl.caidan.local/pbm/wsa1";
            }
        }

        public string MerlinSoapSessionID
        {
            get
            {
                return "a9995b11-e21d-d9b4-1c14-31474822ca41";
            }
        }
    }
}
