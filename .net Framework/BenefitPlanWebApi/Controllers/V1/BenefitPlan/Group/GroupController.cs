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

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.Group
{
    /// <summary>
    /// The Group Controller for Benefit Plan
    /// </summary>
    public class GroupController : ApiController
    {
        /// <summary>the Entity BLL</summary>
        private IEntityBLL _entityBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Group Controller
        /// </summary>
        /// <param name="entityBLL">the Benefit Plan Entity BLL</param>
        /// <param name="exceptionResponseGenerator">the Exception Response Generator</param>
        public GroupController(IEntityBLL entityBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _entityBLL = entityBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method to Get Group Model by Group ID
        /// </summary>
        /// <param name="grpSK">the Group ID</param>
        /// <returns>the Group Model</returns>
        [HttpGet]
        public IHttpActionResult GetGroupModel(long grpSK = 0)
        {
            try
            {
                GroupVM group = _entityBLL.GetGroup(grpSK);
                var result = new QueryResult<GroupVM>() { Rows = new List<GroupVM>() { group }, Count = 1 };
                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get Method to Get Group Model by Account ID
        /// </summary>
        /// <param name="acctSK">the Account SK</param>
        /// <returns>List of Group Model</returns>
        [HttpGet]
        public IHttpActionResult GetGroupModelsByAcctSK(long acctSK)
        {
            try
            {
                List<GroupVM> groups = _entityBLL.GetGroupsByAcctSK(acctSK);
                var result = new QueryResult<GroupVM>() { Rows = groups, Count = groups.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }


        /// <summary>
        /// Post Method to Set Group
        /// </summary>
        /// <param name="group">the Group View Model to Set</param>
        /// <returns>the Group Model</returns>
        [HttpPost]
        public IHttpActionResult AddGroupModel(GroupVM group)
        {
            group.GrpSK = 0;
            return SetGroupModel(group);
        }

        /// <summary>
        /// Put Method to Set Group
        /// </summary>
        /// <param name="group">the Group View Model to Set</param>
        /// <returns>the Group Model</returns>
        [HttpPut]
        public IHttpActionResult UpdateGroupModel(GroupVM group)
        {
            return SetGroupModel(group);
        }

        #region " Private Methods "
        /// <summary>
        /// Method to Set Group
        /// </summary>
        /// <param name="group">the Group View Model to Set</param>
        /// <returns>the Group Model</returns>
        private IHttpActionResult SetGroupModel(GroupVM group)
        {
            try
            {
                group.CurrentUser = UtilityFunctions.GetCurrentUser(group.CurrentUser);
                if (ValidateGroup(group))
                {
                    GroupVM result = _entityBLL.SetGroup(group);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.GrpSK }));
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
        /// Validate Group 
        /// </summary>
        /// <param name="group">the Group View Model to Validate</param>
        private bool ValidateGroup(GroupVM group)
        {
            if (ModelState.IsValid)
            {
                foreach (Message item in _entityBLL.ValidateGroup(group))
                {
                    ModelState.AddModelError(item.Fieldname, item.MessageText);
                }
            }


            return ModelState.IsValid;
        }
        #endregion
    }
}