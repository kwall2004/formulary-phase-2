using System;

namespace Atlas.Configuration
{
    public class DevConfig : IConfig
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
                return @"Data Source=(LocalDb)\MSSQLLocalDB;AttachDbFilename=|DataDirectory|\aspnet-AtlasWebApi-20160502104934.mdf;Initial Catalog=aspnet-AtlasWebApi-20160502104934;Integrated Security=True";
            }
        }

        public string ReferenceConnectionString
        {
            get
            {
                return @"metadata=res://*/Models.Reference.csdl|res://*/Models.Reference.ssdl|res://*/Models.Reference.msl;provider=System.Data.SqlClient;provider connection string='data source=MIRXSQL01-DVW\INST01D;initial catalog=AtlasFormulary_ReferenceData;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework'";
            }
        }

        public string FormularyConnectionString
        {
            get
            {
                return @"metadata=res://*/Models.Formulary.csdl|res://*/Models.Formulary.ssdl|res://*/Models.Formulary.msl;provider=System.Data.SqlClient;provider connection string='data source=MIRXSQL01-DVW\INST01D;initial catalog=AtlasFormulary;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework'";
            }
        }

        public string BenefitPlanConnectionString
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
    }
}
