using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Models.Containers;
using System;
using System.Collections.Generic;
using System.Web.Http;
using Atlas.Core.WebApi.Services;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.CriteriaGroup
{
    /// <summary>
    /// The Value Qualifier Type Controller for Benefit Plan
    /// </summary>
    public class ValueQualifierTypeController : ApiController
    {
        /// <summary>the Criteria Group BLL</summary>
        private ICriteriaGroupBLL _criteriaGroupBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Value Qualifier Type Controller
        /// </summary>
        ///<param name="criteriaGroupBLL">Criteria Group BLL</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public ValueQualifierTypeController(ICriteriaGroupBLL criteriaGroupBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _criteriaGroupBLL = criteriaGroupBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get all the Value Qualifier Types and return them in a list
        /// </summary>
        /// <returns>List of Value Qualifier Types</returns>
        [HttpGet]
        public IHttpActionResult ValueQualifierTypes()
        {
            try
            {
                List<ValQulfrType> valQulfrTypes = _criteriaGroupBLL.GetAllValueQualifierTypes();
                var result = new QueryResult<ValQulfrType>() { Rows = valQulfrTypes, Count = valQulfrTypes.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get Method to Get Value Qualifier Type Model by Criteria Set Type
        /// </summary>
        /// <param name="criteriaSetType">Criteria Set Type</param>
        /// <returns>the Value Qualifier Type View Model</returns>
        [HttpGet]
        public IHttpActionResult ValueQualifierTypes(long? criteriaSetType)
        {
            try
            {
                List<ValQulfrType> valQulfrTypes = _criteriaGroupBLL.GetAllValueQualifierTypes(criteriaSetType);
                var result = new QueryResult<ValQulfrType>() { Rows = valQulfrTypes, Count = valQulfrTypes.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

    }
}
