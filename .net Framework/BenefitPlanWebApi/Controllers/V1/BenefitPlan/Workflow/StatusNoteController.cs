using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using BenefitPlanWebApi.Services;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.Search
{
    public class StatusNoteController : ApiController
    {
        /// <summarythe Population Group Plan Benefit Package BLL</summary>
        private IPopulationGroupPlanBenefitPackageBLL _populationGroupPlanBenefitPackageBLL;

        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor for statusnote controller
        /// </summary>
        /// <param name="populationGroupPlanBenefitPackageBLL"></param>
        /// <param name="repoFactory"></param>
        /// <param name="exceptionResponseGenerator"></param>
        public StatusNoteController(IPopulationGroupPlanBenefitPackageBLL populationGroupPlanBenefitPackageBLL,
            IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _populationGroupPlanBenefitPackageBLL = populationGroupPlanBenefitPackageBLL;
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get All Notes
        /// </summary>
        /// <param name="popGrpPBPSK"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetHistories(long popGrpPBPStatSK)
        {
            try
            {
                List<StatusNoteVM> statusNoteList = _populationGroupPlanBenefitPackageBLL.GetAllNotes(popGrpPBPStatSK);
                var result = new QueryResult<StatusNoteVM>() { Rows = statusNoteList, Count = statusNoteList.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get All Notes not by status
        /// </summary>
        /// <param name="popGrpPBPSK"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetHistoriesByPopGrpPBPSK(long popGrpPBPSK)
        {
            try
            {
                List<StatusNoteVM> statusNoteList = _populationGroupPlanBenefitPackageBLL.GetAllNotesByPopGrpPBPSK(popGrpPBPSK);
                var result = new QueryResult<StatusNoteVM>() { Rows = statusNoteList, Count = statusNoteList.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Set Status Note
        /// </summary>
        /// <param name="statusNote"></param>
        /// <returns></returns>
        [HttpPut]
        public IHttpActionResult SetStatusNote(StatusNoteVM statusNote)
        {
            statusNote.CurrentUser = UtilityFunctions.GetCurrentUser(statusNote.CurrentUser);

            try
            {
                if (ModelState.IsValid)
                {
                    StatusNoteVM result = _populationGroupPlanBenefitPackageBLL.InsertStatusNote(statusNote);
                    return Ok(result.StatNoteSK);

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
    }
}