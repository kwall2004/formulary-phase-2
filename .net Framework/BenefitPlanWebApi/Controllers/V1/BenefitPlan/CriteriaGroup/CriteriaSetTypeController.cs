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
    /// The Criteria Set Type Controller for Benefit Plan
    /// </summary>
    public class CriteriaSetTypeController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the CriteriaSetType Controller
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public CriteriaSetTypeController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get all the CriteriaSetTypes and return them in a list
        /// </summary>
        /// <returns>List of CriteriaSetTypes</returns>
        [HttpGet]
        public IHttpActionResult CriteriaSetTypes()
        {
            try
            {
                List<CrtriaSetType> criteriaSetTypes = GetAllCriteriaSetTypes();
                var result = new QueryResult<CrtriaSetType>() { Rows = criteriaSetTypes, Count = criteriaSetTypes.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get All the CriteriaSetTypes from the repository
        /// </summary>
        /// <returns>List of CriteriaSetTypes</returns>
        private List<CrtriaSetType> GetAllCriteriaSetTypes()
        {
            using (var repo = _repoFactory.CrtriaSetType())
            {
                List<CrtriaSetType> criteriaSetTypes = repo.FindAll().ToList();
                return criteriaSetTypes;
            }
        }

    }
}