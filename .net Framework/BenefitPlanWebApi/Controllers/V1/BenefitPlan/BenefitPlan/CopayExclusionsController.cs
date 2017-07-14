using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.BenefitPlan.DAL;
using Atlas.Core.DAL.Models.Containers;
using BenefitPlanWebApi.Services;
using System;
using System.Collections.Generic;
using System.Web.Http;
using Atlas.Core.WebApi.Services;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{

    /// <summary>
    /// The Copay Exclusions Controller for Benefit Plan
    /// </summary>
    public class CopayExclusionsController : ApiController
    {
        /// <summary>
        /// Benefit Plan BLL
        /// </summary>
        private IBenefitPlanBLL _benefitPlanBLL;

        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the BenefitServiceType Controller
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public CopayExclusionsController(IBenefitPlanBLL benefitPlanBLL, IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _benefitPlanBLL = benefitPlanBLL;
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get All Copay Exclusions
        /// </summary>
        /// <param name="bnftPlanSK"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetAllCopayExclusions(long bnftPlanSK)
        {
            try
            {
                List<CopayExclusionVM> fillExcList = _benefitPlanBLL.GetAllCopayExclusions(bnftPlanSK);
                var result = new QueryResult<CopayExclusionVM>() { Rows = fillExcList, Count = fillExcList.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Set Copay Exclusion
        /// </summary>
        /// <param name="copayExclusion"></param>
        /// <returns></returns>
        [HttpPut]
        public IHttpActionResult SetCopayExclusion(CopayExclusionVM copayExclusion)
        {
            copayExclusion.CurrentUser = UtilityFunctions.GetCurrentUser(copayExclusion.CurrentUser);

            try
            {
                if (ModelState.IsValid)
                {
                    CopayExclusionVM result = _benefitPlanBLL.AddOrUpdateCopayExclusion(copayExclusion);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.CopayOvrrdSK }));
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
