using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using BenefitPlanWebApi.Services;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    /// <summary>
    /// The Dispense As Written Copay Controller for Benefit Plan
    /// </summary>
    public class DispenseAsWrittenCopayController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanBLL _benefitPlanBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Dispense As Written Copay Controller
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public DispenseAsWrittenCopayController(IBenefitPlanBLL benefitPlanBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _benefitPlanBLL = benefitPlanBLL; ;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Add or update DAWCopay
        /// </summary>
        /// <param name="dawCopay"></param>
        /// <returns></returns>
        [HttpPut]
        public IHttpActionResult SetDAWCopay(DispenseAsWrittenCopayVM dawCopay)
        {
            dawCopay.CurrentUser = UtilityFunctions.GetCurrentUser(dawCopay.CurrentUser);

            try
            {
                if (ModelState.IsValid)
                {
                    DispenseAsWrittenCopayVM result = _benefitPlanBLL.AddorUpdateDAWCopay(dawCopay);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.DAWCopaySK } ));
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
        /// Get all DAW copay
        /// </summary>
        /// <param name="bnftPlanSK"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetAllDAWCopay(long bnftPlanSK)
        {
            try
            {
                List<DispenseAsWrittenCopayVM> dawCopayList = _benefitPlanBLL.GetAllDAWCopay(bnftPlanSK);
                var result = new QueryResult<DispenseAsWrittenCopayVM>() { Rows = dawCopayList, Count = dawCopayList.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}