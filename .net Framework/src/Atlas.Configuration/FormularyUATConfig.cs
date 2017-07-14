using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Configuration
{
    public class FormularyUATConfig : IFormularyConfig
    {
        private string _deletedTimestamp { get; set; }
        private string _inactiveTimestamp { get; set; }
        private string _druglistDetailsImportPath { get; set; }
        private string _formularyRulesImportPath { get; set; }
        private string _formularyDetailsImportPath { get; set; }

        public string AuditConnectionString
        {
            get
            {
                return @"data source=MISQL2014CL01U\INST01U;initial catalog=AtlasLog;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework";
            }
        }

        public string DefaultConnectionString
        {
            get
            {
                return @"metadata=res://*/Models.Formulary.csdl|res://*/Models.Formulary.ssdl|res://*/Models.Formulary.msl;provider=System.Data.SqlClient;provider connection string='data source=MISQL2014CL01U\INST01U;initial catalog=AtlasFormulary;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework'";
            }
        }

        public string ReferenceConnectionString
        {
            get
            {
                return @"metadata=res://*/Models.Reference.csdl|res://*/Models.Reference.ssdl|res://*/Models.Reference.msl;provider=System.Data.SqlClient;provider connection string='data source=MISQL2014CL01U\INST01U;initial catalog=AtlasFormulary_ReferenceData;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework'";
            }
        }

        public string DeletedTimestampColumn
        {
            get
            {
                return _deletedTimestamp;
            }
        }

        public string DrugListDetailsImportPathString
        {
            get
            {
                return _druglistDetailsImportPath;
            }
        }

        public string FormularyDetailsImportPathString
        {
            get
            {
                return _formularyDetailsImportPath;
            }
        }

        public string FormularyRulesImportPathString
        {
            get
            {
                return _formularyRulesImportPath;
            }
        }

        public string InactiveTimestampColumn
        {
            get
            {
                return _inactiveTimestamp;
            }
        }

        public string FormularySummaryFrontPagePathString
        {
            get
            {
                throw new NotImplementedException();
            }
        }

        public string FormularySummaryBackPagePathString
        {
            get
            {
                throw new NotImplementedException();
            }
        }

        public string FormularySummaryTitlePagePathString
        {
            get
            {
                throw new NotImplementedException();
            }
        }

        public void SetAppSettings(string deletedTimestamp, string inactiveTimestamp, string formularyRulesImportPath, string formularyDetailsImportPath, string druglistDetailsImportPath)
        {
            _deletedTimestamp = deletedTimestamp;
            _inactiveTimestamp = inactiveTimestamp;
            _formularyRulesImportPath = formularyRulesImportPath;
            _formularyDetailsImportPath = formularyDetailsImportPath;
            _druglistDetailsImportPath = druglistDetailsImportPath;
        }
    }
}
