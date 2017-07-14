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

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.AdminConfig
{
    /// <summary>
    /// The Prescriber Drug Override Controller for Benefit Plan
    /// </summary>
    public class PrescriberDrugOverrideController : ApiController
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
        /// <param name="adminConfigBLL">the Admin Configuration BLL</param>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public PrescriberDrugOverrideController(IAdminConfigBLL adminConfigBLL, IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _adminConfigBLL = adminConfigBLL;
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get all the PrescriberDrugOverride Lists and return them in a list
        /// </summary>
        /// <returns>List of PrescriberDrugOverrides</returns>
        [HttpGet]
        public IHttpActionResult PrescriberDrugOverrideLists()
        {
            try
            {
                List<PrescriberDrugOverrideVM> prescriberDrugOverrideLists = _adminConfigBLL.GetAllPrescriberDrugOverrideLists();
                var result = new QueryResult<PrescriberDrugOverrideVM>() { Rows = prescriberDrugOverrideLists, Count = prescriberDrugOverrideLists.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Put Method to Set a PrescriberDrugOverride List
        /// </summary>
        /// <param name="prescriberDrugOverrideLists">the PrescriberDrugOverride List View Model to Set</param>
        /// <returns>the PrescriberDrugOverrideList View Model</returns>
        [HttpPut]
        public IHttpActionResult UpdatePrescriberDrugOverrideList(PrescriberDrugOverrideVM prescriberDrugOverrideLists)
        {
            try
            {
                prescriberDrugOverrideLists.CurrentUser = UtilityFunctions.GetCurrentUser(prescriberDrugOverrideLists.CurrentUser);

                if (ValidatePrescriberDrugOverrideList(prescriberDrugOverrideLists))
                {
                    PrescriberDrugOverrideVM result = _adminConfigBLL.SetPrescriberDrugOverrideList(prescriberDrugOverrideLists);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.PrescbrDrugOvrrdListSK }));
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
        /// Validate PrescriberDrugOverride List
        /// </summary>
        /// <param name="prescriberDrugOverrideLists">the PrescriberDrugOverride List View Model to Validate</param>
        private bool ValidatePrescriberDrugOverrideList(PrescriberDrugOverrideVM prescriberDrugOverrideLists)
        {
            if (ModelState.IsValid)
            {
                foreach (Message item in _adminConfigBLL.ValidatePrescriberDrugOverrideList(prescriberDrugOverrideLists))
                {
                    ModelState.AddModelError(item.Fieldname, item.MessageText);
                }
            }

            return ModelState.IsValid;
        }
    }
}
