using Atlas.Configuration;
using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.Models.Containers;
using Atlas.Formulary.DAL.Repositories.Interfaces;
using Atlas.Formulary.DAL.ViewModels;
using Atlas.Formulary.DAL.ViewModels.SummaryVM;
using Atlas.Reference.DAL.Models;
using EntityFrameworkExtras.EF6;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.Repositories
{
    public class FormularySummaryRepository : EFRepositoryBase<Frmlry, FormularyEntities>, IFormularySummaryRepository
    {
        public FormularySummaryRepository(IConfig config, FormularyEntities db) : base(config, db) { }

        public List<spSumRptCfg_GetAll_Result> GetAllSummaryReportConfig()
        {
            var result = _db.spSumRptCfg_GetAll().ToList();
            return result;
        }
        
        public List<spSumRptCfg_Get_Result> GetSummaryReportConfig(long summaryReportConfigSK)
        {
            var result = _db.spSumRptCfg_Get(summaryReportConfigSK).ToList();
            return result;
        }

        public long PostSummaryReportConfig(long formularySK, string userId)
        {
            var result = _db.spSumRptCfg_Post(formularySK, userId).FirstOrDefault();
            if (result.ErrorNumber != 0)
            {
                throw new Exception(result.ErrorMessage);
            }
            return result.ErrorSeverity.Value;
        }
        
        public long PutSummaryReportConfig(SummaryConfigReportPutVM summaryConfig, string userId)
        {
            var result = _db.spSumRptCfg_Put(summaryConfig.SummaryReportConfigSK, 
                                             summaryConfig.SectionSortOrderList, 
                                             summaryConfig.SumRptCfgName, 
                                             summaryConfig.SumRptCfgDesc, 
                                             summaryConfig.FileFmtSK, 
                                             summaryConfig.LangSK, 
                                             summaryConfig.FontSizeSK, 
                                             summaryConfig.InclUMInd, 
                                             summaryConfig.InclNotCvrdInd, 
                                             summaryConfig.TierDisplSK, 
                                             userId).FirstOrDefault();
            if (result.ErrorNumber != 0)
            {
                throw new Exception(result.ErrorMessage);
            }
            return result.ErrorSeverity.Value;
        }

        public void ActivateSummaryReportConfig(long summaryReportConfigSK, string userId)
        {
            _db.spSumRptCfg_Activate(summaryReportConfigSK, userId);
        }

        public long PostSummaryReportConfigTier(long summaryReportConfigSK, long formularySK, string userId)
        {
            var result = _db.spSumRptCfgTier_Post(summaryReportConfigSK, formularySK, userId).FirstOrDefault();
            if (result.ErrorNumber != 0)
            {
                throw new Exception(result.ErrorMessage);
            }
            return result.ErrorSeverity.Value;
        }

        public long PutSummaryReportConfigTier(SummaryConfigReportTierPutVM summaryConfigTier, string userId)
        {
            var result = _db.spSumRptCfgTier_Put(summaryConfigTier.SummaryConfigReportSK, 
                                                 summaryConfigTier.FormularySK, 
                                                 summaryConfigTier.FormularyTierSelectedList, 
                                                 summaryConfigTier.TierDescList, 
                                                 userId).FirstOrDefault();
            if (result.ErrorNumber != 0)
            {
                throw new Exception(result.ErrorMessage);
            }
            return result.ErrorSeverity.Value;
        }

        public List<spSumRptCfgTier_Get_Result> GetSummaryReportConfigTier(long summaryReportConfigSK, long formularySK)
        {
            var result = _db.spSumRptCfgTier_Get(summaryReportConfigSK, formularySK).ToList();
            return result;
        }

        public List<spSumRptOrgBy_GetAll_Result> GetAllSummaryReportOrganizeBy()
        {
            var result = _db.spSumRptOrgBy_GetAll().ToList();
            return result;
        }

        public List<spSumRptDrugSortBy_GetAll_Result> GetAllSummaryReportDrugSortBy()
        {
            var result = _db.spSumRptDrugSortBy_GetAll().ToList();
            return result;
        }

        public List<spSumRptRollUp_GetAll_Result> GetAllSummaryReportRollUpBy()
        {
            var result = _db.spSumRptRollUp_GetAll().ToList();
            return result;
        }

        public List<spSumRptOTC_GetAll_Result> GetAllSummaryReportOTC()
        {
            var result = _db.spSumRptOTC_GetAll().ToList();
            return result;
        }

        public spSumRptSctn_Get_Result GetSummaryReportConfigSection(long summaryReportConfigSectionSK)
        {
            var result = _db.spSumRptSctn_Get(summaryReportConfigSectionSK).FirstOrDefault();
            return result;
        }
        
        public long PutSummaryReportConfigSection(long summaryReportConfigSectionSK, string sectionConfigJson)
        {
            var result = _db.spSumRptSctn_Put(summaryReportConfigSectionSK, sectionConfigJson).FirstOrDefault();
            if (result.ErrorNumber != 0)
            {
                throw new Exception(result.ErrorMessage);
            }
            return result.ErrorSeverity.Value;
        }

        public long AddSummaryReportConfigSection(long summaryReportConfigSK, long summaryReportSectionSK, string userId)
        {
            var result = _db.spSumRptCfgSctn_Add(summaryReportConfigSK, summaryReportSectionSK, userId).FirstOrDefault();
            if (result.ErrorNumber != 0)
            {
                throw new Exception(result.ErrorMessage);
            }
            return result.ErrorSeverity.Value;
        }

        public void DeleteSummaryReportConfigSection(long summaryReportConfigSK, long summaryReportSectionSK)
        {
            var result = _db.spSumRptCfgSctn_Remove(summaryReportConfigSK, summaryReportSectionSK);
        }

        public List<spSumRptCfgSctn_GetSelected_Result> GetSelectedSummaryReportConfigSection(long summaryReportConfigSK)
        {
            var result = _db.spSumRptCfgSctn_GetSelected(summaryReportConfigSK).ToList();
            return result;
        }

        public List<spSumRptCfgSctn_GetUnselected_Result> GetUnselectedSummaryReportConfigSection(long summaryReportConfigSK)
        {
            var result = _db.spSumRptCfgSctn_GetUnselected(summaryReportConfigSK).ToList();
            return result;
        }

        public List<spFileFormat_GetAll_Result> GetAllFileFormats()
        {
            var result = _db.spFileFormat_GetAll().ToList();
            return result;
        }

        public List<spLanguage_GetAll_Result> GetAllLanguages()
        {
            var result = _db.spLanguage_GetAll().ToList();
            return result;
        }

        public List<spFontSize_GetAll_Result> GetAllFontSizes()
        {
            var result = _db.spFontSize_GetAll().ToList();
            return result;
        }

        public List<spTierDispl_GetAll_Result> GetAllTierDisplays()
        {
            var result = _db.spTierDispl_GetAll().ToList();
            return result;
        }

        public List<spSumRptCfgCvrgPrptyType_Get_Result> GetSummaryReportCoverageProperty(long summaryReportConfigSK)
        {
            var result = _db.spSumRptCfgCvrgPrptyType_Get(summaryReportConfigSK).ToList();
            return result;
        }

        public int PostSummaryReportCoverageProperty(long summaryReportConfigSK, string userId)
        {
            var result = _db.spSumRptCfgCvrgPrptyType_Post(summaryReportConfigSK, userId);
            return result;
        }

        public int PutSummaryReportCoverageProperty(SummaryConfigCoveragePropertyVM summaryReportCoverageProperty, string userId)
        {
            var result = _db.spSumRptCfgCvrgPrptyType_Put(summaryReportCoverageProperty.SumRptCfgSK, 
                                             summaryReportCoverageProperty.SumRptCfgCvrgPrptyTypeSK, 
                                             summaryReportCoverageProperty.Display_Code, 
                                             summaryReportCoverageProperty.Display_Description, 
                                             userId);
            return result;
        }

        public long PutSummaryReportConfigFormulary(long summaryReportConfigSK, long formularySK, string userId)
        {
            var result = _db.spSumRptCfgFrmlry_Put(summaryReportConfigSK, formularySK, userId).FirstOrDefault();
            if (result.ErrorNumber != 0)
            {
                throw new Exception(result.ErrorMessage);
            }
            return result.ErrorSeverity.Value;
        }

    }
}
