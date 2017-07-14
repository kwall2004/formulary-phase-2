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
    /// The Low Income Cost-Sharing Subsidy Controller Type for Benefit Plan
    /// </summary>
    public class LICSTypeController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Low Income Cost-Sharing Subsidy Controller
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public LICSTypeController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method to Get All Low Income Cost-Sharing Subsidy Types
        /// </summary>
        /// <returns>List of All Low Income Cost-Sharing Subsidy Types</returns>
        [HttpGet]
        public IHttpActionResult GetLowIncomeCostSharingSubsidyTypes()
        {
            try
            {
                List<LICSType> licsTypes = _repoFactory.LowIncomeCostSharingSubsidyType().FindAll().ToList();
                return Ok(new QueryResult<LICSType>() { Rows = licsTypes, Count = licsTypes.Count() });
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get Method to Get All Low Income Cost-Sharing Subsidy Types for a Benefit Plan
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan ID</param>
        /// <returns>List of All Low Income Cost-Sharing Subsidy Types</returns>
        [HttpGet]
        public IHttpActionResult GetLowIncomeCostSharingSubsidyTypes(long bnftPlanSK)
        {
            try
            {
                List<LICSType> licsTypes = _repoFactory.LowIncomeCostSharingSubsidySetup()
                                                .FindAll(w => w.BnftPlanSK == bnftPlanSK)
                                                .Select(s => s.LICSType)
                                                .OrderBy(o => o.LICSTypeSK)
                                                .Distinct().ToList();
                return Ok(new QueryResult<LICSType>() { Rows = licsTypes, Count = licsTypes.Count() });
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
