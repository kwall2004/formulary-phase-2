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

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    /// <summary>
    /// The Dispense As Written Copay Controller for Benefit Plan
    /// </summary>
    public class FillExceptionController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanBLL _benefitPlanBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Dispense As Written Copay Controller
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public FillExceptionController(IBenefitPlanBLL benefitPlanBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _benefitPlanBLL = benefitPlanBLL; ;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get All Fill Exceptions
        /// </summary>
        /// <param name="bnftPlanSK"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetAllFillExceptions(long bnftPlanSK)
        {
            try
            {
                List<FillExceptionVM> fillExcList = _benefitPlanBLL.GetAllFillExceptions(bnftPlanSK);
                var result = new QueryResult<FillExceptionVM>() { Rows = fillExcList, Count = fillExcList.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Set Fill Exception
        /// </summary>
        /// <param name="fillException"></param>
        /// <returns></returns>
        [HttpPut]
        public IHttpActionResult SetFillException(FillExceptionVM fillException)
        {
            
            try
            {
                fillException.CurrentUser = UtilityFunctions.GetCurrentUser(fillException.CurrentUser);

                if (ValidateFillException(fillException))
                {
                    FillExceptionVM result = _benefitPlanBLL.AddOrUpdateFillException(fillException);
                    return Ok(result);
                }
                else
                {
                    return Ok(JSONFunctions.PopulationMessages(ModelState));
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Validate Fill Exception
        /// </summary>
        /// <param name="fillException">the Fill Exception View Model to Validate</param>
        private bool ValidateFillException(FillExceptionVM fillException)
        {
            if (ModelState.IsValid)
            {
                List<Message> result = new List<Message>();

                if (fillException.FillRngMinAmt != null && fillException.FillRngMaxAmt != null && fillException.FillRngMinAmt > fillException.FillRngMaxAmt)
                {
                    result.Add(new Message() { MessageText = string.Format("Fill Range From ({0}) is greater than Fill Range To: ({1}).", fillException.FillRngMinAmt, fillException.FillRngMaxAmt), Fieldname = "fillException.FillRngMinAmt" });
                }

                foreach (Message item in result)
                {
                    ModelState.AddModelError(item.Fieldname, item.MessageText);
                }

            }

            return ModelState.IsValid;
        }

    }
}