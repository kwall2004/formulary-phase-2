using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.EDIMerlinService;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Models.DataCompare;
using Atlas.BenefitPlan.DAL.Models.DataCompare.Extensions;
using Atlas.BenefitPlan.DAL.Models.DataCompare.Merlin;
using Atlas.Configuration;
using Atlas.Core.BLL.Wrapper.Contract;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Channels;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Atlas.BenefitPlan.BLL
{
    /// <summary>
    /// Class Data Compare Merlin BLL for Benefit Plan
    /// </summary>
    public class DataCompareMerlinBLL : IDataCompareMerlinBLL
    {
        // =============================================================================
        //  TODO:  Add Output for Data Compare Table Structure for Header, Detail and Messages
        // =============================================================================

        /// <summary>
        /// the Benefit Plan Repository Factory
        /// </summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>
        /// the Benefit Plan Configuration
        /// </summary>
        private IBenefitPlanConfig _config;

        /// <summary>
        /// the File System IO Wrapper
        /// </summary>
        private IFile _file;

        /// <summary>
        /// The Data Compare Merlin BLL for Benefit Plan
        /// </summary>
        /// <param name="repoFactory">The Benefit Plan Repository Factory</param>
        /// <param name="config">the Benefit Plan Configuration</param>
        /// <param name="file">the File System IO Wrapper</param>
        public DataCompareMerlinBLL(IBenefitPlanRepositoryFactory repoFactory, IBenefitPlanConfig config, IFile file)
        {
            _repoFactory = repoFactory;
            _config = config;
            _file = file;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<CompareResults> ComparePlan(long? bnftPlanSK, string planPgmCode)
        {
            XDocument fromAtlasXML = GetAtlasPharmacyBenefitPlan(bnftPlanSK, planPgmCode);
            XDocument fromMerlinXML = GetMerlinPharmacyBenefitPlan(bnftPlanSK, planPgmCode);

            AtlasBenefitPlanForMerlin fromAtlas = new AtlasBenefitPlanForMerlin().Load(fromAtlasXML.Root);
            AtlasBenefitPlanForMerlin fromMerlin = new AtlasBenefitPlanForMerlin().Load(fromMerlinXML.Root);

            List<CompareResults> results = fromAtlas.CompareEx(fromMerlin);
            return results;
        }

        /// <summary>
        /// Get the Pharmacy Benefit Plan from Atlas
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan Key</param>
        /// <param name="planPgmCode">the Plan Program Code</param>
        /// <returns>the XML Document</returns>
        private XDocument GetAtlasPharmacyBenefitPlan(long? bnftPlanSK, string planPgmCode)
        {
            TextReader tr = new StringReader(GetAtlasPharmacyBenefitPlanXML(bnftPlanSK, planPgmCode));
            return XDocument.Load(tr);
        }

        /// <summary>
        /// Get the Pharmacy Benefit Plan from Merlin
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan Key</param>
        /// <param name="planPgmCode">the Plan Program Code</param>
        /// <returns>the XML Document</returns>
        private XDocument GetMerlinPharmacyBenefitPlan(long? bnftPlanSK, string planPgmCode)
        {
            TextReader tr = new StringReader(GetMerlinPharmacyBenefitPlanXML(bnftPlanSK, planPgmCode));
            return XDocument.Load(tr);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="bnftPlanSK"></param>
        /// <param name="planPgmCode"></param>
        /// <returns></returns>
        private string GetAtlasPharmacyBenefitPlanXML(long? bnftPlanSK, string planPgmCode)
        {
            try
            {
                return _repoFactory.AtlasBenefitPlanStoredProcs().ExportBenefitPlanToMerlin(bnftPlanSK, planPgmCode);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="bnftPlanSK"></param>
        /// <param name="planPgmCode"></param>
        /// <returns></returns>
        private string GetMerlinPharmacyBenefitPlanXML(long? bnftPlanSK, string planPgmCode)
        {
            try
            {
                string atlasRecordId = GetAtlasRecordID(bnftPlanSK, planPgmCode);

                EDIMerlinObjClient clientEDIMerlin = GetMerlinClientObject();
                getXMLOutputForPlanRequest request = new getXMLOutputForPlanRequest(_config.MerlinSoapSessionID, atlasRecordId);
                getXMLOutputForPlanResponse response = new getXMLOutputForPlanResponse();

                response.result = clientEDIMerlin.getXMLOutputForPlan(
                    request.pSessionID, request.pAtlasRecordId, 
                    out response.pDataXML, out response.pResult, out response.pMessage);

                return response.pDataXML;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="bnftPlanSK"></param>
        /// <param name="planPgmCode"></param>
        /// <returns></returns>
        private string GetAtlasRecordID(long? bnftPlanSK, string planPgmCode)
        {
            PopGrpPBP popGrpPBP = _repoFactory.PopulationGroupPlanBenefitPackage().FindAll(w => w.PlanPgmCode == planPgmCode).FirstOrDefault();
            return (popGrpPBP != null) ? string.Format("PGPBP{0}", popGrpPBP.PopGrpPBPSK) : string.Empty;
        }

        private EDIMerlinObjClient GetMerlinClientObject()
        {
            Binding binding = new BasicHttpBinding() { MaxReceivedMessageSize = 2097152 };
            EndpointAddress endpointAddress = new EndpointAddress(_config.MerlinSoapURL);

            return new EDIMerlinObjClient(binding, endpointAddress);
        }
    }
}
