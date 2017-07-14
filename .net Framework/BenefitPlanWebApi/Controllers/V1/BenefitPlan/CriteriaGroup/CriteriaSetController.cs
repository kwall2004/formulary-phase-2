using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.Models.Enums;
using Atlas.BenefitPlan.DAL.Models.Enums.JSON;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using BenefitPlanWebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.CriteriaGroup
{
    /// <summary>
    /// The Criteria Set Controller for Benefit Plan
    /// </summary>
    public class CriteriaSetController : ApiController
    {
        /// <summary>the CriteriaGroup BLL</summary>
        private ICriteriaGroupBLL _criteriaGroupBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Criteria Set Controller
        /// </summary>
        /// <param name="criteriaGroupBLL">CriteriaGroup BLL</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public CriteriaSetController(ICriteriaGroupBLL criteriaGroupBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _criteriaGroupBLL = criteriaGroupBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Criteria Sets by Critiera Set Type and an Object id
        /// </summary>
        /// <param name="crtriaSetType">crtriaSetType</param>
        /// <param name="objectSK">bnftSK or CvrgSetSK</param>
        /// <returns>List of Criteria Sets</returns>
        [HttpGet]
        public IHttpActionResult CriteriaSet(CriteriaSetType crtriaSetType, long objectSK)
        {
            try
            {
                List<CriteriaSetVM> criteriaSets = _criteriaGroupBLL.GetAllCriteriaSets(crtriaSetType, objectSK).ToList();
                var result = new QueryResult<CriteriaSetVM>() { Rows = criteriaSets, Count = criteriaSets.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get all the Criteria Sets for a Criteria Set Type and return them in a list
        /// </summary>
        /// <param name="crtriaSetType">crtriaSetType</param>
        /// <returns>List of Criteria Sets</returns>
        [HttpGet]
        public IHttpActionResult CriteriaSets(CriteriaSetType crtriaSetType)
        {
            try
            {
                List<CriteriaSetVM> crtriaSets = _criteriaGroupBLL.GetCriteriaSets(crtriaSetType).ToList();
                var result = new QueryResult<CriteriaSetVM>() { Rows = crtriaSets, Count = crtriaSets.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Put Method to Set a Criteria Set for a Benefit Definition or a Coverage Set.
        /// </summary>
        /// <param name="criteriaSet">the CriteriaSet View Model to Set</param>
        /// <returns>the CriteriaSet View Model</returns>
        [HttpPut]
        public IHttpActionResult UpdateCriteriaSet(CriteriaSetVM criteriaSet)
        {
            criteriaSet.isDeleted = false;
            return SetCriteriaSet(criteriaSet);
        }

        /// <summary>
        /// Post Method to Set a Criteria Set for a Benefit Definition or a Coverage Set.
        /// </summary>
        /// <param name="criteriaSet">the CriteriaSet View Model to Set</param>
        /// <returns>the CriteriaSet View Model</returns>
        [HttpPost]
        public IHttpActionResult AddCriteriaSet(CriteriaSetVM criteriaSet)
        {
            criteriaSet.isDeleted = false;
            criteriaSet.CrtriaSetSK = 0;
            return SetCriteriaSet(criteriaSet);
        }

        /// <summary>
        /// Delete Method to Remove a Criteria Set from a Benefit Definition.
        /// </summary>
        /// <param name="bnftCrtriaSetSK">the Benefit Criteria Set SK</param>
        /// <param name="currentUser">the Current Username</param>
        [HttpDelete]
        public IHttpActionResult RemoveCriteriaSet(long bnftCrtriaSetSK, string currentUser)
        {
            try
            {
                currentUser = UtilityFunctions.GetCurrentUser(currentUser);

                if (bnftCrtriaSetSK != 0)
                {
                    _criteriaGroupBLL.RemoveRuleSet(bnftCrtriaSetSK, currentUser);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { bnftCrtriaSetSK }));
                }
                else
                {
                    ModelState.AddModelError("bnftCrtriaSetSK", "Criteria Set record must be provided");
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
        /// Method to Set a CriteriaSet
        /// </summary>
        /// <param name="criteriaSet">the CriteriaSet View Model to Set</param>
        /// <returns>the CriteriaSet View Model</returns>
        private IHttpActionResult SetCriteriaSet(CriteriaSetVM criteriaSet)
        {
            try
            {
                criteriaSet.CurrentUser = UtilityFunctions.GetCurrentUser(criteriaSet.CurrentUser);

                CriteriaSetVM result = new CriteriaSetVM();

                if (ValidateCriteriaSet(criteriaSet))
                {
                    if (criteriaSet.BnftCrtriaSetSK != null)
                    {
                        result = _criteriaGroupBLL.SetBenefitCriteriaSet(criteriaSet);
                    }
                    else
                    {
                       // do the cvrg set equivalent    result = _criteriaGroupBLL.SetBenefitCriteriaSet(criteriaSet);
                    }

                    if (criteriaSet.isDeleted == true)
                    { result = new CriteriaSetVM(); }

                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.CrtriaSetSK },result));
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
        /// Validate CriteriaSet
        /// </summary>
        /// <param name="criteriaSet">the CriteriaSet View Model to Validate</param>
        private bool ValidateCriteriaSet(CriteriaSetVM criteriaSet)
        {
            if (ModelState.IsValid)
            {
                foreach (Message item in _criteriaGroupBLL.ValidateCriteriaSet(criteriaSet))
                {
                    ModelState.AddModelError(item.Fieldname, item.MessageText);
                }
            }

            return ModelState.IsValid;
        }
        #endregion


    }
}
