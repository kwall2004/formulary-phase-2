using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.Models.Enums;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using BenefitPlanWebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.Address
{
    /// <summary>
    /// The Entity Address Controller for Benefit Plan
    /// </summary>
    public class EntityAddressController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IEntityAddressBLL _entityAddressBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Entity Address Controller
        /// </summary>
        /// <param name="entityAddressBLL">the Entity Address BLL Layer</param>
        /// <param name="exceptionResponseGenerator">the Exception Response Generator</param>
        public EntityAddressController(IEntityAddressBLL entityAddressBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _entityAddressBLL = entityAddressBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method to Get the Copy From Demographic Drop-down Container by Entity
        /// </summary>
        /// <param name="entityType">the Entity Type</param>
        /// <param name="lookupId">the Entity Type Lookup ID</param>
        /// <returns>the Copy From Demographic Drop-down Container</returns>
        [HttpGet]
        public IHttpActionResult GetCopyFromDemographicDDL(EntityAddressType entityType, long lookupId)
        {
            try
            {
                if (ValidateEntityType((int)entityType))
                {
                    List<DropDownList> dropdownList = _entityAddressBLL.GetCopyDemographicFromList(entityType, lookupId);
                    var result = new QueryResult<DropDownList>() { Rows = dropdownList, Count = dropdownList.Count() };
                    return Ok(result);
                }
               else
                {
                    return BadRequest("Invalid Entity Type");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get Method to Get Entity Address Drop-down Container by Entity ID
        /// </summary>
        /// <param name="entityType">the Entity Type</param>
        /// <param name="entityTypeSK">the Tenant Family ID</param>
        /// <returns>the Entity Address Drop-down Container for Entity</returns>
        [HttpGet]
        public IHttpActionResult GetAllEntityAddressDDL(EntityAddressType entityType, long entityTypeSK)
        {
            try
            {
                if (ValidateEntityType((int)entityType))
                {
                    List<DropDownList> dropdownList = _entityAddressBLL.GetAllEntityAddress(entityType, entityTypeSK)
                            .Select(r => new DropDownList() { Value = r.EntityTypeAddressSK, Text = string.Format("{0} ({1:M/d/yyyy})", r.AddrLine1, r.EfctvStartDt) }).ToList();
                    var result = new QueryResult<DropDownList>() { Rows = dropdownList, Count = dropdownList.Count() };
                    return Ok(result);
                }
                else
                {
                    return BadRequest("Invalid Entity Type");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get Method to Get Entity Address Model by Entity ID
        /// </summary>
        /// <param name="entityType">the Entity Type</param>
        /// <param name="entityTypeSK">the Entity Type ID</param>
        /// <param name="entityTypeAddrSK">the Entity Type Address ID</param>
        /// <returns>the Entity Address View Model for Entity</returns>
        [HttpGet]
        public IHttpActionResult GetEntityAddressModel(EntityAddressType entityType, long entityTypeSK, long entityTypeAddrSK)
        {
            try
            {
                if (ValidateEntityType((int)entityType))
                {
                    EntityAddressVM entityAddress = entityTypeAddrSK == 0
                        ? _entityAddressBLL.GetCurrentEntityAddress(entityType, entityTypeSK)
                        : _entityAddressBLL.GetEntityAddress(entityType, entityTypeSK, entityTypeAddrSK);
                    var result = (entityAddress == null) ? new QueryResult<EntityAddressVM>():new QueryResult<EntityAddressVM>() { Rows = new List<EntityAddressVM>() { entityAddress }, Count = 1 };

                    return Ok(result);
                }
                else
                {
                    return BadRequest("Invalid Entity Type");
                }
             
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Post Method to Set Entity Address Model
        /// </summary>
        /// <param name="entityAddress">the entity Address to Update</param>
        /// <returns>the Add Update Response - JSON with the Result</returns>
        [HttpPost]
        public IHttpActionResult AddEntityAddressModel(EntityAddressVM entityAddress)
        {
            entityAddress.EntityTypeAddressSK = 0;
            entityAddress.AddrSK = 0;

            return SetEntityAddressModel(entityAddress);
        }

        /// <summary>
        /// Put Method to Set Entity Address Model
        /// </summary>
        /// <param name="entityAddress">the entity Address to Update</param>
        /// <returns>the Add Update Response - JSON with the Result</returns>
        [HttpPut]
        public IHttpActionResult UpdateEntityAddressModel(EntityAddressVM entityAddress)
        {
            return SetEntityAddressModel(entityAddress);
        }

        #region " Private Methods "

        /// <summary>
        /// Method to Set Entity Address Model
        /// </summary>
        /// <param name="entityAddress">the entity Address to Update</param>
        /// <returns>the Add Update Response - JSON with the Result</returns>
        private IHttpActionResult SetEntityAddressModel(EntityAddressVM entityAddress)
        {
            try
            {
                entityAddress.CurrentUser = UtilityFunctions.GetCurrentUser(entityAddress.CurrentUser);
                if (ValidateEntityAddress(entityAddress))
                {
                    EntityAddressVM result = _entityAddressBLL.SetEntityAddress(entityAddress);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.EntityTypeAddressSK }));
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
        /// Validate the Entity Address Record - Complex Logic
        /// </summary>
        /// <param name="entityAddress">the entity Address to Validate</param>
        private bool ValidateEntityAddress(EntityAddressVM entityAddress)
        {
            if (!ValidateEntityType((int)entityAddress.EntityType))
            {
                ModelState.AddModelError("entityAddress.EntityType", "Invalid Entity Address Type");
            }

            // Validate Business Logic for the Entity Address
            if (ModelState.IsValid)
            {
                foreach (Message item in _entityAddressBLL.ValidateEntityAddress(entityAddress))
                {
                    ModelState.AddModelError(item.Fieldname, item.MessageText);
                }
            }

            return ModelState.IsValid;
        }

        /// <summary>
        /// Validate the Entity Type
        /// </summary>
        /// <param name="entityAddress">the entity Address to Validate</param>
        private bool ValidateEntityType(int entityType)
        {
            // Validate if the Entity Type is valid
            if (!Enum.IsDefined(typeof(EntityAddressType), entityType))
            {
                return false;
            }
            return true;
        }

        #endregion
    }
}
