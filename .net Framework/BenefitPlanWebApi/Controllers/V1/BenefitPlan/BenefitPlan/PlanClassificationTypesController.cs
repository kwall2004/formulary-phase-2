using Atlas.BenefitPlan.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    public class PlanClassificationTypesController : ApiController
    {

        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Controller for all the dropdowns that are connected to benefit plan only
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public PlanClassificationTypesController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }


        #region Plan Classifications
        /// <summary>
        /// Get all the plan classifications and return them in a list
        /// </summary>
        /// <returns>List of plan Classifications</returns>
        [HttpGet]
        public IHttpActionResult PlanClassificationTypes()
        {
            try
            {
                List<PlanClsfcnType> planClsfcnTypes = GetAllPlanClassificationTypes();
                var result = new QueryResult<PlanClsfcnType>() { Rows = planClsfcnTypes, Count = planClsfcnTypes.Count};
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get All the Plan Classifications Types from the drepository
        /// </summary>
        /// <returns>List of Plan Classification Types </returns>
        private List<PlanClsfcnType> GetAllPlanClassificationTypes()
        {
            using (var repo = _repoFactory.PlanClassificationType())
            {
                List<PlanClsfcnType> planClsfcnTypes = repo.FindAll().ToList();
                return planClsfcnTypes;
            }
        }
        #endregion
    }
}
