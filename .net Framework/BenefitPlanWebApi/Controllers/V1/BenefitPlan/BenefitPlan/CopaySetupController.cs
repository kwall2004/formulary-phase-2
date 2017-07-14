using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
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
    /// The Copay Setup Controller for Benefit Plan
    /// </summary>
    public class CopaySetupController : ApiController
    {
        /// <summary>the Benefit Plan Pharmacy Type BLL</summary>
        private IBenefitPlanPharmacyTypeBLL _benefitPlanPharmacyTypeBLL;

        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Copay Configuration Controller
        /// </summary>
        /// <param name="benefitPlanPharmacyTypeBLL">the Benefit Plan Pharmacy Type BLL</param>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public CopaySetupController(IBenefitPlanPharmacyTypeBLL benefitPlanPharmacyTypeBLL, IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _benefitPlanPharmacyTypeBLL = benefitPlanPharmacyTypeBLL;
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method to Get Copay Configuration Benefit Plan ID
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan ID</param>
        /// <returns>the Service Area Configuration VM</returns>
        [HttpGet]
        public IHttpActionResult GetCopayConfiguration(long bnftPlanSK)
        {
            try
            {
                List<CopaySetupVM> viewModel = _benefitPlanPharmacyTypeBLL.GetAllCopaySetup(bnftPlanSK);
                var result = new QueryResult<CopaySetupVM>() { Rows = viewModel, Count = viewModel.Count() };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Post Method to Set Single Copay Setup
        /// </summary>
        /// <param name="copaySetupAdd">the Copay Setups to Add</param>
        /// <returns>the Add Update Response - JSON with the Result</returns>
        [HttpPost]
        public IHttpActionResult AddCopaySetup(CopaySetupVM copaySetupAdd)
        {
            copaySetupAdd.CopaySetupSK = 0;
            return SetCopaySetup(copaySetupAdd);
        }

        /// Put Method to Set Single Copay Setup
        /// </summary>
        /// <param name="copaySetupsAdd">the Copay Setups to Update</param>
        /// <returns>the Add Update Response - JSON with the Result</returns>
        [HttpPut]
        public IHttpActionResult UpdateCopaySetup(CopaySetupVM copaySetupUpdate)
        {
            return SetCopaySetup(copaySetupUpdate);
        }

        #region " Private Methods "
        /// <summary>
        /// Method to Set Copay Setups
        /// </summary>
        /// <param name="itemToAddUpdate">the service Area Configuration</param>
        /// <returns>the Add Update Response - JSON with the Result</returns>
        private IHttpActionResult SetCopaySetup(CopaySetupVM itemToAddUpdate)
        {
            try
            {
                itemToAddUpdate.CurrentUser = UtilityFunctions.GetCurrentUser(itemToAddUpdate.CurrentUser);

                if (ModelState.IsValid)
                {
                    //changed this to lookup BnftPlanPharmTypeDaySuplSK. Hard to do from front end
                    BnftPlanPharmTypeDaySupl bnftPlanPharmTypeDaySupl = _repoFactory.BenefitPlanPharmacyTypeDaySupply().FindOne
                        (c => c.DaySuplTypeSK == itemToAddUpdate.DaySuplTypeSK
                        && c.BnftPlanPharmType.BnftPlanSK == itemToAddUpdate.BnftPlanSK
                        && c.BnftPlanPharmType.PharmTypeSK == itemToAddUpdate.PharmTypeSK);
                    itemToAddUpdate.BnftPlanPharmTypeDaySuplSK = bnftPlanPharmTypeDaySupl.BnftPlanPharmTypeDaySuplSK;
                    CopaySetupVM result = _benefitPlanPharmacyTypeBLL.SetCopaySetup(itemToAddUpdate);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.CopaySetupSK }));
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
