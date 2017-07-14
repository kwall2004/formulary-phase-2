using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.Core.DAL.Models.Containers;
using BenefitPlanWebApi.Services;
using System;
using System.Collections.Generic;
using System.Web.Http;
using Atlas.Core.WebApi.Services;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    public class EarlyRefillExceptionsController : ApiController
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
        public EarlyRefillExceptionsController(IBenefitPlanBLL benefitPlanBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _benefitPlanBLL = benefitPlanBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get All Early Refill Exceptions
        /// </summary>
        /// <param name="bnftPlanSK"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetAllEarlyRefillExceptions(long bnftPlanSK)
        {
            try
            {
                List<EarlyRefillExceptionsVM> earlyRefillExcpList = _benefitPlanBLL.GetAllEarlyRefillExceptions(bnftPlanSK);
                var result = new QueryResult<EarlyRefillExceptionsVM>() { Rows = earlyRefillExcpList, Count = earlyRefillExcpList.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Set Refill Exception
        /// </summary>
        /// <param name="refillException"></param>
        /// <returns></returns>
        [HttpPut]
        public IHttpActionResult SetEarlyRefillException(EarlyRefillExceptionsVM refillException)
        {
            refillException.CurrentUser = UtilityFunctions.GetCurrentUser(refillException.CurrentUser);

            try
            {
                if (ModelState.IsValid)
                {
                    EarlyRefillExceptionsVM result = _benefitPlanBLL.AddOrUpdateEarlyRefillException(refillException);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.EarlyRefillExcpSK }));
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