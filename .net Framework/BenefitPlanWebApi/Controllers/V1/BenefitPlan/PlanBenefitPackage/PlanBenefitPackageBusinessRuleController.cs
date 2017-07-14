using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using BenefitPlanWebApi.Services;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.PlanBenefitPackage
{
    /// <summary>
    /// The Plan Benefit Package Business Rule Controller for Benefit Plan
    /// </summary>
    public class PlanBenefitPackageBusinessRuleController : ApiController
    {
        /// <summary>
        /// the Plan Benefit Package business
        /// </summary>
        private IPlanBenefitPackageBLL _planBenefitPackageBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Plan Benefit Package BLL for Benefit Plan
        /// </summary>
        /// <param name="repoFactory">the Benefit Plan Repository Factory</param>
        public PlanBenefitPackageBusinessRuleController(IPlanBenefitPackageBLL planBenefitPackageBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _planBenefitPackageBLL = planBenefitPackageBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }


        /// <summary>
        /// Get Method to Get all Plan Benefit Package Business Rules
        /// </summary>
        /// <returns>Query Result</returns>
        [HttpGet]
        public IHttpActionResult GetAllPlanBenefitPackageBusinessRules(long pBPSK)
        {
            try
            {
                string[] categoryTypes = new string[] { "Business Rules",  "Business Rules Question 10" };

                List<BusinessRulesVM> planBenefitPackageBusinessRules = _planBenefitPackageBLL.GetBusinessRules(pBPSK, categoryTypes);
                var result = new QueryResult<BusinessRulesVM>() { Rows = planBenefitPackageBusinessRules, Count = planBenefitPackageBusinessRules.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }


        /// <summary>
        /// Add/Update PlanBenefitPackage
        /// </summary>       
        [HttpPut]
        public IHttpActionResult SetPlanBenefitPackageBusinessRules(BusinessRulesUpdateVM businessRule)
        {
            try
            {
                businessRule.CurrentUser = UtilityFunctions.GetCurrentUser(businessRule.CurrentUser);
                
                if (ModelState.IsValid)
                {
                    if (((businessRule.CurrentAnswer ?? string.Empty) != string.Empty) || (businessRule.IsDeleted))
                    {
                        BusinessRulesUpdateVM result = _planBenefitPackageBLL.AddOrUpdateBusinessRules(businessRule);
                        return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long> { result.PBPConfgPrptySK }, result));
                    }
                    else
                    {
                        return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long> { businessRule.PBPConfgPrptySK }, businessRule));
                    }
                }
                else
                {
                    return Ok(JSONFunctions.AddUpdateErrorReponse(ModelState));
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}

