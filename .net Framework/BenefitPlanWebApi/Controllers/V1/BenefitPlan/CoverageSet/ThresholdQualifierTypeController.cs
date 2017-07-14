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
    /// The Threshold Qualifier Type Controller for Benefit Plan
    /// </summary>
    public class ThresholdQualifierTypeController : ApiController
    {

        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Threshold Qualifier Type Controller
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public ThresholdQualifierTypeController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get all the Threshold Qualifier Types and return them in a list
        /// </summary>
        /// <returns>List of Threshold Qualifier Types</returns>
        [HttpGet]
        public IHttpActionResult ThresholdQualifierTypes()
        {
            try
            {
                List<ThresholdQulfrType> thresholdQulfrType = GetAllThresholdQualifierTypes();
                var result = new QueryResult<ThresholdQulfrType>() { Rows = thresholdQulfrType, Count = thresholdQulfrType.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get All the ThresholdQualifierTypes from the repository
        /// </summary>
        /// <returns>List of ThresholdQualifierTypes</returns>
        private List<ThresholdQulfrType> GetAllThresholdQualifierTypes()
        {
            using (var repo = _repoFactory.ThresholdQualifierType())
            {
                List<ThresholdQulfrType> thresholdQulfrType = repo.FindAll().ToList();
                return thresholdQulfrType;
            }
        }
    }
}
