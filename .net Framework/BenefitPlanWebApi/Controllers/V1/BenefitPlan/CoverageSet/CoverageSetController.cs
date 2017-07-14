using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Models.Containers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Atlas.Core.WebApi.Services;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.CoverageSet
{
    /// <summary>
    /// The Coverage Set Controller for Benefit Plan
    /// </summary>
    public class CoverageSetController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the CoverageSet Controller
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public CoverageSetController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get all the CoverageSets and return them in a list
        /// </summary>
        /// <param name="BnftPlanSK">BnftPlanSK</param>
        /// <returns>List of CoverageSets</returns>
        [HttpGet]
        public IHttpActionResult CoverageSets(long BnftPlanSK)
        {
            try
            {
                List<CvrgSet> coverageSets = GetAllCoverageSets(BnftPlanSK);
                var result = new QueryResult<CvrgSet>() { Rows = coverageSets, Count = coverageSets.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get All the CoverageSets from the repository
        /// </summary>
        /// <param name="BnftPlanSK">BnftPlanSK</param> 
        /// <returns>List of CoverageSets</returns>
        private List<CvrgSet> GetAllCoverageSets(long BnftPlanSK)
        {
            using (var repo = _repoFactory.CoverageSet())
            {
                List<CvrgSet> coverageSets = repo.FindAll(c => c.BnftPlanSK == BnftPlanSK).ToList();
                return coverageSets;
            }
        }

    }
}