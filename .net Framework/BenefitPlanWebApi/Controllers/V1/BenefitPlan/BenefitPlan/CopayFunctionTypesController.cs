using Atlas.BenefitPlan.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    public class CopayFunctionTypesController : ApiController
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
        public CopayFunctionTypesController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }


        /// <summary>
        /// Get all the Copay Func Types and return them in a list
        /// </summary>
        /// <returns>List of Copay Func Types</returns>
        [HttpGet]
        public IHttpActionResult CopayFunctionTypes()
        {
            try
            {
                using (var repo = _repoFactory.CopayFunctionType())
                {
                    List<CopayFuncType> copayFuncTypes = repo.FindAll().ToList();
                    var result = new QueryResult<CopayFuncType>() { Rows = copayFuncTypes, Count = copayFuncTypes.Count };
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
   
    }
}
