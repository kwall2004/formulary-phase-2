using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Models.Containers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    /// <summary>
    /// The Benefit Plan Coverage Phase Type Controller for Benefit Plan
    /// </summary>
    public class CoveragePhaseTypeController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Coverage Phase Type Controller
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public CoveragePhaseTypeController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get all the coverage phase types and return them in a list
        /// </summary>
        /// <returns>List of BenefitServiceTypes</returns>
        [HttpGet]
        public IHttpActionResult CoveragePhaseTypes()
        {
            try
            {
                List<CvrgPhaseType> coveragePhaseTypeList = _repoFactory.CoveragePhaseType().FindAll().ToList();
                var result = new QueryResult<CvrgPhaseType>() { Rows = coveragePhaseTypeList, Count = coveragePhaseTypeList.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get all the coverage phase types by Benefit Plan
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan ID</param>
        /// <returns>List of BenefitServiceTypes</returns>
        [HttpGet]
        public IHttpActionResult BenefitCoveragePhaseTypes(long bnftPlanSK)
        {
            try
            {
                List<BenefitPlanCoveragePhase> coveragePhaseTypeList = _repoFactory.CoveragePhase().FindAll(w => w.BnftPlanSK == bnftPlanSK)
                    .Select(s => new BenefitPlanCoveragePhase()
                    {
                        BnftPlanSK = s.BnftPlanSK,
                        CvrgPhaseSK = s.CvrgPhaseSK,
                        CvrgPhaseTypeSK = s.CvrgPhaseTypeSK,
                        CvrgPhaseCode = s.CvrgPhaseType.CvrgPhaseCode
                    }).ToList();
                return Ok(new QueryResult<BenefitPlanCoveragePhase>() { Rows = coveragePhaseTypeList, Count = coveragePhaseTypeList.Count });
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
