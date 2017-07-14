using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    /// <summary>
    /// The Copay Override Qualifier Type Controller for Benefit Plan
    /// </summary>
    public class CopayOverrideQualifierTypeController : ApiController
    {
        /// <summary>the Drug Reference Database BLL</summary>
        private IDrugReferenceDatabaseBLL _drugReferenceDatabaseBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Copay Override Qualifier Type Controller
        /// </summary>
        /// <param name="drugReferenceDatabaseBLL">the Drug Reference Database BLL</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public CopayOverrideQualifierTypeController(IDrugReferenceDatabaseBLL drugReferenceDatabaseBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _drugReferenceDatabaseBLL = drugReferenceDatabaseBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get all the Copay Override Qualifier Types
        /// </summary>
        /// <returns>List of BenefitServiceTypes</returns>
        [HttpGet]
        public IHttpActionResult CopayOverrideQualifierTypes(long bnftPlanSK = 0)
        {
            try
            {
                List<CopayOvrrdQulfrType> copayOverrideQualifierTypes = _drugReferenceDatabaseBLL.GetCopayOverrideQualifierType(bnftPlanSK);
                var result = new QueryResult<CopayOvrrdQulfrType>() { Rows = copayOverrideQualifierTypes, Count = copayOverrideQualifierTypes.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
