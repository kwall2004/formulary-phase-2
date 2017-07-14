using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.Core.DAL.Models.Containers;
using BenefitPlanWebApi.Services;
using System;
using System.Collections.Generic;
using System.Web.Http;
using Atlas.Core.WebApi.Services;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    /// <summary>
    /// The Allowed Prescribers Controller for Benefit Plan
    /// </summary>
    public class AllowedPrescribersController : ApiController
    {
        /// <summary>
        /// Admin Configuration BLL
        /// </summary>
        private IAdminConfigBLL _adminConfigBLL;

        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Controller for all the dropdowns that are connected to benefit plan only
        /// </summary>
        /// <param name="adminConfigBLL">the rAdmin Configuration BLL</param>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public AllowedPrescribersController(IAdminConfigBLL adminConfigBLL, IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _adminConfigBLL = adminConfigBLL;
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get all the AllowedPrescribersLists and return them in a list
        /// </summary>
        /// <returns>List of Allowed Prescriber's Lists</returns>
        [HttpGet]
        public IHttpActionResult AllowedPrescribersLists()
        {
            try
            {
                List<AllowedPrescribersVM> prescriberLists = _adminConfigBLL.GetAllAllowedPrescriberLists();
                var result = new QueryResult<AllowedPrescribersVM>() { Rows = prescriberLists, Count = prescriberLists.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Put Method to Set an AllowedPrescribersList
        /// </summary>
        /// <param name="allowedPrescribers">the AllowedPrescribersList View Model to Set</param>
        /// <returns>the AllowedPrescribersList View Model</returns>
        [HttpPut]
        public IHttpActionResult UpdatePrescriberList(AllowedPrescribersVM allowedPrescribers)
        {
            try
            {
                allowedPrescribers.CurrentUser = UtilityFunctions.GetCurrentUser(allowedPrescribers.CurrentUser);

                if (ValidatePrescriberList(allowedPrescribers))
                {
                    AllowedPrescribersVM result = _adminConfigBLL.SetAllowedPrescriberList(allowedPrescribers);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.AlwdPrescribersListSK }));
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
        /// Validate AllowedPrescribersList
        /// </summary>
        /// <param name="allowedPrescribers">the AllowedPrescribersList View Model to Validate</param>
        private bool ValidatePrescriberList(AllowedPrescribersVM allowedPrescribers)
        {
            if (ModelState.IsValid)
            {
                foreach (Message item in _adminConfigBLL.ValidateAllowedPrescriberList(allowedPrescribers))
                {
                    ModelState.AddModelError(item.Fieldname, item.MessageText);
                }
            }

            return ModelState.IsValid;
        }
    }
}
