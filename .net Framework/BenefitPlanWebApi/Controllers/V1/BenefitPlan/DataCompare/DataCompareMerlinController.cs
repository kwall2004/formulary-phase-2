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
    /// The Data Compare Merlin Controller for Benefit Plan
    /// </summary>
    public class DataCompareMerlinController : ApiController
    {
        /// <summary>the Data Compare Merlin BLL</summary>
        private IDataCompareMerlinBLL _dataCompareMerlinBLL;

        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Controller for Data Compare Merlin
        /// </summary>
        /// <param name="dataCompareMerlinBLL">the Data Compare Merlin BLL</param>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public DataCompareMerlinController(IDataCompareMerlinBLL dataCompareMerlinBLL, IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
            _dataCompareMerlinBLL = dataCompareMerlinBLL;
        }

        // =============================================================================
        //  TODO:  Create an End Point that does a batch by Status
        // =============================================================================

        /// <summary>
        /// Get Method for Data Compare Merlin
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetDataCompareMerlin(long? bnftPlanSK = null, string planPgmCode = null)
        {
            try
            {
                bnftPlanSK = bnftPlanSK ?? 10180;
                planPgmCode = planPgmCode ?? "UUHPA001";

                return Ok(_dataCompareMerlinBLL.ComparePlan(bnftPlanSK, planPgmCode));
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}