using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.BenefitPlan.DAL.Models.Enums;
using Atlas.Core.WebApi.Services;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.Address
{
    /// <summary>
    /// The Entity Address Type Controller for Benefit Plan
    /// </summary>
    public class EntityAddressTypeController : ApiController
    {
        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Industry Identifier Type Controller
        /// </summary>
        /// <param name="repoFactory">the Benefit Plan Repository Factory</param>
        /// <param name="exceptionResponseGenerator">the Exception Response Generator</param>
        public EntityAddressTypeController(IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method to Get all Entity Address Type
        /// </summary>
        /// <returns>a Query Result of Type EntityAddressType</returns>
        [HttpGet]
        public IHttpActionResult GetEntityAddressTypes()
        {
            try
            {
                return Ok(GetAllEntityAddressTypes());
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get Method to Get a single Entity Address Type
        /// </summary>
        /// <returns>a Entity Address Type</returns>
        [HttpGet]
        public IHttpActionResult GetEntityAddressType(string type)
        {
            try
            {
                return Ok(GetAllEntityAddressTypes().Find(w => w.Text.ToLower() == type.ToLower()) ?? null);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        #region " Private Methods "
        /// <summary>
        /// Get all Entity Address Types
        /// </summary>
        /// <returns>a Query Result of Type EntityAddressType</returns>
        private List<DropDownList> GetAllEntityAddressTypes()
        {
            List<DropDownList> dropdownlist = new List<DropDownList>();
            foreach (var name in Enum.GetNames(typeof(EntityAddressType)))
            {
                dropdownlist.Add(new DropDownList() { Value = (int)Enum.Parse(typeof(EntityAddressType), name), Text = name });
            }

            return dropdownlist;
        }
        #endregion
    }
}
