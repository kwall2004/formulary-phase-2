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
    /// The Network Controller for Benefit Plan
    /// </summary>
    public class NetworkController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Network Controller
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public NetworkController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get all the Networks and return them in a list
        /// </summary>
        /// <returns>List of Networks</returns>
        [HttpGet]
        public IHttpActionResult Networks()
        {
            try
            {
                List<Ntwrk> networks = GetAllNetworks();
                var result = new QueryResult<Ntwrk>() { Rows = networks, Count = networks.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get All the Networks from the repository
        /// </summary>
        /// <returns>List of Networks</returns>
        private List<Ntwrk> GetAllNetworks()
        {
            using (var repo = _repoFactory.Network())
            {
                List<Ntwrk> networks = repo.FindAll().ToList();
                return networks;
            }
        }

    }
}