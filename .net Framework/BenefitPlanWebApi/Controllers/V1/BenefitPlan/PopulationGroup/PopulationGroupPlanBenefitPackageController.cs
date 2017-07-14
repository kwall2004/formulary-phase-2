using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.Models.Enums.JSON;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.PopulationGroup
{
    /// <summary>
    /// The Population Group Plan Benefit Package Controller for Benefit Plan
    /// </summary>
    public class PopulationGroupPlanBenefitPackageController : ApiController
    {
        /// <summarythe Population Group Plan Benefit Package BLL</summary>
        private IPopulationGroupPlanBenefitPackageBLL _populationGroupPlanBenefitPackageBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Population Group Plan Benefit Package Controller
        /// </summary>
        /// <param name="planBenefitPackageBLL">the Plan Benefit Package BLL</param>
        /// <param name="exceptionResponseGenerator">the Exception Response Generator</param>
        public PopulationGroupPlanBenefitPackageController(IPopulationGroupPlanBenefitPackageBLL populationGroupPlanBenefitPackageBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _populationGroupPlanBenefitPackageBLL = populationGroupPlanBenefitPackageBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method to Get all Population Group Plan Benefit Packages by Population Group ID
        /// </summary>
        /// <param name="popGrpSK">the Population Group PBP ID</param>
        /// <returns>the Population Group Plan Benefit Package VM</returns>
        [HttpGet]
        public IHttpActionResult GetPopulationGroupPlanBenefitPackages(long popGrpSK)
        {
            if (popGrpSK != 0)
            {
                try
                {
                    List<PopulationGroupPlanBenefitPackageList> planBenefitPackageList = _populationGroupPlanBenefitPackageBLL.GetPlanBenefitPackages(popGrpSK);
                    var result = new QueryResult<PopulationGroupPlanBenefitPackageList>() { Rows = planBenefitPackageList, Count = planBenefitPackageList.Count() };
                    return Ok(result);
                }
                catch (Exception ex)
                {
                    return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
                }
            }
            else
            {
                return BadRequest("PopGrpSK is required, Invalid Request.");
            }
        }

        /// <summary>
        /// Delete Method to Remove a Plan Benefit Package from a Population Group
        /// </summary>
        /// <param name="popGrpPBPSK">the Population Group Plan Benefit Package SK</param>
        /// <param name="currentUser">the Current Username</param>
        [HttpDelete]
        public IHttpActionResult UnassignPlanBenefitPackage(long popGrpPBPSK, string currentUser)
        {
            try
            {
                if (popGrpPBPSK != 0)
                {
                    currentUser = UtilityFunctions.GetCurrentUser(currentUser);
                    Message message = _populationGroupPlanBenefitPackageBLL.UnassignPopulationGroupPlanBenefitPackage(popGrpPBPSK, currentUser);
                    ValidationResponse validationMessage = new ValidationResponse() { };
                    validationMessage.Success = message.Type == JSONMessageType.Info.ToString() ? true : false;
                    validationMessage.Messages.Add(message);
                    validationMessage.Count = validationMessage.Messages.Count();
                    return Ok(validationMessage);
                }
                else
                {
                    return BadRequest("No Benefit Packages provided...");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        ///// <summary>
        ///// Post Method to Set Population GroupPlan Benefit Packages
        ///// </summary>
        ///// <param name="populationGroupPlanBenefitPackage">thePopulation GroupPlan Benefit Packages to Update</param>
        ///// <returns>the Add Update Response - JSON with the Result</returns>
        //[HttpPost]
        //public IHttpActionResult AddPopulationGroupPlanBenefitPackage(PopulationGroupPlanBenefitPackageVM populationGroupPlanBenefitPackage)
        //{
        //    populationGroupPlanBenefitPackage.PopGrpPBPSK = 0;

        //    return SetPopulationGroupPlanBenefitPackage(populationGroupPlanBenefitPackage);
        //}

        ///// <summary>
        ///// Put Method to Set Population GroupPlan Benefit Packages
        ///// </summary>
        ///// <param name="populationGroupPlanBenefitPackage">the Population GroupPlan Benefit Packages to Update</param>
        ///// <returns>the Add Update Response - JSON with the Result</returns>
        //[HttpPut]
        //public IHttpActionResult UpdatePopulationGroupPlanBenefitPackage(PopulationGroupPlanBenefitPackageVM populationGroupPlanBenefitPackage)
        //{
        //    return SetPopulationGroupPlanBenefitPackage(populationGroupPlanBenefitPackage);
        //}

        #region " Private Methods "

        ///// <summary>
        ///// Method to Set Population GroupPlan Benefit Packages
        ///// </summary>
        ///// <param name="populationGroupPlanBenefitPackage">the Population GroupPlan Benefit Packages to Update</param>
        ///// <returns>the Add Update Response - JSON with the Result</returns>
        //private IHttpActionResult SetPopulationGroupPlanBenefitPackage(PopulationGroupPlanBenefitPackageVM populationGroupPlanBenefitPackage)
        //{
        //    try
        //    {
        //        populationGroupPlanBenefitPackage.CurrentUser = UtilityFunctions.GetCurrentUser(populationGroupPlanBenefitPackage.CurrentUser);
        //        if (ValidatePopulationGroupPlanBenefitPackage(populationGroupPlanBenefitPackage))
        //        {
        //            PopulationGroupPlanBenefitPackageVM result = _populationGroupPlanBenefitPackageBLL.SetPlanBenefitPackage(populationGroupPlanBenefitPackage);
        //            return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.PopGrpPBPSK }));
        //        }
        //        else
        //        {
        //            return Ok(JSONFunctions.AddUpdateErrorReponse(ModelState));
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
        //    }

        //}

        ///// <summary>
        ///// Validate the Population Group Plan Benefit Package Record - Complex Logic
        ///// </summary>
        ///// <param name="populationGroupPlanBenefitPackage">the Population GroupPlan Benefit Packages to Update</param>
        //private bool ValidatePopulationGroupPlanBenefitPackage(PopulationGroupPlanBenefitPackageVM populationGroupPlanBenefitPackage)
        //{
        //    // Validate Business Logic for the Entity Address
        //    if (ModelState.IsValid)
        //    {
        //        foreach (Message item in _populationGroupPlanBenefitPackageBLL.ValidatePlanBenefitPackage(populationGroupPlanBenefitPackage))
        //        {
        //            ModelState.AddModelError(item.Fieldname, item.MessageText);
        //        }
        //    }

        //    return ModelState.IsValid;
        //}
        #endregion
    }
}
