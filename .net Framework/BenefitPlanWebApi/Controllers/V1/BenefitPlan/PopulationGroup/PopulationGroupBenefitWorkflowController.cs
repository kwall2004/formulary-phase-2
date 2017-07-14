using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.Models.Enums.JSON;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using BenefitPlanWebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.PopulationGroup
{
    /// <summary>
    /// The Population Group Benefit Workflow Controller for Benefit Plan
    /// </summary>
    public class PopulationGroupBenefitWorkflowController : ApiController
    {
        /// <summarythe Population Group Plan Benefit Package BLL</summary>
        private IPopulationGroupPlanBenefitPackageBLL _populationGroupPlanBenefitPackageBLL;

        /// <summarythe Integration BLL</summary>
        private IIntegrationBLL _integrationBLL;

        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Population Group Plan Benefit Configuration Controller
        /// </summary>
        /// <param name="planBenefitPackageBLL">the Plan Benefit Package BLL</param>
        /// <param name="_integrationBLL">the Integration BLL for Benefit Plan</param>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the Exception Response Generator</param>
        public PopulationGroupBenefitWorkflowController(IPopulationGroupPlanBenefitPackageBLL populationGroupPlanBenefitPackageBLL, IIntegrationBLL integrationBLL,
            IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _populationGroupPlanBenefitPackageBLL = populationGroupPlanBenefitPackageBLL;
            _integrationBLL = integrationBLL;
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get All Work Flow records
        /// </summary>
        /// <param name="statType"></param>
        /// <param name="startDate"></param>
        /// <param name="endDate"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetAllWorkflows(long statusType, Nullable<DateTime> startDate, Nullable<DateTime> endDate)
        {
            try
            {
                List<PopulationGroupBenefitWorkflowVM> workflowList = _populationGroupPlanBenefitPackageBLL.GetAllWorkflows(statusType, startDate, endDate);
                var result = new QueryResult<PopulationGroupBenefitWorkflowVM>() { Rows = workflowList, Count = workflowList.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Write a workflow record
        /// </summary>
        /// <param name="workflowUpdate"></param>
        /// <returns></returns>
        [HttpPut]
        public IHttpActionResult SetWorkflow(PopulationGroupBenefitWorkflowUpdateVM workflowUpdate)
        {
            workflowUpdate.CurrentUser = UtilityFunctions.GetCurrentUser(workflowUpdate.CurrentUser);

            try
            {
                if (ModelState.IsValid)
                {
                    //  Check if the New Status is Approved, If it is then Export information to either MCS or Merlin
                    StatType status = _repoFactory.StatusType().FindAll(f => f.StatTypeSK == workflowUpdate.StatTypeSK).FirstOrDefault();
                    switch (status.StatDesc)
                    {
                        case "Pending":
                        case "Level 1 Approved":
                        case "Approved":
                            List<Message> messages = _populationGroupPlanBenefitPackageBLL.ValidatePopGrpPBPServiceArea(workflowUpdate.PopGrpPBPSK);
                            if (messages.Count() > 0)
                            {
                                return Ok(JSONFunctions.AddUpdateErrorReponse(messages));
                            }

                            if (status.StatDesc == "Approved")
                            {
                                if (!_integrationBLL.ExportBenefitPlan(new BenefitPlanIntegration() { PopGrpPBPSK = workflowUpdate.PopGrpPBPSK, isSandbox = false }))
                                {
                                    return Ok(JSONFunctions.AddUpdateErrorReponse(new List<Message>() { new Message() { MessageText = "Unable to export Benefit Plan(s) to target system, please contact help desk.", Type = JSONMessageType.Error.ToString() } }));
                                };
                            }
                            break;
                    }

                    //  Update the Pop Group PBP Status
                    PopulationGroupBenefitWorkflowUpdateVM result = _populationGroupPlanBenefitPackageBLL.InsertWorkflow(workflowUpdate);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.PopGrpPBPStatSK }));
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