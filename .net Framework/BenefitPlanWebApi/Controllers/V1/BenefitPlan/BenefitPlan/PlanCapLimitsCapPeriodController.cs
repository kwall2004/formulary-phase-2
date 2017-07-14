using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    public class PlanCapLimitsCapPeriodController : ApiController
    {

        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Controller for all the dropdowns that are connected to benefit plan only
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public PlanCapLimitsCapPeriodController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        [HttpGet]
        public IHttpActionResult GetAllPlanCapLimPerQulfrType()
        {
            try
            {
                List<PlanCapLimPerQulfrType> planCapLimPerQulfrTypes = _repoFactory.PlanCapLimitPeriodQualifierType().FindAll().ToList();
                var result = new QueryResult<PlanCapLimPerQulfrType>() { Rows = planCapLimPerQulfrTypes, Count = planCapLimPerQulfrTypes.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
