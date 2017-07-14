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
    /// The Deductible Exclusion Qualifier Type Controller for Benefit Plan
    /// </summary>
    public class DeductibleExclusionQualifierTypeController : ApiController
    {
        /// <summary>the Drug Reference Database BLL</summary>
        private IDrugReferenceDatabaseBLL _drugReferenceDatabaseBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Deductible Exclusion Qualifier Type Controller
        /// </summary>
        /// <param name="drugReferenceDatabaseBLL">the Drug Reference Database BLL</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public DeductibleExclusionQualifierTypeController(IDrugReferenceDatabaseBLL drugReferenceDatabaseBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _drugReferenceDatabaseBLL = drugReferenceDatabaseBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get All Deductible Exclusion Qualifier Type
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult DeductibleExclusionQualifierTypes(long bnftPlanSK = 0)
        {
            try
            {
                List<DeducblExclQulfrType> deductibleExclusionQualifierTypes = _drugReferenceDatabaseBLL.GetDeductibleExclusionQualifierType(bnftPlanSK);
                var result = new QueryResult<DeducblExclQulfrType>() { Rows = deductibleExclusionQualifierTypes, Count = deductibleExclusionQualifierTypes.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}