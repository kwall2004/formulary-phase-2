using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.Models.Enums.JSON;
using Atlas.Core.WebApi.Services;
using BenefitPlanWebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.Integration
{
    /// <summary>
    /// The Benefit Plan Integration Controller for Benefit Plan
    /// </summary>
    public class BenefitPlanIntegrationController : ApiController
    {
        /// <summarythe Integration BLL</summary>
        private IIntegrationBLL _integrationBLL;

        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor for MCS Integration Controller
        /// </summary>
        /// <param name="_integrationBLL">the Integration BLL for Benefit Plan</param>
        /// <param name="repoFactory">the Benefit Plan Repository Factory</param>
        /// <param name="exceptionResponseGenerator">the Exception Response Generator</param>
        public BenefitPlanIntegrationController(IIntegrationBLL integrationBLL,
            IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _integrationBLL = integrationBLL;
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Post Method to Export Benefit Plan
        /// </summary>
        /// <param name="benefitPlanToExport">the Benefit Plan to Export</param>
        /// <returns>JSON AddUpdate Response</returns>
        [HttpPost]
        public IHttpActionResult SendPlantoMCS(BenefitPlanIntegration benefitPlanToExport)
        {
            try
            {
                if (_integrationBLL.ExportBenefitPlan(benefitPlanToExport))
                {
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>()));
                }
                else
                {
                    return Ok(JSONFunctions.AddUpdateErrorReponse(new List<Message>() { new Message() { MessageText = "Did not produce an XML File", Type = JSONMessageType.Error.ToString() } }));
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
