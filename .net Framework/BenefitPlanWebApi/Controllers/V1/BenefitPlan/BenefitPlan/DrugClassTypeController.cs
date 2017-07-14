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
    /// The Dispense As Written Copay Controller for Benefit Plan
    /// </summary>
    public class DrugClassTypeController : ApiController
    {
        /// <summary>the Drug Reference Database BLL</summary>
        private IDrugReferenceDatabaseBLL _drugReferenceDatabaseBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Dispense As Written Copay Controller
        /// </summary>
        /// <param name="drugReferenceDatabaseBLL">the Drug Reference Database BLL</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public DrugClassTypeController(IDrugReferenceDatabaseBLL drugReferenceDatabaseBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _drugReferenceDatabaseBLL = drugReferenceDatabaseBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get all Drug Classes
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetAllDrugClassTypes(long bnftPlanSK = 0)
        {
            try
            {
                List<DrugClsType> drugClassTypeList = _drugReferenceDatabaseBLL.GetDrugClassType(bnftPlanSK);
                var result = new QueryResult<DrugClsType>() { Rows = drugClassTypeList, Count = drugClassTypeList.Count() };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}