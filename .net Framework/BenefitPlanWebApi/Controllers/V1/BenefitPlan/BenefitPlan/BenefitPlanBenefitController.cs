using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Models.Containers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Atlas.Core.WebApi.Services;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    /// <summary>
    /// The Benefit Plan Benefit Controller for Benefit Plan
    /// </summary>
    public class BenefitPlanBenefitController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the BenefitPlanBenefit Controller
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public BenefitPlanBenefitController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get all the BenefitPlanBenefits and return them in a list
        /// </summary>
        /// <returns>List of BenefitPlanBenefits</returns>
        [HttpGet]
        public IHttpActionResult BenefitPlanBenefits()
        {
            try
            {
                List<BnftPlanBnft> bnftPlanBnfts = GetAllBenefitPlanBenefits();
                var result = new QueryResult<BnftPlanBnft>() { Rows = bnftPlanBnfts, Count = bnftPlanBnfts.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get All the BenefitPlanBenefits from the drepository
        /// </summary>
        /// <returns>List of BenefitPlanBenefits</returns>
        private List<BnftPlanBnft> GetAllBenefitPlanBenefits()
        {
            using (var repo = _repoFactory.BenefitPlanBenefit())
            {
                List<BnftPlanBnft> bnftPlanBnfts = repo.FindAll().ToList();
                return bnftPlanBnfts;
            }
        }

    }
}