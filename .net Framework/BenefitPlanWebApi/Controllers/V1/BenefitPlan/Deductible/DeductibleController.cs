using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Models.Containers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Atlas.Core.WebApi.Services;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.Deductible
{
    /// <summary>
    /// The Deductible Controller for Benefit Plan
    /// </summary>
    public class DeductibleController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Deductible Controller
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public DeductibleController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get all the Deductibles and return them in a list
        /// </summary>
        /// <returns>List of Deductibles</returns>
        [HttpGet]
        public IHttpActionResult Deductibles()
        {
            try
            {
                List<Deducbl> deductible = GetAllDeductibles();
                var result = new QueryResult<Deducbl>() { Rows = deductible, Count = deductible.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get All the Deductibles from the repository
        /// </summary>
        /// <returns>List of Deductibles</returns>
        private List<Deducbl> GetAllDeductibles()
        {
            using (var repo = _repoFactory.Deductible())
            {
                List<Deducbl> deductible = repo.FindAll().ToList();
                return deductible;
            }
        }

    }
}
