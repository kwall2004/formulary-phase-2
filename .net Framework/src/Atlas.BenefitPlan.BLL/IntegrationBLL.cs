using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.Configuration;
using Atlas.Core.BLL.Wrapper.Contract;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace Atlas.BenefitPlan.BLL
{
    /// <summary>
    /// The Integration BLL for Benefit Plan
    /// </summary>
    public class IntegrationBLL : IIntegrationBLL
    {
        private const string MCSBenefitPlanFormat = "Atlas_MCS_BP_{0}.xml";
        private const string MCSBenefitFormat = "Atlas_MCS_RC_{0}.xml";
        private const string MerlinBenefitPlanFormat = "atlas_merlin_bp_{0}.xml";

        /// <summary>
        /// the Benefit Plan Repository Factory
        /// </summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>
        /// the Benefit Plan Configuration
        /// </summary>
        private IBenefitPlanConfig _configuration;

        /// <summary>
        /// the Benefit Plan Configuration
        /// </summary>
        private IFile _file;

        /// <summary>
        /// The Constructor for the Integration BLL for Benefit Plan
        /// </summary>
        /// <param name="configuration">the Benefit Plan Configuration</param>
        /// <param name="repoFactory">the Benefit Plan Repository Factory</param>
        public IntegrationBLL(IBenefitPlanConfig configuration, IBenefitPlanRepositoryFactory repoFactory, IFile file)
        {
            _configuration = configuration;
            _repoFactory = repoFactory;
            _file = file;
        }

        /// <summary>
        /// Execute Benefit Plans to Merlin & MCS
        /// </summary>
        /// <param name="benefitPlanToExport">the Benefit Plan to Export</param>
        public bool ExportBenefitPlan(BenefitPlanIntegration benefitPlanToExport)
        {
            bool returnValue = false;
            bool result = false;

            PopGrpPBP popGroupPBP = _repoFactory.PopulationGroupPlanBenefitPackage ().FindAll(w => w.PopGrpPBPSK == benefitPlanToExport.PopGrpPBPSK).FirstOrDefault();
            IEnumerable<BnftPlan> plans = _repoFactory.PopulationGroupBenefitPlan().FindAll(w => w.PopGrpPBPSK == popGroupPBP.PopGrpPBPSK)
                .Select(s => s.PBPBnftPlan.BnftPlan).ToList();

            foreach (BnftPlan item in plans)
            {
                string benefitPlanType = _repoFactory.BenefitPlan().FindAll(w => w.BnftPlanSK == item.BnftPlanSK)
                    .Select(s => s.BnftPlanType.BnftPlanTypeCode).FirstOrDefault();
                switch (benefitPlanType)
                {
                    case "Pharmacy":
                        result = ExportBenefitPlanToMerlin(item.BnftPlanSK, popGroupPBP.PlanPgmCode, benefitPlanToExport.isSandbox);
                        returnValue = returnValue || result;
                        break;
                    case "Medical":
                        result = ExportBenefitPlanToMCS(item.BnftPlanSK, popGroupPBP.PopGrpPBPSK, benefitPlanToExport.isSandbox);
                        returnValue = returnValue || result;
                        break;
                }
            }

            return returnValue;
        }

        /// <summary>
        /// Execute Benefit Plan to Merlin 
        /// </summary>
        /// <param name="benefitPlanToExport">the Benefits to Export</param>
        public bool ExportBenefit(BenefitIntegration benefitToExport)
        {
            string xmlDocument = _repoFactory.AtlasBenefitPlanStoredProcs().ExportBenefitToMCS(benefitToExport.Status);
            string exportPath = GetMCSExportPath(_configuration.IntegrationMCSExportPathStrings.FirstOrDefault().Key, benefitToExport.Status != "Approved");

            bool returnValue = CreateXMLFile(xmlDocument, string.Format("{0}{1}", exportPath, @"Archive\"), GetExportFilename(MCSBenefitFormat));
            returnValue = returnValue && CreateXMLFile(xmlDocument, string.Format("{0}{1}", exportPath, string.Empty), GetExportFilename(MCSBenefitFormat));

            return exportPath != string.Empty;
        }
        
        /// <summary>
        /// Create the XML Document
        /// </summary>
        /// <param name="xml">the XML Document</param>
        private bool CreateXMLFile(string xml, string exportPath, string exportFile)
        {
            if (xml == string.Empty) { return false; }
            if (exportPath == string.Empty || exportPath == @"Archive\") { return false; }
           
            try
            {
                _file.WriteAllText(string.Format("{0}{1}", exportPath, exportFile), xml);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        /// <summary>
        /// Execute Benefit Plan to MCS 
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan Key</param>
        /// <param name="popGrpPBPSK">the Population Group PBP Key</param>
        /// <param name="isSandbox">the Population Group PBP Key</param>
        private bool ExportBenefitPlanToMCS(long? bnftPlanSK, long? popGrpPBPSK, bool isSandbox)
        {
            string xmlDocument = _repoFactory.AtlasBenefitPlanStoredProcs().ExportBenefitPlanToMCS(bnftPlanSK, popGrpPBPSK);
            string exportPath = GetMCSExportPath(GetXMLElementData(xmlDocument, "planId"), isSandbox);

            bool returnValue = CreateXMLFile(xmlDocument, string.Format("{0}{1}", exportPath, @"Archive\"), GetExportFilename(MCSBenefitPlanFormat));
            returnValue = returnValue && CreateXMLFile(xmlDocument, string.Format("{0}{1}", exportPath, string.Empty), GetExportFilename(MCSBenefitPlanFormat));

            return returnValue;
        }

        /// <summary>
        /// Execute Benefit Plan to Merlin 
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan Key</param>
        /// <param name="planPgmCode">the Plan Program Code</param>
        /// <param name="isSandbox">the Population Group PBP Key</param>
        private bool ExportBenefitPlanToMerlin(long? bnftPlanSK, string planPgmCode, bool isSandbox)
        {

            string xmlDocument = _repoFactory.AtlasBenefitPlanStoredProcs().ExportBenefitPlanToMerlin(bnftPlanSK, planPgmCode);
            string exportPath = GetMerlinExportPath(isSandbox);

            bool returnValue = CreateXMLFile(xmlDocument, string.Format("{0}{1}", exportPath, @"Archive\"), GetExportFilename(MerlinBenefitPlanFormat));
            returnValue = returnValue && CreateXMLFile(xmlDocument, string.Format("{0}{1}", exportPath, string.Empty), GetExportFilename(MerlinBenefitPlanFormat));

            return returnValue;
        }

        /// <summary>
        /// Get the Element Value for an xml document
        /// </summary>
        /// <param name="xmlString">the XML Document</param>
        /// <param name="element">the Element to find</param>
        /// <returns>the Value</returns>
        private string GetXMLElementData(string xmlString, string element)
        {
            if (xmlString == string.Empty) { return string.Empty; }

            string returnValue = string.Empty;
            using (XmlReader reader = XmlReader.Create(new StringReader(xmlString)))
            {
                reader.ReadToFollowing(element);
                returnValue = reader.ReadInnerXml();
            }
            return returnValue;
        }

        /// <summary>
        /// Get the Merlin Export Path
        /// </summary>
        /// <param name="isSandbox">is it Going to the Sand Box</param>
        /// <returns>Export Path</returns>
        private string GetMerlinExportPath(bool isSandbox)
        {
            return (isSandbox)
                ? _configuration.IntegrationMerlinSandboxExportPathString
                : _configuration.IntegrationMerlinExportPathString;
        }

        /// <summary>
        /// Get the MCS Export Path
        /// </summary>
        /// <param name="planStateCode">The Plan State Code</param>
        /// <param name="isSandbox">is it Going to the Sand Box</param>
        /// <returns>Export Path</returns>
        private string GetMCSExportPath(string planStateCode, bool isSandbox)
        {
            if (planStateCode.Length > 2) { planStateCode = planStateCode.Substring(0, 2); }

            return (isSandbox)
                ? _configuration.IntegrationMCSSandboxExportPathStrings.ContainsKey(planStateCode)
                        ? _configuration.IntegrationMCSSandboxExportPathStrings[planStateCode]
                        : string.Empty
                : _configuration.IntegrationMCSExportPathStrings.ContainsKey(planStateCode)
                        ? _configuration.IntegrationMCSExportPathStrings[planStateCode]
                        : string.Empty;
        }

        /// <summary>
        /// Get the Export File Name
        /// </summary>
        /// <param name="fileFormat">the String Format for the Filename</param>
        /// <returns>Export Filename</returns>
        private string GetExportFilename(string fileFormat)
        {
            return string.Format(fileFormat, DateTime.Now.ToString("yyyyMMdd_hhmmss"));
        }
    }
}
