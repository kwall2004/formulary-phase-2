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

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.TenantFamily
{
    /// <summary>
    /// The Tenant Family Controller for Benefit Plan
    /// </summary>
    public class TenantFamilyController : ApiController
    {       
        /// <summary>the Entity BLL</summary>
        private IEntityBLL _entityBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Tenant Family Controller
        /// </summary>
        /// <param name="entityBLL">the Benefit Plan Entity BLL</param>
        /// <param name="exceptionResponseGenerator">the Exception Response Generator</param>
        public TenantFamilyController(IEntityBLL entityBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _entityBLL = entityBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method to Get Tenant Family Model by Tenant Family ID
        /// </summary>
        /// <param name="tenantFamSK">the Tenant Family ID</param>
        /// <returns>the Tenant Family Model</returns>
        [HttpGet]
        public IHttpActionResult GetTenantFamilyModel(long tenantFamSK = 0)
        {
            try
            {
                TenantFamilyVM tenantFamily = _entityBLL.GetTenantFamily(tenantFamSK);
                var result = new QueryResult<TenantFamilyVM>() { Rows = new List<TenantFamilyVM>() { tenantFamily }, Count = 1 };
                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Post Method to Set Tenant Family
        /// </summary>
        /// <param name="tenantFamily">the Tenant Family View Model to Set</param>
        /// <returns>JSON AddUpdate Response</returns>
        [HttpPost]
        public IHttpActionResult AddTenantFamilyModel(TenantFamilyVM tenantFamily)
        {
            tenantFamily.TenantFamSK = 0;
            return SetTenantFamilyModel(tenantFamily);
        }

        /// <summary>
        /// Put Method to Set Tenant Family
        /// </summary>
        /// <param name="tenantFamily">the Tenant Family View Model to Set</param>
        /// <returns>JSON AddUpdate Response</returns>
        [HttpPut]
        public IHttpActionResult UpdateTenantFamilyModel(TenantFamilyVM tenantFamily)
        {
            return SetTenantFamilyModel(tenantFamily);
        }

        #region " Private Methods "
        /// <summary>
        /// Method to Set Tenant Family
        /// </summary>
        /// <param name="tenantFamily">the Tenant Family View Model to Set</param>
        /// <returns>JSON AddUpdate Response</returns>
        private IHttpActionResult SetTenantFamilyModel(TenantFamilyVM tenantFamily)
        {
            try
            {
                tenantFamily.CurrentUser = UtilityFunctions.GetCurrentUser(tenantFamily.CurrentUser);

                if (ValidateTenantFamily(tenantFamily))
                {
                    TenantFamilyVM result = _entityBLL.SetTenantFamily(tenantFamily);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.TenantFamSK }));
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
        /// Validate Tenant Family
        /// </summary>
        /// <param name="tenantFamily">the Tenant Family View Model to Validate</param>
        private bool ValidateTenantFamily(TenantFamilyVM tenantFamily)
        {
            if (ModelState.IsValid)
            {
                foreach (Message item in _entityBLL.ValidateTenantFamily(tenantFamily))
                {
                    ModelState.AddModelError(item.Fieldname, item.MessageText);
                }
            }

            return ModelState.IsValid;
        }
        #endregion
    }
}
