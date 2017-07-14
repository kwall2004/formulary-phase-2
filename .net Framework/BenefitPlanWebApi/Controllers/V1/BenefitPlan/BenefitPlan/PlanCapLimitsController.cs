using Atlas.BenefitPlan.BLL.Interfaces;
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
    public class PlanCapLimitsController : ApiController
    {

        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanBLL _benefitPlanBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Controller for all the dropdowns that are connected to benefit plan only
        /// </summary>
        /// <param name="benefitPlanBLL">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public PlanCapLimitsController(IBenefitPlanBLL benefitPlanBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _benefitPlanBLL = benefitPlanBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get All Plan Cap Limits
        /// </summary>
        /// <param name="bnftPlanSK"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetAllPlanCapLimits(long bnftPlanSK)
        {
            try
            {
                List<PlanCapLimitsVM> planCapLimitsList = _benefitPlanBLL.GetAllPlanCapLimits(bnftPlanSK);
                var result = new QueryResult<PlanCapLimitsVM>() { Rows = planCapLimitsList, Count = planCapLimitsList.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Set Plan Cap Limit
        /// </summary>
        /// <param name="planCapLimit"></param>
        /// <returns></returns>
        [HttpPut]
        public IHttpActionResult SetPlanCapLimit(PlanCapLimitsVM planCapLimit)
        {
            planCapLimit.CurrentUser = UtilityFunctions.GetCurrentUser(planCapLimit.CurrentUser);

            try
            {
                if (ModelState.IsValid)
                {
                    PlanCapLimitsVM result = _benefitPlanBLL.AddOrUpdatePlanCapLimits(planCapLimit);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.PlanCapLimSK }));
                }
                else
                {
                    return Ok(JSONFunctions.AddUpdateErrorReponse(ModelState));
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
