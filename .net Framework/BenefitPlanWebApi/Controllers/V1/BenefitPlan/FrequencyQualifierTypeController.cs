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
    /// The Frequency Qualifier Type Controller for Benefit Plan
    /// </summary>
    public class FrequencyQualifierTypeController : ApiController
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
        public FrequencyQualifierTypeController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get all the Frequency Qualifier Types and return them in a list
        /// </summary>
        /// <returns>List of Frequency Qualifier Types</returns>
        [HttpGet]
        public IHttpActionResult FrequencyQualifierTypes()
        {
            try
            {
                List<FreqQulfrType> frequencyQualifierType = GetAllFrequencyQualifierTypes();
                var result = new QueryResult<FreqQulfrType>() { Rows = frequencyQualifierType, Count = frequencyQualifierType.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get All the Frequency Qualifier Types from the repository
        /// </summary>
        /// <returns>List of Frequency Qualifier Types</returns>
        private List<FreqQulfrType> GetAllFrequencyQualifierTypes()
        {
            using (var repo = _repoFactory.FreqQulfrType())
            {
                List<FreqQulfrType> frequencyQualifierType = repo.FindAll().ToList();
                return frequencyQualifierType;
            }
        }

    }
}
