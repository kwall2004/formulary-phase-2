using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.BenefitPlan.DAL.Models.Enums;
using Atlas.Core.WebApi.Services;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan
{
    /// <summary>
    /// The Tenant Family Hierarchy Type Controller for Benefit Plan
    /// </summary>
    public class TenantFamilyHierarchyTypeController : ApiController
    {
        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Tenant Family Hierarchy Type Controller
        /// </summary>
        /// <param name="exceptionResponseGenerator">the Exception Response Generator</param>
        public TenantFamilyHierarchyTypeController(IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method to Get all Tenant Family Hierarchy Type
        /// </summary>
        /// <returns>a Query Result of Type TenantFamilyHierarchyType</returns>
        [HttpGet]
        public IHttpActionResult GetTenantFamilyHierarchyTypes()
        {
            try
            {
                return Ok(GetAllTenantFamilyHierarchyTypes());
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get Method to Get a single Tenant Family Hierarchy Type
        /// </summary>
        /// <returns>a Tenant Family Hierarchy Type</returns>
        [HttpGet]
        public IHttpActionResult GetTenantFamilyHierarchyType(string type)
        {
            try
            {
                return Ok(GetAllTenantFamilyHierarchyTypes().Find(w => w.Text.ToLower() == type.ToLower()) ?? null);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        #region " Private Methods "
        /// <summary>
        /// Get all Tenant Family Hierarchy Types
        /// </summary>
        /// <returns>a Query Result of Type TenantFamilyHierarchyType</returns>
        private List<DropDownList> GetAllTenantFamilyHierarchyTypes()
        {
            List<DropDownList> dropdownlist = new List<DropDownList>();
            foreach (var name in Enum.GetNames(typeof(TenantFamilyHierarchy)))
            {
                dropdownlist.Add(new DropDownList() { Value = (int)Enum.Parse(typeof(TenantFamilyHierarchy), name), Text = name });
            }

            return dropdownlist;
        }
        #endregion
    }
}
