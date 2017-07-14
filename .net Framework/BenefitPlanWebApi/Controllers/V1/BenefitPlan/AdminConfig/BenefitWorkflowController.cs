using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.Core.WebApi.Services;
using BenefitPlanWebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.AdminConfig
{
    /// <summary>
    /// The Benefit Workflow Controller for Benefit Plan
    /// </summary>
    public class BenefitWorkflowController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the BenefitWorkflow Controller
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public BenefitWorkflowController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        ///  Change the status of a Benefit to a specific status.
        /// </summary>
        /// <param name="itemToAddOrUpdate">benefitWorkflow</param>
        /// <returns></returns>
        [HttpPut]
        public IHttpActionResult BenefitUpdateStatus(BenefitWorkflowVM itemToAddOrUpdate)
        {
            try
            {
                itemToAddOrUpdate.CurrentUser = UtilityFunctions.GetCurrentUser(itemToAddOrUpdate.CurrentUser);

                if (ModelState.IsValid)
                {
                    BenefitWorkflowVM result = SetBenefitStatus(itemToAddOrUpdate);
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

        private BenefitWorkflowVM SetBenefitStatus(BenefitWorkflowVM itemToAddOrUpdate)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            using (var repo = _repoFactory.BnftStat())
            using (var repoStatus = _repoFactory.StatusType())
            {
                long statusTypeSK = repoStatus.FindOne(s => s.StatDesc == itemToAddOrUpdate.newStatType).StatTypeSK;

                BnftStat bnftStat = new BnftStat();

                bnftStat.BnftSK = itemToAddOrUpdate.BnftSK;
                bnftStat.StatTypeSK = statusTypeSK;
                bnftStat.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
                bnftStat.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();
                bnftStat.CreatedBy = itemToAddOrUpdate.CurrentUser;
                bnftStat.CreatedTs = timeStamp;
                bnftStat.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                bnftStat.LastModfdTs = timeStamp;

                repo.AddOrUpdate(bnftStat);

                repo.SaveChanges();

                itemToAddOrUpdate.StatTypeSK = statusTypeSK;

                return itemToAddOrUpdate;
            }
        }

    }
}
