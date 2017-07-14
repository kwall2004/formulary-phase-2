using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using BenefitPlanWebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    /// <summary>
    /// The Copay Distribution LICS Controller for Benefit Plan
    /// </summary>
    public class CopayDistributionLICSController : ApiController
    {
        /// <summary>
        /// Benefit Plan BLL
        /// </summary>
        private IBenefitPlanBLL _benefitPlanBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the BenefitServiceType Controller
        /// </summary>
        /// <param name="benefitPlanBLL">the Benefit Plan BLL</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public CopayDistributionLICSController(IBenefitPlanBLL benefitPlanBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _benefitPlanBLL = benefitPlanBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        ///  Gets the LICS 4 Deductible Amount for a Benefit Plan
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan SK</param>
        /// <returns>a Copay Distribution LICS VM</returns>
        [HttpGet]
        public IHttpActionResult GetAllCopayDistribution(long bnftPlanSK)
        {
            try
            {
                CopayDistributionLICSVM copayDistLICS = _benefitPlanBLL.GetCopayDistributionLICSVM(bnftPlanSK);
                var result = new QueryResult<CopayDistributionLICSVM>() { Rows = new List<CopayDistributionLICSVM>() { copayDistLICS }, Count = 1 };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Adds/Update the LICS 4 Deductible Amount
        /// </summary>
        /// <param name="itemsToAddOrUpdate">the Copay Distribution LICS VM</param>
        /// <returns>CopayDistributionLICSVM</returns>
        [HttpPut]
        public IHttpActionResult SetAllCopayDistribution(CopayDistributionLICSVM itemsToAddOrUpdate)
        {
            try
            {
                itemsToAddOrUpdate.CurrentUser = UtilityFunctions.GetCurrentUser(itemsToAddOrUpdate.CurrentUser);

                if (ModelState.IsValid)
                {
                    CopayDistributionLICSVM result = _benefitPlanBLL.SetCopayDistributionLICSVM(itemsToAddOrUpdate);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.BnftPlanSK }, result));
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
