using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Models.Containers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    /// <summary>
    /// The Network Tier Controller for Benefit Plan
    /// </summary>
    public class NetworkTierController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Network Tier Controller
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public NetworkTierController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get all the Network Tiers and return them in a list
        /// </summary>
        /// <returns>List of Network Tiers</returns>
        [HttpGet]
        public IHttpActionResult NetworkTiers()
        {
            try
            {
                List<NtwrkTier> networkTiers = _repoFactory.NetworkTier().FindAll().ToList();
                var result = new QueryResult<NtwrkTier>() { Rows = networkTiers, Count = networkTiers.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get all the Network Tiers for a Benefit Plan
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan ID</param>
        /// <returns>List of Network Tiers</returns>
        [HttpGet]
        public IHttpActionResult NetworkTiers(long bnftPlanSK)
        {
            try
            {
                List<NtwrkTierWithType> networkTiers = _repoFactory.NetworkTier().FindAll(w => w.BnftPlanSK == bnftPlanSK)
                    .Select(s => new NtwrkTierWithType()
                    {
                        NtwrkTierSK = s.NtwrkTierSK,
                        BnftPlanSK = s.BnftPlanSK,
                        NtwrkTierTypeSK = s.NtwrkTierTypeSK,
                        NtwrkTierNbr = s.NtwrkTierType.NtwrkTierNbr,
                        NtwrkTierName = s.NtwrkTierType.NtwrkTierName,
                        EfctvStartDt = s.EfctvStartDt,
                        EfctvEndDt = s.EfctvEndDt,
                        CreatedBy = s.CreatedBy,
                        CreatedTs = s.CreatedTs,
                        LastModfdBy = s.LastModfdBy,
                        LastModfdTs = s.LastModfdTs,
                        InctvTs = s.InctvTs,
                        DelTs = s.DelTs
            }).ToList();
                var result = new QueryResult<NtwrkTierWithType>() { Rows = networkTiers, Count = networkTiers.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}