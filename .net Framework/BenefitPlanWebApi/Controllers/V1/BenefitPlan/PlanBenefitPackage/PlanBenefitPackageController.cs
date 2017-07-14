using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.Core.DAL.Models.Containers;
using BenefitPlanWebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Atlas.Core.WebApi.Services;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.PlanBenefitPackage
{
    /// <summary>
    /// The Plan Benefit Package Controller for Benefit Plan
    /// </summary>
    public class PlanBenefitPackageController : ApiController
    {
        /// <summary>
        /// the Benefit Plan Repository Factory
        /// </summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>
        /// the Plan Benefit Package business
        /// </summary>
        private IPlanBenefitPackageBLL _planBenefitPackageBLL;

        /// <summary>
        /// the Atlas Exception Message Generator
        /// </summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor for the PlanBenefitPackage Controller
        /// </summary>
        /// <param name="repoFactory"></param>
        /// <param name="planBenefitPackageBLL"></param>
        /// <param name="exceptionResponseGenerator"></param>
        public PlanBenefitPackageController(IBenefitPlanRepositoryFactory repoFactory, IPlanBenefitPackageBLL planBenefitPackageBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _planBenefitPackageBLL = planBenefitPackageBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }
        /// <summary>
        /// Assign Benefit Plan from Plan Benefit Package
        /// http://localhost:55229/BenefitPlanApi/Api/PlanBenefitPackage?pbpSKToAssign=19&bnftPlanSKToAssign=2&currentUser=glentest
        /// </summary>       
        [HttpPut]
        public IHttpActionResult AssignBnftPlanFromPlanBnftPackage(long pbpSKToAssign, long bnftPlanSKToAssign, string currentUser)
        {
            long result;
            try
            {
                result = _planBenefitPackageBLL.AssignBnftPlanToPlanBnftPackage(pbpSKToAssign, bnftPlanSKToAssign, currentUser);
                if (result > 0)
                {
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result }));
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
        /// Gets the Plan Benefit Package Details with Benefit Plans
        /// </summary>
        /// <param name="pbpSK"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetPlanBenefitPackage(long pbpSK)
        {
            try
            {
                PlanBenefitPackageVM PackageVM = _planBenefitPackageBLL.GetPlanBenefitPackage(pbpSK);
                var result = new QueryResult<PlanBenefitPackageVM>() { Rows = new List<PlanBenefitPackageVM>() { PackageVM }, Count = 1 };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Add/Update PlanBenefitPackage
        /// </summary>       
        [HttpPut]
        public IHttpActionResult SetPlanBenefitPackage(PlanBenefitPackageVM planBenefitPackage)
        {
            try
            {
                planBenefitPackage.CurrentUser = UtilityFunctions.GetCurrentUser(planBenefitPackage.CurrentUser);

                if (ValidatePlanBenefitPackage(planBenefitPackage))
                {
                    PlanBenefitPackageVM result = _planBenefitPackageBLL.AddOrUpdatePlanBenefitPackage(planBenefitPackage);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.PBPSK }));
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
        /// Get Method to Get all Plan Benefit Package Names - For Search
        /// </summary>
        /// <returns>Query Result</returns>
        [HttpGet]
        public IHttpActionResult GetAllPlanBenefitPackages()
        {
            try
            {
                using (var repo = _repoFactory.PlanBenefitPackage())
                {
                    List<PBP> planBenefitPackages = repo.FindAll().ToList();
                    var result = new QueryResult<PBP>() { Rows = planBenefitPackages, Count = planBenefitPackages.Count };
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Validate Plan Benefit Package
        /// </summary>
        /// <param name="itemToValidate">the Plan Benefit Package View Model to Validate</param>
        private bool ValidatePlanBenefitPackage(PlanBenefitPackageVM itemToValidate)
        {
            if (ModelState.IsValid)
            {
                foreach (Message item in _planBenefitPackageBLL.ValidatePlanBenefitPackage(itemToValidate))
                {
                    ModelState.AddModelError(item.Fieldname, item.MessageText);
                }
            }

            return ModelState.IsValid;
        }

    }
}
