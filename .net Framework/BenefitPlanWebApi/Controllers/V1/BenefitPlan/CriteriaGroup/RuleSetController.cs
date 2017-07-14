using Atlas.Core.DAL.Models.Containers;
using Atlas.BenefitPlan.BLL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.BenefitPlan.DAL.Models.Enums;
using Atlas.Core.WebApi.Services;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.CriteriaGroup
{
    /// <summary>
    /// The Rule Set Controller for Benefit Plan
    /// </summary>
    public class RuleSetController : ApiController
    {
        /// <summary>the CriteriaGroup BLL</summary>
        private ICriteriaGroupBLL _criteriaGroupBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Rule Set Controller
        /// </summary>
        /// <param name="criteriaGroupBLL">CriteriaGroup BLL</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public RuleSetController(ICriteriaGroupBLL criteriaGroupBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _criteriaGroupBLL = criteriaGroupBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Rule Sets by Critiera Set Type and an Object id
        /// </summary>
        /// <param name="crtriaSetType">crtriaSetType</param>
        /// <param name="objectSK">bnftSK or CvrgSetSK</param>
        /// <returns>List of Rule Sets</returns>
        [HttpGet]
        public IHttpActionResult RuleSet(CriteriaSetType crtriaSetType, long objectSK)
        {
            try
            {
                List<RuleSetVM> ruleSets = _criteriaGroupBLL.GetAllRuleSets(crtriaSetType, objectSK).ToList();
                var result = new QueryResult<RuleSetVM>() { Rows = ruleSets, Count = ruleSets.Count };
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

    }
}
