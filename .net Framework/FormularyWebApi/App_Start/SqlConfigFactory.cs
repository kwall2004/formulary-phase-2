using Atlas.Configuration;
using Atlas.Reference.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AtlasWebApi.App_Start
{
    public class SqlConfigFactory
    {
        private IReferenceRepositoryFactory _factory;
        private string _deletedTimestamp;
        private string _inactiveTimestamp;
        private string _formularyRulesImportPath;
        private string _formularyDetailsImportPath;
        private string _druglistDetailsImportPath;
        private string _formularySummaryFrontPagePath;
        private string _formularySummaryBackPagePath;
        private string _formularySummaryTitlePagePath;

        public SqlConfigFactory(IReferenceRepositoryFactory factory)
        {
            _factory = factory;
        }
        public IFormularyConfig FormularyAppSettings(string environment)
        {
            GetAppSettingValues(environment);
            switch(environment)
            {
                case "PROD":
                    var prodInstance = new FormularyProdConfig();
                    prodInstance.SetAppSettings(_deletedTimestamp, _inactiveTimestamp, _formularyRulesImportPath, _formularyDetailsImportPath, _druglistDetailsImportPath);
                    return prodInstance;
                case "UAT":
                    var uatInstance = new FormularyUATConfig();
                    uatInstance.SetAppSettings(_deletedTimestamp, _inactiveTimestamp, _formularyRulesImportPath, _formularyDetailsImportPath, _druglistDetailsImportPath);
                    return uatInstance;
                case "QA":
                    var qaInstance = new FormularyQAConfig();
                    qaInstance.SetAppSettings(_deletedTimestamp, _inactiveTimestamp, _formularyRulesImportPath, _formularyDetailsImportPath, _druglistDetailsImportPath);
                    return qaInstance;
                default:
                    var devInstance = new FormularyDevConfig();
                    devInstance.SetAppSettings(_deletedTimestamp, _inactiveTimestamp, _formularyRulesImportPath, _formularyDetailsImportPath, _druglistDetailsImportPath, _formularySummaryFrontPagePath, _formularySummaryBackPagePath, _formularySummaryTitlePagePath);
                    return devInstance;
            }
            
        }

        private void GetAppSettingValues(string environment)
        {
            using (var repository = _factory.SqlConfig())
            {
                _deletedTimestamp = repository.GetDeletedTimestampColumn(environment);
                _inactiveTimestamp = repository.GetInactiveTimestampColumn(environment);
                _formularyRulesImportPath = repository.GetFormularyRulesImportPath(environment);
                _formularyDetailsImportPath = repository.GetFormularyDetailsImportPath(environment);
                _druglistDetailsImportPath = repository.GetDrugListDetailsImportPath(environment);
                _formularySummaryFrontPagePath = repository.GetFormularySummaryFrontPagePath(environment);
                _formularySummaryBackPagePath = repository.GetFormularySummaryBackPagePath(environment);
                _formularySummaryTitlePagePath = repository.GetFormularySummaryTitlePagePath(environment);
            }
        }
    }
}