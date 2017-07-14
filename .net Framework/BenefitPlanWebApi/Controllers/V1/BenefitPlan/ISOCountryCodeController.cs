using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan
{
    /// <summary>
    /// The ISO Country Code Controller for Benefit Plan
    /// </summary>
    public class ISOCountryCodeController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the ISO Country Code Controller
        /// </summary>
        /// <param name="repoFactory">the Benefit Plan Repository Factory</param>
        /// <param name="exceptionResponseGenerator">the Exception Response Generator</param>
        public ISOCountryCodeController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method to Get all ISO Country Codes
        /// </summary>
        /// <returns>a Query Result of Type ISOCountryCode</returns>
        [HttpGet]
        public IHttpActionResult GetAllCountryCodes()
        {
            try
            {
                using (var repo = _repoFactory.ISOCountryCode())
                {
                    List<ISOCntryCode> countries = repo.FindAll().ToList();
                    var result = new QueryResult<ISOCntryCode>() { Rows = countries, Count = countries.Count };
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