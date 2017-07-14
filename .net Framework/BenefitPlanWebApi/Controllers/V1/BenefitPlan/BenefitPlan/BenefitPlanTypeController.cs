using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

//
//This file is to be deleted.
//

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan
{
    /// <summary>
    /// The Benefit Plan Type for Benefit Plan
    /// </summary>
    public class BenefitPlanTypeController : ApiController
    { 
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        public BenefitPlanTypeController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method to Get all Plan Benefit Types
        /// </summary>
        /// <returns>Query Result</returns>
        [HttpGet]
        public IHttpActionResult GetAllBenefitPlanTypes()
        {
            try
            {
                using (var repo = _repoFactory.BenefitPlanType())
                {
                    List<BnftPlanType> benefitplantypes = repo.FindAll().ToList();
                    var result = new QueryResult<BnftPlanType>() { Rows = benefitplantypes, Count = benefitplantypes.Count };
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
