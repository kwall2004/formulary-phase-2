using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.PlanBenefitPackage
{
    /// <summary>
    /// The Health Care Financial Account Type Controller for Benefit Plan
    /// </summary>
    public class HealthCareFinancialAccountTypeController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        public HealthCareFinancialAccountTypeController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method to Get all saving account types
        /// </summary>
        /// <returns>Query Result</returns>
        [HttpGet]
        public IHttpActionResult GetAllSavingAccountTypes()
        {
            try
            {
                using (var repo = _repoFactory.HealthCareFinancialAccountType())
                {
                    List<HealthcareFinclAcctType> savingsaccounttypes = repo.FindAll().ToList();
                    var result = new QueryResult<HealthcareFinclAcctType>() { Rows = savingsaccounttypes, Count = savingsaccounttypes.Count };
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