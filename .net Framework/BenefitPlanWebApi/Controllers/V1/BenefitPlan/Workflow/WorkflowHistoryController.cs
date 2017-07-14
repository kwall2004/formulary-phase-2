using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.Search
{
    /// <summary>
    /// WorkflowHistory Controller
    /// </summary>
    public class WorkflowHistoryController : ApiController
    {
        /// <summarythe Population Group Plan Benefit Package BLL</summary>
        private IPopulationGroupPlanBenefitPackageBLL _populationGroupPlanBenefitPackageBLL;

        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor for the WorkflowHistory Controller
        /// </summary>
        /// <param name="repoFactory"></param>
        /// <param name="exceptionResponseGenerator"></param>
        public WorkflowHistoryController(IPopulationGroupPlanBenefitPackageBLL populationGroupPlanBenefitPackageBLL,
            IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _populationGroupPlanBenefitPackageBLL = populationGroupPlanBenefitPackageBLL;
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get All Histories
        /// </summary>
        /// <param name="popGrpPBPSK"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetHistories(long popGrpPBPSK)
        {
            try
            {
                List<PopulationGroupBenefitWorkflowHistoryVM> historyList = _populationGroupPlanBenefitPackageBLL.GetAllHistories(popGrpPBPSK);
                var result = new QueryResult<PopulationGroupBenefitWorkflowHistoryVM>() { Rows = historyList, Count = historyList.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}