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

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    public class DeductibleExceptionsController : ApiController
    {
        /// <summary>
        /// Benefit Plan BLL
        /// </summary>
        private IBenefitPlanBLL _benefitPlanBLL;

        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        public DeductibleExceptionsController(IBenefitPlanBLL benefitPlanBLL, IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _benefitPlanBLL = benefitPlanBLL;
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get all Deductible Exceptions
        /// </summary>
        /// <param name="bnftPlanSK"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetDeductibleExceptions(long bnftPlanSK)
        {
            try
            {
                List<DeductibleExceptionVM> dedExcList = _benefitPlanBLL.GetAllDeductibleExceptions(bnftPlanSK);
                var result = new QueryResult<DeductibleExceptionVM>() { Rows = dedExcList, Count = dedExcList.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Set Deductible Exception
        /// </summary>
        /// <param name="deductibleexception"></param>
        /// <returns></returns>
        [HttpPut]
        public IHttpActionResult SetDeductibleException(DeductibleExceptionVM deductibleException)
        {
            try
            {
                deductibleException.CurrentUser = UtilityFunctions.GetCurrentUser(deductibleException.CurrentUser);

                if (ModelState.IsValid)
                {
                    return Ok(_benefitPlanBLL.AddOrUpdateDeductibleException(deductibleException));
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