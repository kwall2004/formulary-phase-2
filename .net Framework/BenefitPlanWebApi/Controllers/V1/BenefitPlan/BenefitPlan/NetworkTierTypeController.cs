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
    /// The Network Tier Type Controller for Benefit Plan
    /// </summary>
    public class NetworkTierTypeController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Network Tier Type Controller
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public NetworkTierTypeController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get all the Network Tier Types and return them in a list
        /// </summary>
        /// <returns>List of Network Tier Types</returns>
        [HttpGet]
        public IHttpActionResult NetworkTierTypes()
        {
            try
            {
                List<NtwrkTierType> networkTierTypes = GetAllNetworkTierTypes();
                var result = new QueryResult<NtwrkTierType>() { Rows = networkTierTypes, Count = networkTierTypes.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get All the NetworkTierTypes from the repository
        /// </summary>
        /// <returns>List of NetworkTierTypes</returns>
        private List<NtwrkTierType> GetAllNetworkTierTypes()
        {
            using (var repo = _repoFactory.NetworkTierType())
            {
                List<NtwrkTierType> networkTierTypes = repo.FindAll().ToList();
                return networkTierTypes;
            }
        }

    }
}
