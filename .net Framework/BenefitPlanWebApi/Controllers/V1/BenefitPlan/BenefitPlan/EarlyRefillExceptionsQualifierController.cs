using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{

    public class EarlyRefillExceptionsQualifierController : ApiController
    {
        /// <summary>the Drug Reference Database BLL</summary>
        private IDrugReferenceDatabaseBLL _drugReferenceDatabaseBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Controller for all the drop-downs that are connected to benefit plan only
        /// </summary>
        /// <param name="drugReferenceDatabaseBLL">the Drug Reference Database BLL</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public EarlyRefillExceptionsQualifierController(IDrugReferenceDatabaseBLL drugReferenceDatabaseBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _drugReferenceDatabaseBLL = drugReferenceDatabaseBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get All Early Refill Exception Change Qualifier Types
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult EarlyRefillExceptionQulfrTypes(long bnftPlanSK = 0)
        {
            try
            {
                List<EarlyRefillExcpQulfrType> earlyRefillExceptionQualifierTypes = _drugReferenceDatabaseBLL.GetEarlyRefillExceptionQualifierType(bnftPlanSK);
                var result = new QueryResult<EarlyRefillExcpQulfrType>() { Rows = earlyRefillExceptionQualifierTypes, Count = earlyRefillExceptionQualifierTypes.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}