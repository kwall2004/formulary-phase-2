using Atlas.Core.DAL.Models.Containers;
using Atlas.BenefitPlan.BLL.Interfaces;
using System;
using System.Collections.Generic;
using System.Web.Http;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using BenefitPlanWebApi.Services;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.Core.WebApi.Services;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    /// <summary>
    /// The Benefit Definition Controller for Benefit Plan
    /// </summary>
    public class BenefitDefinitionController : ApiController
    {
        /// <summary>the Admin Config BLL</summary>
        private IAdminConfigBLL _adminConfigBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Benefit Controller
        /// </summary>
        /// <param name="adminConfigBLL">Admin Config BLL</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public BenefitDefinitionController(IAdminConfigBLL adminConfigBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _adminConfigBLL = adminConfigBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get a Benefit Definition by id
        /// </summary>
        /// <param name="benefitSK">benefitSK</param>
        /// <returns>List of Benefit Definition</returns>
        [HttpGet]
        public IHttpActionResult BenefitDefinition(long benefitSK)
        {
            try
            {
                BenefitDefinitionVM benefitDefinition = _adminConfigBLL.GetBenefitDefinition(benefitSK);
                var result = new QueryResult <BenefitDefinitionVM>() { Rows = new List<BenefitDefinitionVM>() { benefitDefinition }, Count = 1 };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Put Method to Set a Benefit Definition
        /// </summary>
        /// <param name="benefitDefinition">the Benefit Definition View Model to Set</param>
        /// <returns>the Benefit Definition View Model</returns>
        [HttpPut]
        public IHttpActionResult UpdateBenefitDefinition(BenefitDefinitionVM benefitDefinition)
        {
            return SetBenefitDefinition(benefitDefinition);      
        }

        #region " Private Methods "
        /// <summary>
        /// Method to Set a Benefit Definition
        /// </summary>
        /// <param name="benefitDefinition">the Benefit Definition View Model to Set</param>
        /// <returns>the Benefit Definition View Model</returns>
        private IHttpActionResult SetBenefitDefinition(BenefitDefinitionVM benefitDefinition)
        {
            try
            {
                benefitDefinition.CurrentUser = UtilityFunctions.GetCurrentUser(benefitDefinition.CurrentUser);

                if (ValidateBenefitDefinition(benefitDefinition))
                {
                    BenefitDefinitionVM result = _adminConfigBLL.SetBenefitDefinition(benefitDefinition);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.BnftSK }));
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
        /// Validate Benefit Definition
        /// </summary>
        /// <param name="benefitDefinition">the Benefit Definition View Model to Validate</param>
        private bool ValidateBenefitDefinition(BenefitDefinitionVM benefitDefinition)
        {
            if (ModelState.IsValid)
            {
                foreach (Message item in _adminConfigBLL.ValidateBenefitDefinition(benefitDefinition))
                {
                    ModelState.AddModelError(item.Fieldname, item.MessageText);
                }
            }

            return ModelState.IsValid;
        }
        #endregion
    }
}
