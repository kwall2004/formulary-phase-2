using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using BenefitPlanWebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    /// <summary>
    /// The Low Income Cost-Sharing Subsidy Controller Setup for Benefit Plan
    /// </summary>
    public class LICSSetupController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanTransitionBLL _benefitPlanTransitionBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Transition LICS Configuration Controller
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public LICSSetupController(IBenefitPlanTransitionBLL benefitPlanTransitionBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _benefitPlanTransitionBLL = benefitPlanTransitionBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method to Get Low Income Cost-Sharing Subsidy for Benefit Plan ID
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan ID</param>
        /// <returns>List of Low Income Cost-Sharing Subsidy</returns>
        [HttpGet]
        public IHttpActionResult GetLowIncomeCostSharingSubsidy(long bnftPlanSK)
        {
            try
            {
                List<LowIncomeCostSharingSubsidyVM> licsSetup = _benefitPlanTransitionBLL.GetLowIncomeCostSharingSubsidys(bnftPlanSK);
                return Ok(new QueryResult<LowIncomeCostSharingSubsidyVM>() { Rows = licsSetup, Count = licsSetup.Count() });
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Post Method to Set LowIncomeCostSharingSubsidySetup
        /// </summary>
        /// <param name="lowIncomeCostSharingSubsidy">the LowIncomeCostSharingSubsidySetup</param>
        /// <returns>the Add Update Response - JSON with the Result</returns>
        [HttpPost]
        public IHttpActionResult AddLowIncomeCostSharingSubsidySetup(LowIncomeCostSharingSubsidyVM lowIncomeCostSharingSubsidy)
        {
            lowIncomeCostSharingSubsidy.LICSSetupSK = 0;
            return SetLowIncomeCostSharingSubsidys(lowIncomeCostSharingSubsidy);
        }
        /// <summary>
        /// Put Method to Set LowIncomeCostSharingSubsidySetup
        /// </summary>
        /// <param name="lowIncomeCostSharingSubsidy">the LowIncomeCostSharingSubsidySetup</param>
        /// <returns>the Add Update Response - JSON with the Result</returns>
        [HttpPut]
        public IHttpActionResult UpdateLowIncomeCostSharingSubsidySetup(LowIncomeCostSharingSubsidyVM lowIncomeCostSharingSubsidy)
        {
            return SetLowIncomeCostSharingSubsidys(lowIncomeCostSharingSubsidy);
        }

        #region " Private Methods "
        /// <summary>
        /// Method to Set LowIncomeCostSharingSubsidySetup
        /// </summary>
        /// <param name="lowIncomeCostSharingSubsidys">the LowIncomeCostSharingSubsidy</param>
        /// <returns>the Add Update Response - JSON with the Result</returns>
        private IHttpActionResult SetLowIncomeCostSharingSubsidys(LowIncomeCostSharingSubsidyVM lowIncomeCostSharingSubsidy)
        {
            try
            {
                lowIncomeCostSharingSubsidy.CurrentUser = UtilityFunctions.GetCurrentUser(lowIncomeCostSharingSubsidy.CurrentUser);

                if (ModelState.IsValid)
                {
                    LowIncomeCostSharingSubsidyVM result = _benefitPlanTransitionBLL.SetLowIncomeCostSharingSubsidys(lowIncomeCostSharingSubsidy);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.LICSSetupSK }));
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
        #endregion
    }
}
