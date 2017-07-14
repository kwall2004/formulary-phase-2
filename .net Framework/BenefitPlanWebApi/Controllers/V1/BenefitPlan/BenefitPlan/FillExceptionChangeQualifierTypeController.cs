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
    /// The Fill Exception Change Qualifier Type Controller for Benefit Plan
    /// </summary>
    public class FillExceptionChangeQualifierTypeController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Fill Exception Change Qualifier Type Controller
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public FillExceptionChangeQualifierTypeController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get All Fill Exception Change Qualifier Types
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult FillExceptionChangeQualifierTypes()
        {
            try
            {
                List<FillExcpChngQulfrType> fillExceptionChangeQualifierTypes = _repoFactory.FillExceptionChangeQualifierType().FindAll().ToList();
                var result = new QueryResult<FillExcpChngQulfrType>() { Rows = fillExceptionChangeQualifierTypes, Count = fillExceptionChangeQualifierTypes.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}