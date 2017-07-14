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

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.CoverageSet
{
    /// <summary>
    /// The Coverage Set Configuration Controller for Benefit Plan
    /// </summary>
    public class CoverageSetConfigurationController : ApiController
    {
        /// <summary>the Coverage Set BLL</summary>
        private ICoverageSetBLL _coverageSetBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Benefit Controller
        /// </summary>
        /// <param name="coverageSetBLL">coverageSetBLL</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public CoverageSetConfigurationController(ICoverageSetBLL coverageSetBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _coverageSetBLL = coverageSetBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get a Coverage Set Configuration 
        /// </summary>
        /// <param name="cvrgSetSK">cvrgSetSK</param>
        /// <returns>Coverage Set Configuration</returns>
        [HttpGet]
        public IHttpActionResult CoverageSetConfiguration(long cvrgSetSK)
        {
            try
            {
                CoverageSetConfigurationVM coverageSetConfiguration = _coverageSetBLL.GetCoverageSetConfiguration(cvrgSetSK);
                var result = new QueryResult<CoverageSetConfigurationVM>() { Rows = new List<CoverageSetConfigurationVM>() { coverageSetConfiguration }, Count = 1 };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Put Method to Set a Coverage Set Configuration
        /// </summary>
        /// <param name="coverageSetConfiguration">the Coverage Set Configuration View Model to Set</param>
        /// <returns>the Coverage Set Configuration View Model</returns>
        [HttpPut]
        public IHttpActionResult UpdateCoverageSetConfiguration(CoverageSetConfigurationVM coverageSetConfiguration)
        {
            return SetCoverageSetConfiguration(coverageSetConfiguration);
        }

        #region " Private Methods "
        /// <summary>
        /// Method to Set a Coverage Set Configuration
        /// </summary>
        /// <param name="coverageSetConfiguration">the Coverage Set Configuration View Model to Set</param>
        /// <returns>the Coverage Set Configuration View Model</returns>
        private IHttpActionResult SetCoverageSetConfiguration(CoverageSetConfigurationVM coverageSetConfiguration)
        {
            try
            {
                coverageSetConfiguration.coverageSet.CurrentUser = UtilityFunctions.GetCurrentUser(coverageSetConfiguration.coverageSet.CurrentUser);

                if (ValidateCoverageSetConfiguration(coverageSetConfiguration))
                {
                    CoverageSetConfigurationVM result = _coverageSetBLL.SetCoverageSetConfiguration(coverageSetConfiguration);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.coverageSet.CvrgSetSK }));
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
        /// Validate Coverage Set Configuration
        /// </summary>
        /// <param name="coverageSetConfiguration">the Coverage Set Configuration View Model to Validate</param>
        private bool ValidateCoverageSetConfiguration(CoverageSetConfigurationVM coverageSetConfiguration)
        {
            if (ModelState.IsValid)
            {
                foreach (Message item in _coverageSetBLL.ValidateCoverageSetConfiguration(coverageSetConfiguration))
                {
                    ModelState.AddModelError(item.Fieldname, item.MessageText);
                }
            }

            return ModelState.IsValid;
        }
        #endregion

    }
}
