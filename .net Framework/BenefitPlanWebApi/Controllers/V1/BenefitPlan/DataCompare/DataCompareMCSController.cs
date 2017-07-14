using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.Core.WebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.DataCompare
{
    /// <summary>
    /// The Data Compare MCS Controller for Benefit Plan
    /// </summary>
    public class DataCompareMCSController : ApiController
    {
        /// <summary>the Data Compare MCS BLL</summary>
        private IDataCompareMCSBLL _dataCompareMCSBLL;

        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Controller for Data Compare MCS
        /// </summary>
        /// <param name="dataCompareMCSBLL">the Data Compare MCS BLL</param>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public DataCompareMCSController(IDataCompareMCSBLL dataCompareMCSBLL, IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
            _dataCompareMCSBLL = dataCompareMCSBLL;
        }

        /// <summary>
        /// Get Method for Data Compare MCS
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetDataCompareMCS()
        {
            try
            {
                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}