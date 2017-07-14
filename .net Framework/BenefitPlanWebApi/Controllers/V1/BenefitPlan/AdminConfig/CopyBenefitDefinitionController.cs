using Atlas.BenefitPlan.DAL;
using Atlas.Core.WebApi.Services;
using BenefitPlanWebApi.Services;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.AdminConfig
{
    /// <summary>
    /// The Copy Benefit Definition Controller for Benefit Plan
    /// </summary>
    public class CopyBenefitDefinitionController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Copy Benefit Definition Controller
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public CopyBenefitDefinitionController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        ///
        /// </summary>
        /// <param name="origBnftSK">origBnftSK</param>
        /// <param name="CurrentUser">Current User</param>
        /// <returns></returns>
        [HttpPut]
        public IHttpActionResult BenefitCopyDefinition(long origBnftSK, string CurrentUser)
        {
            try
            {
                using (var repo = _repoFactory.AtlasBenefitPlanStoredProcs())
                {
                    long bnftSK = repo.BenefitCopyDefinition(origBnftSK, CurrentUser);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { bnftSK }));
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

    }
}
