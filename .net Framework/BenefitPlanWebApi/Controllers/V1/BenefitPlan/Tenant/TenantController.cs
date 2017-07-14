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

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.Tenant
{
    /// <summary>
    /// The Tenant Controller for Benefit Plan
    /// </summary>
    public class TenantController : ApiController
    {
        /// <summary>the Entity BLL</summary>
        private IEntityBLL _entityBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Tenant Controller
        /// </summary>
        /// <param name="entityBLL">the Benefit Plan Entity BLL</param>
        /// <param name="exceptionResponseGenerator">the Exception Response Generator</param>
        public TenantController(IEntityBLL entityBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _entityBLL = entityBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method to Get Tenant Model by Tenant ID
        /// </summary>
        /// <param name="tenantSK">the Tenant ID</param>
        /// <returns>the Tenant Model</returns>
        [HttpGet]
        public IHttpActionResult GetTenantModel(long tenantSK = 0)
        {
            try
            {
                TenantVM tenant= _entityBLL.GetTenant(tenantSK); ;
                var result = new QueryResult<TenantVM>() { Rows = new List<TenantVM>() { tenant }, Count = 1 };
                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Post Method to Set Tenant
        /// </summary>
        /// <param name="tenant">the Tenant View Model to Add</param>
        /// <returns>the Tenant Family Model</returns>
        [HttpPost]
        public IHttpActionResult AddTenantModel(TenantVM tenant)
        {
            tenant.TenantSK = 0;
            return SetTenantModel(tenant);
        }

        /// <summary>
        /// Put Method to Set Tenant
        /// </summary>
        /// <param name="tenant">the Tenant View Model to Set</param>
        /// <returns>the Tenant Family Model</returns>
        [HttpPut]
        public IHttpActionResult UpdateTenantModel(TenantVM tenant)
        {
            return SetTenantModel(tenant);
        }

        #region " Private Methods "
        /// <summary>
        /// Method to Set Tenant
        /// </summary>
        /// <param name="tenant">the Tenant View Model to Set</param>
        /// <returns>the Tenant Family Model</returns>
        private IHttpActionResult SetTenantModel(TenantVM tenant)
        {
            try
            {
                tenant.CurrentUser = UtilityFunctions.GetCurrentUser(tenant.CurrentUser);

                if (ValidateTenant(tenant))
                {
                    TenantVM result = _entityBLL.SetTenant(tenant);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.TenantSK }));
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
        /// Validate Tenant 
        /// </summary>
        /// <param name="tenant">the Tenant View Model to Validate</param>
        private bool ValidateTenant(TenantVM tenant)
        {
            if (ModelState.IsValid)
            {
                foreach (Message item in _entityBLL.ValidateTenant(tenant))
                {
                    ModelState.AddModelError(item.Fieldname, item.MessageText);
                }
            }

            return ModelState.IsValid;
        }
        #endregion
    }
}