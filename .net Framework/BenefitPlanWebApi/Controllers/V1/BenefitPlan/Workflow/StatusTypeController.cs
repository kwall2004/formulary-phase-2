using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.Search
{
    public class StatustypeController : ApiController
    {
        /// <summary>
        /// the Benefit Plan Repository Factory
        /// </summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>
        /// the Atlas Exception Message Generator
        /// </summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor for the Pharmacy Types Controller
        /// </summary>
        /// <param name="repoFactory"></param>
        /// <param name="exceptionResponseGenerator"></param>
        public StatustypeController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Gets all Status Types
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetAllCostBasisType()
        {
            try
            {
                List<StatType> statusType = _repoFactory.StatusType().FindAll().ToList();
                var result = new QueryResult<StatType>() { Rows = statusType, Count = statusType.Count() };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}