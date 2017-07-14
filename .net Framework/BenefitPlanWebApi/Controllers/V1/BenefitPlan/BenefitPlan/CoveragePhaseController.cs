using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using BenefitPlanWebApi.Services;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    /// <summary>
    /// The Benefit Plan Coverage Phase Controller for Benefit Plan
    /// </summary>
    public class CoveragePhaseController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanBLL _benefitPlanBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        public CoveragePhaseController(IBenefitPlanBLL benefitPlanBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _benefitPlanBLL = benefitPlanBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Write a coverage phase record
        /// </summary>
        /// <param name="cvrgPhase"></param>
        /// <returns></returns>
        [HttpPut]
        public IHttpActionResult SetCoveragePhase(CoveragePhaseVM cvrgPhase)
        {
            try
            {
                cvrgPhase.CurrentUser = UtilityFunctions.GetCurrentUser(cvrgPhase.CurrentUser);

                if (ValidateCoveragePhase(cvrgPhase))
                {
                    CoveragePhaseVM result = _benefitPlanBLL.AddOrUpdateCoveragePhase(cvrgPhase);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.CvrgPhaseSK }));
                }
                else
                {
                    return Ok(JSONFunctions.PopulationMessages(ModelState));
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get all coverage phase records by bnftPlanSK
        /// </summary>
        /// <param name="bnftPlanSK"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetAllCoveragePhase(long bnftPlanSK)
        {
            try
            {
                List<CoveragePhaseVM> coveragePhaseList = _benefitPlanBLL.GetAllCoveragePhase(bnftPlanSK);
                var result = new QueryResult<CoveragePhaseVM>() { Rows = coveragePhaseList, Count = coveragePhaseList.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Validate CoveragePhase
        /// </summary>
        /// <param name="coveragePhase">the CoveragePhase View Model to Validate</param>
        private bool ValidateCoveragePhase(CoveragePhaseVM coveragePhase)
        {
            if (ModelState.IsValid)
            {
                List<Message> result = new List<Message>();

                if (coveragePhase.CvrgPhaseTotalDrugSpend == null && coveragePhase.CvrgPhaseTrOOPMax == null)
                {
                    result.Add(new Message() { MessageText = string.Format("Coverage Phase Sequence: ({0}) must have a Total Drug Spend or a TrOOP.", coveragePhase.CvrgPhaseSeq), Fieldname = "coveragePhase.CvrgPhaseSeq" });
                }

                foreach (Message item in result)
                {
                    ModelState.AddModelError(item.Fieldname, item.MessageText);
                }
            }

            return ModelState.IsValid;
        }
    }
}