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
    /// The Formulary Tier Controller for Benefit Plan
    /// </summary>
    public class FormularyTierController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the BenefitServiceType Controller
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public FormularyTierController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method to Get Formulary Tiers for Benefit Plan ID
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan ID</param>
        /// <returns>List of Formulary Tier</returns>
        [HttpGet]
        public IHttpActionResult GetFormularyTiers(long bnftPlanSK)
        {
            try
            {
                List<FrmlryTier> formularyTiers = _repoFactory.FormularyTier().FindAll(w => w.BnftPlanSK == bnftPlanSK).ToList();
                return Ok(new QueryResult<FrmlryTier>() { Rows = formularyTiers, Count = formularyTiers.Count() });
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
