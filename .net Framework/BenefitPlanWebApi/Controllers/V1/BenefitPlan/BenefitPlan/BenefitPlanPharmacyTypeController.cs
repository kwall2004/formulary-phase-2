using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.Core.DAL.Models.Containers;
using BenefitPlanWebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Atlas.Core.WebApi.Services;
using Atlas.BenefitPlan.DAL.Models.Containers;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    public class BenefitPlanPharmacyTypeController : ApiController
    {
        /// <summary>
        /// Benefit Plan BLL
        /// </summary>
        private IBenefitPlanPharmacyTypeBLL _benefitPlanPharmacyTypeBLL;

        /// <summary>
        /// the Atlas Exception Message Generator
        /// </summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        public BenefitPlanPharmacyTypeController(IBenefitPlanPharmacyTypeBLL benefitPlanPharmacyTypeBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _benefitPlanPharmacyTypeBLL = benefitPlanPharmacyTypeBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Gets all the Day Supply for the selected Benefit Plan 
        /// </summary>
        /// <param name="bnftPlanSK"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetAllBenefitPlanPharmTypesDaySupl(long bnftPlanSK)
        {
            try
            {
                List<BenefitPlanPharmacyTypeVM> bnftPharmTypes = _benefitPlanPharmacyTypeBLL.GetBenefitPlanPharmTypes(bnftPlanSK);
                var result = new QueryResult<BenefitPlanPharmacyTypeVM>() { Rows = bnftPharmTypes, Count = bnftPharmTypes.Count() };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Gets all the Pharmacy Types for the selected Benefit Plan & Network Tier
        /// </summary>
        /// <param name="bnftPlanSK"></param>
        /// <param name="ntwrkTierSK"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetAllBenefitPlanNtwrkTierPharmTypes(long bnftPlanSK, long ntwrkTierSK)
        {
            try
            {
                List<PharmacyTypeWithNetworkTier> bnftPharmTypes = _benefitPlanPharmacyTypeBLL.GetBenefitPlanPharmTypes(bnftPlanSK, ntwrkTierSK);
                var result = new QueryResult<PharmacyTypeWithNetworkTier>() { Rows = bnftPharmTypes, Count = bnftPharmTypes.Count() };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Add or Update Benefit Plan Pharmacy Types Day Supply
        /// </summary>
        /// <param name="benefitPlanPharmacyType"></param>
        /// <returns></returns>
        [HttpPut]
        public IHttpActionResult SetPharmacyTypes(BenefitPlanPharmacyTypeVM benefitPlanPharmacyType)
        {
            try
            {
                benefitPlanPharmacyType.CurrentUser = UtilityFunctions.GetCurrentUser(benefitPlanPharmacyType.CurrentUser);
                if (ModelState.IsValid)
                {
                    BenefitPlanPharmacyTypeVM result = _benefitPlanPharmacyTypeBLL.SetBenefitPlanPharmType(benefitPlanPharmacyType);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.BnftPlanPharmTypeSK }));
                }
                else
                {
                    return Ok(JSONFunctions.PopulationMessages(ModelState));
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
