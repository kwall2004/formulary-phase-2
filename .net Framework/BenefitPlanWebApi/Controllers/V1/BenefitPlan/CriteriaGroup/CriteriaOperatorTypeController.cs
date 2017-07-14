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
    /// The Criteria Operator Type Controller for Benefit Plan
    /// </summary>
    public class CriteriaOperatorTypeController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Criteria Operator Type Controller
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public CriteriaOperatorTypeController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get all the Criteria Operator Types and return them in a list
        /// </summary>
        /// <returns>List of Criteria Operator Types</returns>
        [HttpGet]
        public IHttpActionResult CriteriaOperatorType()
        {
            try
            {
                List<CrtriaOperType> crtriaOperTypes = GetAllCriteriaOperatorTypes();
                var result = new QueryResult<CrtriaOperType>() { Rows = crtriaOperTypes, Count = crtriaOperTypes.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get All the Criteria Operator Types from the drepository
        /// </summary>
        /// <returns>List of Criteria Operator Types</returns>
        private List<CrtriaOperType> GetAllCriteriaOperatorTypes()
        {
            using (var repo = _repoFactory.CriteriaOperatorType())
            {
                List<CrtriaOperType> crtriaOperTypes = repo.FindAll().ToList();
                return crtriaOperTypes;
            }
        }

    }
}