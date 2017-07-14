using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
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
    /// The Benefit Plan Transition for Benefit Plan
    /// </summary>
    public class BenefitPlanTransitionController : ApiController
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
        public BenefitPlanTransitionController(IBenefitPlanTransitionBLL benefitPlanTransitionBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _benefitPlanTransitionBLL = benefitPlanTransitionBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method to Get Transition Rules Benefit Plan ID
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan ID</param>
        /// <returns>List of Low Income Cost-Sharing Subsidy</returns>
        [HttpGet]
        public IHttpActionResult GetTransitionRules(long bnftPlanSK)
        {
            try
            {
                TransitionRulesVM transitionRules = _benefitPlanTransitionBLL.GetTransitionRules(bnftPlanSK);
                return Ok(new QueryResult<TransitionRulesVM>() { Rows = new List<TransitionRulesVM>() { transitionRules }, Count = 1 });
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Put Method to Set Transition Rules
        /// </summary>
        /// <param name="transitionRules">the Transition Rules</param>
        /// <returns>the Add Update Response - JSON with the Result</returns>
        [HttpPut]
        public IHttpActionResult UpdatePopulationGroupPlanBenefitPackage(TransitionRulesVM transitionRules)
        {
            return SetTransitionRules(transitionRules);
        }

        #region " Private Methods "
        /// <summary>
        /// Method to Set Transition Rules
        /// </summary>
        /// <param name="transitionRules">the Transition Rules</param>
        /// <returns>the Add Update Response - JSON with the Result</returns>
        private IHttpActionResult SetTransitionRules(TransitionRulesVM transitionRules)
        {
            try
            {
                transitionRules.CurrentUser = UtilityFunctions.GetCurrentUser(transitionRules.CurrentUser);

                if (ValidateTransitionRules(transitionRules))
                {
                    TransitionRulesVM result = _benefitPlanTransitionBLL.SetTransitionRules(transitionRules);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.BnftPlanSK }));
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
        /// Validate The Transition Rules
        /// </summary>
        /// <param name="transitionRules">the Transition Rules</param>
        private bool ValidateTransitionRules(TransitionRulesVM transitionRules)
        {
            if (ModelState.IsValid)
            {
                foreach (Message item in _benefitPlanTransitionBLL.ValidateTransitionRules(transitionRules))
                {
                    ModelState.AddModelError(item.Fieldname, item.MessageText);
                }
            }

           return ModelState.IsValid;
        }
        #endregion
    }
}
