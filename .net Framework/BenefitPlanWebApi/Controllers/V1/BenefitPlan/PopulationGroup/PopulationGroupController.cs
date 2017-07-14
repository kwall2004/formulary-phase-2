using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using BenefitPlanWebApi.Services;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.PopulationGroup
{
    /// <summary>
    /// The Population Group Controller for Benefit Plan
    /// </summary>
    public class PopulationGroupController : ApiController
    {
        /// <summary>the Entity BLL</summary>
        private IEntityBLL _entityBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Population Group Controller
        /// </summary>
        /// <param name="entityBLL">the Benefit Plan Entity BLL</param>
        /// <param name="exceptionResponseGenerator">the Exception Response Generator</param>
        public PopulationGroupController(IEntityBLL entityBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _entityBLL = entityBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method to Get Population Group Model by Population Group ID
        /// </summary>
        /// <param name="popGrpSK">the Population Group ID</param>
        /// <returns>the Population Group Model</returns>
        [HttpGet]
        public IHttpActionResult GetPopulationGroupModel(long popGrpSK = 0)
        {
            try
            {
                PopulationGroupVM populationGroup = _entityBLL.GetPopulationGroup(popGrpSK);
                var result = new QueryResult<PopulationGroupVM>() { Rows = new List<PopulationGroupVM>() { populationGroup }, Count = 1 };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get Method to Get Population Group Model by Group ID
        /// </summary>
        /// <param name="grpSK">the Group SK</param>
        /// <returns>List of population Group Model</returns>
        [HttpGet]
        public IHttpActionResult GetPopulationGroupModelsByGrpSK(long grpSK)
        {
            try
            {
                List<PopulationGroupVM> populationGroups = _entityBLL.GetPopulationGroupsByGrpSK(grpSK);
                var result = new QueryResult<PopulationGroupVM>() { Rows = populationGroups, Count = populationGroups.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Post Method to Set Population Group
        /// </summary>
        /// <param name="populationgroup">the Population Group View Model to Set</param>
        /// <returns>the Population Group Model</returns>
        [HttpPost]
        public IHttpActionResult AddPopulationGroupModel(PopulationGroupVM populationgroup)
        {
            populationgroup.PopGrpSK = 0;
            return SetPopulationGroupModel(populationgroup);
        }

        /// <summary>
        /// Put Method to Set Population Group
        /// </summary>
        /// <param name="populationgroup">the Population Group View Model to Set</param>
        /// <returns>the Population Group Model</returns>
        [HttpPut]
        public IHttpActionResult UpdatePopulationGroupModel(PopulationGroupVM populationgroup)
        {
            return SetPopulationGroupModel(populationgroup);
        }

        #region " Private Methods "
        /// <summary>
        /// Method to Set Population Group
        /// </summary>
        /// <param name="populationgroup">the Population Group View Model to Set</param>
        /// <returns>the Population Group Model</returns>
        private IHttpActionResult SetPopulationGroupModel(PopulationGroupVM populationgroup)
        {
            try
            {
                populationgroup.CurrentUser = UtilityFunctions.GetCurrentUser(populationgroup.CurrentUser);
                if (ValidatePopulationGroup(populationgroup))
                {
                    PopulationGroupVM result = _entityBLL.SetPopulationGroup(populationgroup);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.PopGrpSK }));
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
        /// Validate Population Group 
        /// </summary>
        /// <param name="populationgroup">the Population Group View Model to Validate</param>
        private bool ValidatePopulationGroup(PopulationGroupVM populationgroup)
        {
            if (ModelState.IsValid)
            {
                foreach (Message item in _entityBLL.ValidatePopulationGroup(populationgroup))
                {
                    ModelState.AddModelError(item.Fieldname, item.MessageText);
                }
            }

            return ModelState.IsValid;
        }
        #endregion
    }
}