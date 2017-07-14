using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Models.Containers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Atlas.Core.WebApi.Services;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.CriteriaGroup
{
    /// <summary>
    /// The Criteria Condition Type Controller for Benefit Plan
    /// </summary>
    public class CriteriaConditionTypeController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Criteria Condition Type Controller
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public CriteriaConditionTypeController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get all the Criteria Condition Types and return them in a list
        /// </summary>
        /// <returns>List of Criteria Condition Types</returns>
        [HttpGet]
        public IHttpActionResult CriteriaConditionType()
        {
            try
            {
                List<CrtriaCondType> crtriaCondType = GetAllCriteriaConditionTypes();
                var result = new QueryResult<CrtriaCondType>() { Rows = crtriaCondType, Count = crtriaCondType.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get All the Criteria Condition Types from the repository
        /// </summary>
        /// <returns>List of Criteria Condition Types</returns>
        private List<CrtriaCondType> GetAllCriteriaConditionTypes()
        {
            using (var repo = _repoFactory.CriteriaConditionType())
            {
                List<CrtriaCondType> crtriaCondType = repo.FindAll().ToList();
                return crtriaCondType;
            }
        }

    }
}