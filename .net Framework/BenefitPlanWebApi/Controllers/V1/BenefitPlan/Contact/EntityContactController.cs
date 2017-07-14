using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models.Enums;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.Core.DAL.Models.Containers;
using BenefitPlanWebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Atlas.Core.WebApi.Services;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.Contact
{
    public class EntityContactController : ApiController
    {
        /// <summary>
        /// Entity Contact BLL
        /// </summary>
        private IEntityContactBLL _entityContactBLL;

        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the ContactList Controller
        /// </summary>
        /// <param name="repoFactory">the Benefit Plan Repository Factory</param>
        /// <param name="exceptionResponseGenerator">the Exception Response Generator</param>
        public EntityContactController(IEntityContactBLL entityContactBLL,IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _entityContactBLL = entityContactBLL;
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method - Get List of Contact by hierarchyType and hierrachyId and/or contactid
        /// </summary>
        /// <param name="entitySK"></param>
        /// <param name="isActive"></param>
        /// <param name="entityContactSK"></param>
        /// <returns>List/single Contact Details</returns>
        [HttpGet]
        public IHttpActionResult GetEntityContactModel(TenantFamilyHierarchy entityType, long entityTypeSK, bool isActive = false, long entityContactSK = 0)
        {
            try
            {
                IEnumerable<EntityContactsVM> contactList = _entityContactBLL.GetAllEntityContacts(entityType, entityTypeSK, isActive);
                if (entityContactSK != 0)
                {
                    contactList = contactList.Where(w => w.EntityTypeContactSK == entityContactSK).ToList();
                }
                var results = new QueryResult<EntityContactsVM>() { Rows = contactList.ToList(), Count = contactList.ToList().Count };
                return Ok(results);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Put Method to Set account Contact
        /// </summary>
        /// <param name="AccountContact">the Account Contact View Model to Set</param>
        /// <returns>the Account Contact Model</returns>
        [HttpPut]
        public IHttpActionResult SetEntityContactModel(EntityContactsVM entityContact)
        {
            try
            {
                if (ModelState.ContainsKey("entityContact.ContactAddress.EfctvStartDt"))
                    ModelState["entityContact.ContactAddress.EfctvStartDt"].Errors.Clear();
                if (ModelState.ContainsKey("entityContact.ContactAddress.EfctvEndDt"))
                    ModelState["entityContact.ContactAddress.EfctvEndDt"].Errors.Clear();
                if (ModelState.ContainsKey("entityContact.ContactAddress.CurrentUser"))
                    ModelState["entityContact.ContactAddress.CurrentUser"].Errors.Clear();
                if (ModelState.ContainsKey("entityContact.ContactAddress.EntityEfctvStartDt"))
                    ModelState["entityContact.ContactAddress.EntityEfctvStartDt"].Errors.Clear();
                if (ModelState.ContainsKey("entityContact.ContactAddress.EntityEfctvEndDt"))
                    ModelState["entityContact.ContactAddress.EntityEfctvEndDt"].Errors.Clear();
                if (ModelState.ContainsKey("entityContact.ContactAddress.EntityTypeSK"))
                    ModelState["entityContact.ContactAddress.EntityTypeSK"].Errors.Clear();

                entityContact.CurrentUser = UtilityFunctions.GetCurrentUser(entityContact.CurrentUser);
                if (ModelState.IsValid)
                {
                    EntityContactsVM result = _entityContactBLL.AddOrUpdateEntityContact(entityContact);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.CntctSK }));
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
