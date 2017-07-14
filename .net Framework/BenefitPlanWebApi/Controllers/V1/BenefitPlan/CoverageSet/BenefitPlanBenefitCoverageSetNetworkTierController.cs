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
    /// The Benefit Plan Benefit Coverage Set Network Tier Controller for Benefit Plan
    /// </summary>
    public class BenefitPlanBenefitCoverageSetNetworkTierController : ApiController
    {

        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Coverage Set Network Tier Controller
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public BenefitPlanBenefitCoverageSetNetworkTierController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get all the BenefitPlanBenefitCoverageSetNetworkTiers and return them in a list
        /// </summary>
        /// <returns>List of BenefitPlanBenefitCoverageSetNetworkTiers</returns>
        [HttpGet]
        public IHttpActionResult BenefitPlanBenefitCoverageSetNetworkTiers()
        {
            try
            {
                List<BnftPlanBnftCvrgSetNtwrkTier> bnftPlanBnftCvrgSetNtwrkTiers = GetAllBenefitPlanBenefitCoverageSetNetworkTiers();
                var result = new QueryResult<BnftPlanBnftCvrgSetNtwrkTier>() { Rows = bnftPlanBnftCvrgSetNtwrkTiers, Count = bnftPlanBnftCvrgSetNtwrkTiers.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get All the BenefitPlanBenefitCoverageSetNetworkTier from the drepository
        /// </summary>
        /// <returns>List of BenefitPlanBenefitCoverageSetNetworkTier</returns>
        private List<BnftPlanBnftCvrgSetNtwrkTier> GetAllBenefitPlanBenefitCoverageSetNetworkTiers()
        {
            using (var repo = _repoFactory.BenefitPlanBenefitCoverageSetNetworkTier())
            {
                List<BnftPlanBnftCvrgSetNtwrkTier> bnftPlanBnftCvrgSetNtwrkTiers = repo.FindAll().ToList();
                return bnftPlanBnftCvrgSetNtwrkTiers;
            }
        }

    }
}