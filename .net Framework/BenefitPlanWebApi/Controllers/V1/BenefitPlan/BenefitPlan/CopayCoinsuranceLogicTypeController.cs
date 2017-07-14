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
    /// <summary>
    /// The Copay Coinsurance Logic Type Controller for Benefit Plan
    /// </summary>
    public class CopayCoinsuranceLogicTypeController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Copay Coinsurance Logic Type Controller
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public CopayCoinsuranceLogicTypeController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get All Copay Coinsurance Logic Types
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult CopayCoinsuranceLogicTypes()
        {
            try
            {
                List<CopayCoinsuranceLogicType> copayCoinsuranceLogicTypes = _repoFactory.CopayCoinsuranceLogicType().FindAll().ToList();
                var result = new QueryResult<CopayCoinsuranceLogicType>() { Rows = copayCoinsuranceLogicTypes, Count = copayCoinsuranceLogicTypes.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
