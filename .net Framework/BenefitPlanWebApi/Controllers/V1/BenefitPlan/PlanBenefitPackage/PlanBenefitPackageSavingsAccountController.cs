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
    /// The Plan Benefit Package Savings Account Controller for Plan Benefit Package Configuration/Savings Account Configuration
    /// </summary>
    public class PlanBenefitPackageSavingsAccountController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IPlanBenefitPackageBLL _planBenefitPackageBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        public PlanBenefitPackageSavingsAccountController(IPlanBenefitPackageBLL planBenefitPackageBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _planBenefitPackageBLL = planBenefitPackageBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Put Method to Set Savings Account configuration
        /// </summary>
        /// <param name="savings">the Savings Account View Model to Set</param>
        /// <returns>the Savings Account Model</returns>
        [HttpPut]
        public IHttpActionResult SetSavingsAccount(SavingsAccountVM savings)
        {
            try
            {
                savings.CurrentUser = UtilityFunctions.GetCurrentUser(savings.CurrentUser);

                if (ModelState.IsValid)
                {
                    SavingsAccountVM result = _planBenefitPackageBLL.AddOrUpdateSavingsAccount(savings);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.PopGrpPBPHealthcareFinclAcctSK }));
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

        /// <summary>
        /// Get All Savings Accounts for a PopGrp PBP Key
        /// </summary>
        /// <param name="popGrpPBPSK"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetAllSavingsAccounts(long popGrpPBPSK)
        {
            try
            {
                List<SavingsAccountVM> savingsAccountList = _planBenefitPackageBLL.GetAllSavingsAccounts(popGrpPBPSK);
                var result = new QueryResult<SavingsAccountVM>() { Rows = savingsAccountList, Count = savingsAccountList.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}