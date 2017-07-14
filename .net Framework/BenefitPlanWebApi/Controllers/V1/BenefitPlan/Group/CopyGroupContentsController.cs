using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using BenefitPlanWebApi.Services;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.Group
{
    /// <summary>
    /// The Copy Group Contents Controller for Benefit Plan
    /// </summary>
    public class CopyGroupContentsController : ApiController
    {
        /// <summary>the Entity BLL</summary>
        private IPopulationGroupPlanBenefitPackageBLL _populationGroupPlanBenefitPackageBLL;

        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Copy Group Contents Controller
        /// </summary>
        /// <param name="entityBLL">the Benefit Plan Entity BLL</param>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public CopyGroupContentsController(IPopulationGroupPlanBenefitPackageBLL populationGroupPlanBenefitPackageBLL, IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _populationGroupPlanBenefitPackageBLL = populationGroupPlanBenefitPackageBLL;
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method to Get Population Group & PBP List by Group ID
        /// </summary>
        /// <param name="grpSK">the Group SK</param>
        /// <returns>List of population Group Model</returns>
        [HttpGet]
        public IHttpActionResult GetPopulationGroupModelsByGrpSK(long grpSK)
        {
            try
            {
                List<GroupCopyContentsVM> groupCopyContentsVM = _populationGroupPlanBenefitPackageBLL.GetPopulationGroupWithPlanBenefitPackage(grpSK);
                var result = new QueryResult<GroupCopyContentsVM>() { Rows = groupCopyContentsVM, Count = groupCopyContentsVM.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }


        /// <summary>
        ///
        /// </summary>
        /// <param name="jsonString">jsonString</param>
        /// <returns></returns>
        [HttpPut]
        public IHttpActionResult GroupCopyContents(GroupCopyContentsVM groupCopyContentsVM)
        {
            try
            {
                if (ValidateGroupCopyContent(groupCopyContentsVM))
                {
                    using (var repo = _repoFactory.AtlasBenefitPlanStoredProcs())
                    {
                        groupCopyContentsVM.PopGrpName = groupCopyContentsVM.PopGrpName.TrimEnd();
                        string jsonString = JsonConvert.SerializeObject(groupCopyContentsVM);
                        long pbpCount = repo.GroupCopyContents(jsonString);
                        return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { pbpCount }));
                    }
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
        /// Validate Group Copy Content
        /// </summary>
        /// <param name="groupCopyContentsVM">the Group Copy Content View Model to Validate</param>
        private bool ValidateGroupCopyContent(GroupCopyContentsVM groupCopyContentsVM)
        {
            if (ModelState.IsValid)
            {
                foreach (Message item in _populationGroupPlanBenefitPackageBLL.ValidateGroupCopyContent(groupCopyContentsVM))
                {
                    ModelState.AddModelError(item.Fieldname, item.MessageText);
                }
            }

            return ModelState.IsValid;
        }

    }
}
