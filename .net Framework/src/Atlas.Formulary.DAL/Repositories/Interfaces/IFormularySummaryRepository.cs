using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.Models.Containers;
using Atlas.Formulary.DAL.ViewModels;
using Atlas.Formulary.DAL.ViewModels.SummaryVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.Repositories.Interfaces
{
    public interface IFormularySummaryRepository : IRepository<Frmlry>
    {
        List<spSumRptCfg_GetAll_Result> GetAllSummaryReportConfig();

        List<spSumRptCfg_Get_Result> GetSummaryReportConfig(long summaryReportConfigSK);

        long PostSummaryReportConfig(long formularySK, string userId);

        long PutSummaryReportConfig(SummaryConfigReportPutVM summaryConfig, string userId);

        void ActivateSummaryReportConfig(long summaryReportConfigSK, string userId);
        long PostSummaryReportConfigTier(long summaryReportConfigSK, long formularySK, string userId);
        long PutSummaryReportConfigTier(SummaryConfigReportTierPutVM summaryConfigTier, string userId);
        List<spSumRptCfgTier_Get_Result> GetSummaryReportConfigTier(long summaryReportConfigSK, long formularySK);
        List<spSumRptOrgBy_GetAll_Result> GetAllSummaryReportOrganizeBy();
        List<spSumRptDrugSortBy_GetAll_Result> GetAllSummaryReportDrugSortBy();
        List<spSumRptRollUp_GetAll_Result> GetAllSummaryReportRollUpBy();
        List<spSumRptOTC_GetAll_Result> GetAllSummaryReportOTC();
        spSumRptSctn_Get_Result GetSummaryReportConfigSection(long summaryReportConfigSectionSK);
        long PutSummaryReportConfigSection(long summaryReportConfigSectionSK, string sectionConfigJson);
        long AddSummaryReportConfigSection(long summaryReportConfigSK, long summaryReportSectionSK, string userId);
        void DeleteSummaryReportConfigSection(long summaryReportConfigSK, long summaryReportSectionSK);
        List<spSumRptCfgSctn_GetSelected_Result> GetSelectedSummaryReportConfigSection(long summaryReportConfigSK);
        List<spSumRptCfgSctn_GetUnselected_Result> GetUnselectedSummaryReportConfigSection(long summaryReportConfigSK);
        List<spFileFormat_GetAll_Result> GetAllFileFormats();
        List<spLanguage_GetAll_Result> GetAllLanguages();
        List<spFontSize_GetAll_Result> GetAllFontSizes();
        List<spTierDispl_GetAll_Result> GetAllTierDisplays();
        List<spSumRptCfgCvrgPrptyType_Get_Result> GetSummaryReportCoverageProperty(long summaryReportConfigSK);
        int PostSummaryReportCoverageProperty(long summaryReportConfigSK, string userId);
        int PutSummaryReportCoverageProperty(SummaryConfigCoveragePropertyVM summaryReportCoverageProperty, string userId);
        long PutSummaryReportConfigFormulary(long summaryReportConfigSK, long formularySK, string userId);
    }
}
