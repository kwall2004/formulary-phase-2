using Atlas.Core.DAL.Models.Containers;
using Atlas.BenefitPlan.BLL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.Core.WebApi.Services;
using Atlas.BenefitPlan.DAL.Utility;
using BenefitPlanWebApi.Services;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.Models.Enums.JSON;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.CriteriaGroup
{
    /// <summary>
    /// The Criteria Detail Controller for Benefit Plan
    /// </summary>
    public class RuleDetailController : ApiController
    {

        /// <summary>the CriteriaGroup BLL</summary>
        private ICriteriaGroupBLL _criteriaGroupBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Criteria Detail Controller
        /// </summary>
        /// <param name="criteriaGroupBLL">CriteriaGroup BLL</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public RuleDetailController(ICriteriaGroupBLL criteriaGroupBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _criteriaGroupBLL = criteriaGroupBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get all the Criteria Details for a Criteria Set SK and return them in a list
        /// </summary>
        /// <param name="crtriaSetSK">crtriaSetSK</param>
        /// <returns>List of Criteria Details</returns>
        [HttpGet]
        public IHttpActionResult CriteriaDetail(long crtriaSetSK)
        {
            try
            {
                List<CriteriaDetailVM> criteriaDetails = _criteriaGroupBLL.GetAllRuleDetails(crtriaSetSK).ToList();
                var result = new QueryResult<CriteriaDetailVM>() { Rows = criteriaDetails, Count = criteriaDetails.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Put Method to Set a Criteria Detail for a Criteria Set.
        /// </summary>
        /// <param name="criteriaDetail">the CriteriaDetail View Model to Set</param>
        /// <returns>the CriteriaDetail View Model</returns>
        [HttpPut]
        public IHttpActionResult UpdateCriteriaDetail(CriteriaDetailVM criteriaDetail)
        {
            criteriaDetail.Deleted = false;
            return SetCriteriaDetail(criteriaDetail);
        }

        /// <summary>
        /// Post Method to Set a Criteria Detail for a Criteria Set.
        /// </summary>
        /// <param name="criteriaDetail">the CriteriaDetail View Model to Set</param>
        /// <returns>the CriteriaDetail View Model</returns>
        [HttpPost]
        public IHttpActionResult AddCriteriaDetail(CriteriaDetailVM criteriaDetail)
        {
            criteriaDetail.Deleted = false;
            criteriaDetail.CrtriaDtlSK = 0;
            return SetCriteriaDetail(criteriaDetail);
        }

        /// <summary>
        /// Delete Method to Remove a Criteria Detail from a Criteria Set.
        /// </summary>
        /// <param name="crtriaDtlSK">the Criteria Detail SK</param>
        /// <param name="currentUser">the Current Username</param>
        [HttpDelete]
        public IHttpActionResult RemoveCriteriaDetail(long crtriaDtlSK, string currentUser)
        {
            try
            {
                currentUser = UtilityFunctions.GetCurrentUser(currentUser);

                if (crtriaDtlSK != 0)
                {                   
                    _criteriaGroupBLL.RemoveRuleDetail(crtriaDtlSK, currentUser);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { crtriaDtlSK }));
                }
                else
                {
                    ModelState.AddModelError("crtriaDtlSK", "Criteria Detail record must be provided");
                    return Ok(JSONFunctions.AddUpdateErrorReponse(ModelState));
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        #region " Private Methods "
        /// <summary>
        /// Method to Set a CriteriaDetail
        /// </summary>
        /// <param name="criteriaDetail">the CriteriaDetail View Model to Set</param>
        /// <returns>the CriteriaDetail View Model</returns>
        private IHttpActionResult SetCriteriaDetail(CriteriaDetailVM criteriaDetail)
        {
            try
            {
                criteriaDetail.CurrentUser = UtilityFunctions.GetCurrentUser(criteriaDetail.CurrentUser);

                CriteriaDetailVM result = new CriteriaDetailVM();

                if (ValidateCriteriaDetail(criteriaDetail))
                {
                    result = _criteriaGroupBLL.SetCriteriaDetail(criteriaDetail);

                    if (result.Deleted)
                    { result = new CriteriaDetailVM(); }

                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.CrtriaDtlSK }, result));
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
        /// Validate CriteriaDetail
        /// </summary>
        /// <param name="criteriaDetail">the CriteriaDetail View Model to Validate</param>
        private bool ValidateCriteriaDetail(CriteriaDetailVM criteriaDetail)
        {
            return ModelState.IsValid;
        }
        #endregion


    }
}