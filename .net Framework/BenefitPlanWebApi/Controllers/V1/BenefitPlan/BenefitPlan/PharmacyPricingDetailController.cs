using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Models.Containers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Atlas.BenefitPlan.DAL.ViewModels;
using BenefitPlanWebApi.Services;
using Atlas.Core.WebApi.Services;
using System.Web.Http.ModelBinding;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    /// <summary>
    /// The Pharmacy Pricing Detail Controller for Benefit Plan
    /// </summary>
    public class PharmacyPricingDetailController : ApiController
    {
        /// <summary>
        /// Benefit Plan BLL
        /// </summary>
        private IBenefitPlanPharmacyTypeBLL _benefitPlanPharmacyTypeBLL;

        /// <summary>
        /// the Benefit Plan Repository Factory
        /// </summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>
        /// the Atlas Exception Message Generator
        /// </summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor for the Pharmacy Pricing Detail Controller
        /// </summary>
        /// <param name="repoFactory"></param>
        /// <param name="exceptionResponseGenerator"></param>
        public PharmacyPricingDetailController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator, IBenefitPlanPharmacyTypeBLL benefitPlanPharmacyTypeBLL)
        {
            _benefitPlanPharmacyTypeBLL = benefitPlanPharmacyTypeBLL;
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        protected PharmacyPricingDetailController()
        {
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="bnftPlanSK"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetAllBenefitPlanPharmTypes(long bnftPlanSK)
        {
            try
            {
                using (var repo = _repoFactory.PharmacyType())
                using (var repobnftPharmType = _repoFactory.BenefitPlanPharmacyType())
                {
                    IQueryable<BnftPlanPharmType> bnftPharmTypes = repobnftPharmType.FindAll(s => s.BnftPlanSK == bnftPlanSK);
                    IQueryable<PharmType> pharmTypes = repo.FindAll();
                    List<PharmType> selectedPharmacyTypes = pharmTypes.ToList().Where(p => bnftPharmTypes.Any(a => p.PharmTypeSK == a.PharmTypeSK)).ToList();
                    var result = new QueryResult<PharmType>() { Rows = selectedPharmacyTypes, Count = selectedPharmacyTypes.Count };
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }



        /// <summary>
        /// Gets all the Drug Brand Type
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetAllDrugBrandType()
        {
            try
            {
                List<DrugBrandType> drugBrandType = _repoFactory.DrugBrandType().FindAll().ToList();
                var result = new QueryResult<DrugBrandType>() { Rows = drugBrandType, Count = drugBrandType.Count() };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Gets the Pricing Detail of Benefit Plan Pharmacy type
        /// </summary>
        /// <param name="bnftPlanSK"></param>
        /// <param name="pharmTypeSK"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetAllBenefitPlanPharmPricing(long bnftPlanSK, long pharmTypeSK)
        {
            try
            {
                List<PlanPrcg> bnftPlanPrcg = _repoFactory.PlanPricing().FindAll(t => t.BnftPlanSK == bnftPlanSK && t.PharmTypeSK == pharmTypeSK).ToList();
                var result = new QueryResult<PlanPrcg>() { Rows = bnftPlanPrcg, Count = bnftPlanPrcg.Count() };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Add or Update Benefit Plan Pharmacy Pricing Details
        /// </summary>
        /// <param name="benefitPlanPharmacyType"></param>
        /// <returns></returns>
        [HttpPut]
        public IHttpActionResult SetPlanPharmacyPricingDetail(PharmacyPricingDetailVM itemsToAddOrUpdate)
        {
            try
            {
                //itemsToAddOrUpdate.CurrentUser = UtilityFunctions.GetCurrentUser(item.CurrentUser);
                if (ModelState.IsValid)
                {
                    return Ok(_benefitPlanPharmacyTypeBLL.AddOrUpdateAllBenefitPlanPharmPrcg(itemsToAddOrUpdate));
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

        [HttpDelete]
        public IHttpActionResult SetDeletePlanPharmacyPricingDetail(PharmacyPricingDetailVM itemsToAddOrUpdate)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    itemsToAddOrUpdate.IsDeleted = true;
                    PharmacyPricingDetailVM result = _benefitPlanPharmacyTypeBLL.AddOrUpdateAllBenefitPlanPharmPrcg(itemsToAddOrUpdate);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.PlanPrcgSK }));
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
