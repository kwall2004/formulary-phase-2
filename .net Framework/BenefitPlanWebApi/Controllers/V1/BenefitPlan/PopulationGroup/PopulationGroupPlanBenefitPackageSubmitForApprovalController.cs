using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.Models.Enums.JSON;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.PopulationGroup
{
    /// <summary>
    /// The Population Group Plan Benefit Package Controller for Benefit Plan
    /// </summary>
    public class PopulationGroupPlanBenefitPackageSubmitForApprovalController : ApiController
    {
        /// <summarythe Population Group Plan Benefit Package BLL</summary>
        private IPopulationGroupPlanBenefitPackageBLL _populationGroupPlanBenefitPackageBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Population Group Plan Benefit Package Controller
        /// </summary>
        /// <param name="planBenefitPackageBLL">the Plan Benefit Package BLL</param>
        /// <param name="exceptionResponseGenerator">the Exception Response Generator</param>
        public PopulationGroupPlanBenefitPackageSubmitForApprovalController(IPopulationGroupPlanBenefitPackageBLL populationGroupPlanBenefitPackageBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _populationGroupPlanBenefitPackageBLL = populationGroupPlanBenefitPackageBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method to Get all Population Group Plan Benefit Packages by Population Group ID
        /// </summary>
        /// <param name="popGrpSK">the Population Group PBP ID</param>
        /// <returns>the Population Group Plan Benefit Package VM</returns>
        [HttpGet]
        public IHttpActionResult GetPopulationGroupPlanBenefitPackages(long popGrpPBPSK)
        {
            if (popGrpPBPSK != 0)
            {
                try
                {
                    List<Message> validationMessages = _populationGroupPlanBenefitPackageBLL.ValidatePopGrpPBPForSubmitForApproval(popGrpPBPSK);
                    var result = new QueryResult<Message>() { Rows = validationMessages, Count = validationMessages.Count() };
                    return Ok(result);
                }
                catch (Exception ex)
                {
                    return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
                }
            }
            else
            {
                return BadRequest("PopGrpSK is required, Invalid Request.");
            }
        }

    }
}
