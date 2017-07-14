using Atlas.BenefitPlan.DAL;
using System.Web.Http;
using Atlas.Core.WebApi.Services;
using System.Linq;
using System.Collections.Generic;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Models.Containers;
using System;
using Atlas.BenefitPlan.BLL.Interfaces;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    public class PlanCapLimitsQualifierController : ApiController
    {
        /// <summary>the Drug Reference Database BLL</summary>
        private IDrugReferenceDatabaseBLL _drugReferenceDatabaseBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Controller for all the dropdowns that are connected to benefit plan only
        /// </summary>
        /// <param name="drugReferenceDatabaseBLL">the Drug Reference Database BLL</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public PlanCapLimitsQualifierController(IDrugReferenceDatabaseBLL drugReferenceDatabaseBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _drugReferenceDatabaseBLL = drugReferenceDatabaseBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get All Plan Cap Limit Qualifier Types
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult PlanCapLimitsQulfrType(long bnftPlanSK = 0)
        {
            try
            {
                List<PlanCapLimQulfrType> planCapLimQualifierTypes = _drugReferenceDatabaseBLL.GetPlanCapLimitsQualifierType(bnftPlanSK);
                var result = new QueryResult<PlanCapLimQulfrType>() { Rows = planCapLimQualifierTypes, Count = planCapLimQualifierTypes.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
