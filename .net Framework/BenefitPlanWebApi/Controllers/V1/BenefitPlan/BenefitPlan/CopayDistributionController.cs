using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.Core.DAL.Models.Containers;
using BenefitPlanWebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Atlas.Core.WebApi.Services;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{

    /// <summary>
    /// The Copay Distribution Controller for Benefit Plan
    /// </summary>
    public class CopayDistributionController : ApiController
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
        public CopayDistributionController(IBenefitPlanBLL benefitPlanBLL, IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _benefitPlanBLL = benefitPlanBLL;
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        ///  Gets all the Copay Distribution for the selected Coverage Phase & Formulary Tier
        /// </summary>
        /// <param name="cvrgPhaseSK"></param>
        /// <param name="FrmlryTierSK"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetAllCopayDistribution(long bnftPlanSK)
        {
            try
            {
                List<CopayDistributionVM> copaydist = _benefitPlanBLL.GetAllCopayDistribution(bnftPlanSK);
                var result = new QueryResult<CopayDistributionVM>() { Rows = copaydist, Count = copaydist.Count() };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }


        [HttpDelete]
        public IHttpActionResult SetCopayDistribution(CopayDistributionVM itemsToAddOrUpdate)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    itemsToAddOrUpdate.IsDeleted = true;
                    CopayDistributionVM result = _benefitPlanBLL.AddOrUpdateCopayDistribution(itemsToAddOrUpdate);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.CopayDistSK }));
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
        /// Adds/Update the list of Copay Distribution
        /// </summary>
        /// <param name="itemsToAddOrUpdate"></param>
        /// <returns></returns>
        [HttpPut]
        public IHttpActionResult SetAllCopayDistribution(CopayDistributionVM itemsToAddOrUpdate)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    CopayDistributionVM result = _benefitPlanBLL.AddOrUpdateCopayDistribution(itemsToAddOrUpdate);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() {result.CopayDistSK }));
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
