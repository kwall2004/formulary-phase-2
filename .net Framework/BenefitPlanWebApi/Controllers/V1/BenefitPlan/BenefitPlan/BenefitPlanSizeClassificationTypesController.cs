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
    public class BenefitPlanSizeClassificationTypesController : ApiController
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
        public BenefitPlanSizeClassificationTypesController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        #region Benefit Plan Size Classification Types
        /// <summary>
        /// Get all the Benefit Plan Size Classification Types and return them in a list
        /// </summary>
        /// <returns>List of Benefit Plan Size Classification Types</returns>
        [HttpGet]
        public IHttpActionResult BenefitPlanSizeClassificationTypes()
        {
            try
            {
                List<BnftPlanSizeClsfcnType> planClsfcnTypes = GetAllBenefitPlanSizeClassificationTypes();
                var result = new QueryResult<BnftPlanSizeClsfcnType>() { Rows = planClsfcnTypes, Count = planClsfcnTypes.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get All the BenefitPlanSizeClassificationTypes from the repository
        /// </summary>
        /// <returns>List of BenefitPlanSizeClassificationTypes</returns>
        private List<BnftPlanSizeClsfcnType> GetAllBenefitPlanSizeClassificationTypes()
        {
            using (var repo = _repoFactory.BenefitPlanSizeClassificationType())
            {
                List<BnftPlanSizeClsfcnType> bnftPlanSizeClsfcnType = repo.FindAll().ToList();
                return bnftPlanSizeClsfcnType;
            }
        }
        #endregion
    }
}
