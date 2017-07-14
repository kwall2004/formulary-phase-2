using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using BenefitPlanWebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    public class BenefitPlanController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanBLL _benefitPlanBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;
        public BenefitPlanController(IBenefitPlanBLL benefitPlanBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _benefitPlanBLL = benefitPlanBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }
        /// <summary>
        /// Get Method to Get all Plan Benefit  - For Search
        /// </summary>
        /// <returns>Query Result</returns>
        [HttpGet]
        public IHttpActionResult GetAllBenefitPlans()
        {
            try
            {
                List<BnftPlan> benefitPlans = _benefitPlanBLL.GetAllBenefitPlans().ToList();
                var result = new QueryResult<BnftPlan>() { Rows = benefitPlans, Count = benefitPlans.Count };
                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get Method For one benefit plan
        /// </summary>
        /// <returns>Query Result</returns>
        [HttpGet]
        public IHttpActionResult GetBenefitPlan(long bnftPlanSK)
        {
            try
            {
                BenefitPlanVM benefitPlanVM = _benefitPlanBLL.GetBenefitPlanVM(bnftPlanSK);
                var result = new QueryResult<BenefitPlanVM>() { Rows = new List<BenefitPlanVM>() { benefitPlanVM }, Count = benefitPlanVM.BnftPlanSK != 0 ? 1 : 0 };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Save the benefit plan and benefit plan details or insert new
        /// </summary>
        /// <param name="benefitPlanVM">the benefit plan and benefit plan detail Update</param>
        /// <returns> the BenefitPlanVM that was updated</returns>
        // testing from end point with real data
        /* 
          {
  "BnftPlanSK": 0,
  "PrdctTypeSK": 12,
  "PlanClsfcnTypeSK": 4,
  "BnftPlanTypeSK": 2,
  "LOBSK": 1,
  "BnftPlanSizeClsfcnTypeSK": 2,
  "BnftPlanID": "9999",
  "BnftPlanName": "glen test 3 with updates",
  "TmpltInd": true,
  "BnftPlanYr": "2017",
  "EfctvStartDt": "2016-01-28T09:42:02.4579959-04:00",
  "EfctvEndDt": "9999-09-28T09:42:02.4579959-04:00",
  "GrandfatheredPlanInd": true,
  "AllowMnlEnrlmtInd": true,
  "NbrofNtwrkTiers": 3,
  "MaxNbrofDaysAlwdonCOBRAAmt": 1,
  "COBRABnftOfferedInd": true,
  "OnHIEInd": true,
  "HIOSPlanVarntID": "hi3",
  "DefaultVaccineAdmnstnFeeAmt": 10.0,
  "RequireSpcltyPharmforSpcltyDrugsInd": true,
  "MndtryGenrcDrugPlanInd": true,
  "RejAllClaimsInd": true,
  "AllowMbrLocksInd": true,
  "NbrofFrmlryTiers": 1,
  "OneMthDaySuplAmt": 21,
  "PrescbrDrugOvrrdListSK": 1,
  "AlwdPrescribersListSK": 1,
  "FrmlrySK": 72,
  "RxPrcgTypeSK": 2,
  "DrugDataSrcTypeSK": 1,
  "CopayFuncTypeSK": 1,
  "CMSBnftStructTypeSK": 1,
  "McrCvrgGapGenrcPct": 50.0,
  "McrCvrgGapBrandPct": 25.0,
  "McrPartBCoinsurancePct": 10.0,
  "PrcsMcrPartBClaimsInd": true,
  "CurrentUser": "glen test"
}

         */
        [HttpPut]
        public IHttpActionResult SetBenefitPlan(BenefitPlanVM benefitPlanVM)
        {
            try
            {
                benefitPlanVM.CurrentUser = UtilityFunctions.GetCurrentUser(benefitPlanVM.CurrentUser);
                if (ModelState.IsValid)
                {
                    BenefitPlanVM result = _benefitPlanBLL.SetBenefitPlanAndDetail(benefitPlanVM);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.BnftPlanSK }));
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
        /// Copy the benefit plan to crerate new one based on it
        /// http://localhost:55229/BenefitPlanApi/Api/BenefitPlan?bnftPlanSKToCopy=2&currentUser=glentest
        /// </summary>
        /// <param name="bnftPlanSKToCopy"></param>
        /// <returns>key for new plan</returns>
        [HttpPost]
        public IHttpActionResult CopyBenefitPlan(long bnftPlanSKToCopy, string currentUser)
        {
            try
            {
                long bnftPlanSKForCopy = _benefitPlanBLL.CopyBenefitPlan(bnftPlanSKToCopy, currentUser);

                if (bnftPlanSKForCopy > 0)
                {
                    return Ok(JSONFunctions.CopySuccessReponse(new List<long>() { bnftPlanSKForCopy }));
                }
                else
                {
                    List<Message> messages = new List<Message>();
                    Message message = new Message();
                    message.MessageText = "Benefit Plan could not be copied.";
                    messages.Add(message);
                    return Ok(JSONFunctions.AddUpdateErrorReponse(messages));
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
