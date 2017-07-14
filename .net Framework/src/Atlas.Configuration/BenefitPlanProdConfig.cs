using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Configuration
{
    public class BenefitPlanProdConfig : IBenefitPlanConfig
    {
        public string AuditConnectionString
        {
            get
            {
                return @"data source=MISQL2014CL01P\INST01P;initial catalog=AtlasLog;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework";
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
                return @"metadata=res://*/Models.BenefitPlan.csdl|res://*/Models.BenefitPlan.ssdl|res://*/Models.BenefitPlan.msl;provider=System.Data.SqlClient;provider connection string='data source=MISQL2014CL01P\INST01P; initial catalog=AtlasBenefitPlan;integrated security =True;MultipleActiveResultSets=True;App=EntityFramework'";
            }
        }

        private string DefaultConnectionString_2016
        {
            get
            {
                return @"metadata=res://*/Models.BenefitPlan.csdl|res://*/Models.BenefitPlan.ssdl|res://*/Models.BenefitPlan.msl;provider=System.Data.SqlClient;provider connection string='data source=MISQL2014CL01P\INST01P; initial catalog=AtlasBenefitPlan;integrated security =True;MultipleActiveResultSets=True;App=EntityFramework'";
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
                return @"metadata=res://*/Models.Reference.csdl|res://*/Models.Reference.ssdl|res://*/Models.Reference.msl;provider=System.Data.SqlClient;provider connection string='data source=MISQL2014CL01P\INST01P;initial catalog=AtlasFormulary_ReferenceData;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework'";
            }
        }

        public string IntegrationMerlinExportPathString
        {
            get
            {
                return @"\\miisi01-ppa\APPS\MI\EDI\pbm\Atlas to Merlin\prod\benefitplan\";
            }
        }

        public string IntegrationMerlinSandboxExportPathString
        {
            get
            {
                return @"\\miisi01-ppa\APPS\MI\EDI\pbm\Atlas to Merlin\sandbox\benefitplan\";
            }
        }

        public IDictionary<string, string> IntegrationMCSExportPathStrings
        {
            get
            {
                return new Dictionary<string, string>()
                {
                    { "MI", @"\\miisi01-ppa\APPS\MI\EDI\hpm\Atlas to MCS\prod\" },
                    { "IL", @"\\miisi01-ppa\APPS\MI\EDI\mhpil\Atlas to MCS\prod\" },
                };
            }
        }

        public IDictionary<string, string> IntegrationMCSSandboxExportPathStrings
        {
            get
            {
                return new Dictionary<string, string>()
                {
                    { "MI", @"\\miisi01-ppa\APPS\MI\EDI\hpm\Atlas to MCS\sandbox\hpm\" },
                    { "IL", @"\\miisi01-ppa\APPS\MI\EDI\mhpil\Atlas to MCS\sandbox\mhpil\" },
                };
            }
        }

        public string MerlinSoapURL
        {
            get
            {
                return "http://mirxdb01-pvl.caidan.local/pbm/wsa1";
            }
        }

        public string MerlinSoapSessionID
        {
            get
            {
                return "86db817a-7f35-0082-1c14-adf690f02fa3";
            }
        }
    }
}