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
    /// The Coverage Set Threshold Controller for Benefit Plan
    /// </summary>
    public class CoverageSetThresholdController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Coverage Set Threshold Controller
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public CoverageSetThresholdController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get all the Coverage Set Thresholds and return them in a list
        /// </summary>
        /// <returns>List of Coverage Set Thresholds</returns>
        [HttpGet]
        public IHttpActionResult CoverageSetThreshold()
        {
            try
            {
                List<CvrgSetThreshold> coverageSetThreshold = GetAllCoverageSetThresholds();
                var result = new QueryResult<CvrgSetThreshold>() { Rows = coverageSetThreshold, Count = coverageSetThreshold.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get All the Coverage Set Thresholds from the drepository
        /// </summary>
        /// <returns>List of Coverage Set Thresholds</returns>
        private List<CvrgSetThreshold> GetAllCoverageSetThresholds()
        {
            using (var repo = _repoFactory.CvrgSetThreshold())
            {
                List<CvrgSetThreshold> coverageSetThreshold = repo.FindAll().ToList();
                return coverageSetThreshold;
            }
        }

    }
}
