using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Models.Containers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Atlas.Core.WebApi.Services;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan
{
    /// <summary>
    /// The Prescriber Controller for Benefit Plan
    /// </summary>
    public class PrescriberController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Frequency Qualifier Type Controller
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public PrescriberController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }


        /// <summary>
        /// Get all the Prescribers and return them in a list
        /// </summary>
        /// <param name="query">the NPI to search for</param>
        /// <returns>List of Prescribers</returns>
        [HttpGet]
        public IHttpActionResult Prescribers(string query)
        {
            try
            {
                List<Prescbr> prescriber = _repoFactory.Prescriber().FindAll(q=>q.PrescbrNPI.StartsWith(query)).OrderBy(o=>o.PrescbrNPI).Take(100).ToList();
                var result = new QueryResult<Prescbr>() { Rows = prescriber, Count = prescriber.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get all the Prescribers and return them in a list
        /// </summary>
        /// <returns>List of Prescribers</returns>
        [HttpGet]
        public IHttpActionResult Prescribers()
        {
            try
            {
                List<Prescbr> prescriber = _repoFactory.Prescriber().FindAll().OrderBy(o => o.PrescbrNPI).Take(100).ToList();
                var result = new QueryResult<Prescbr>() { Rows = prescriber, Count = prescriber.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
