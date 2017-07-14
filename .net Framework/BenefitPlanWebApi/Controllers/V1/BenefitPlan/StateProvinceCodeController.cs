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
    /// The State Province Code Controller for Benefit Plan
    /// </summary>
    public class StateProvinceCodeController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the State Province Controller
        /// </summary>
        /// <param name="repoFactory">the Benefit Plan Repository Factory</param>
        /// <param name="exceptionResponseGenerator">the Exception Response Generator</param>
        public StateProvinceCodeController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method to Get all State and Province Codes for a Country
        /// </summary>
        /// <param name="isoCountryCodeSK">the ISO Country Code ID</param>
        /// <returns>List of StPrvncCode entities</returns>
        [HttpGet]
        public IHttpActionResult GetAllStateProvinceCodes(Int64 isoCountryCodeSK)
        {
            try
            {
                List<StPrvncCode> states = GetStateProvincebyCountry(isoCountryCodeSK);
                var result = new QueryResult<StPrvncCode>() { Rows = states, Count = states.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        #region " Private Methods "
        /// <summary>
        /// Get the States and Province for a Country Code
        /// </summary>
        /// <param name="isoCountryCodeSK">the ISO Country Code ID</param>
        /// <returns>List of StPrvncCode entities</returns>
        private List<StPrvncCode> GetStateProvincebyCountry(Int64 isoCountryCodeSK)
        {
            using (var repo = _repoFactory.StateProvinceCode())
            {
                List<StPrvncCode> states = repo.FindAll(s => s.ISOCntryCodeSK == isoCountryCodeSK).ToList();
                return states;
            }
        }
        #endregion
    }
}
