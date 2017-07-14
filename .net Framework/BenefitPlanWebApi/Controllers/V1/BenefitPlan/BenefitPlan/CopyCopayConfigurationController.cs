using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.Models.Enums.JSON;
using Atlas.Core.WebApi.Services;
using BenefitPlanWebApi.Services;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    /// <summary>
    /// The Copy Copay Configuration Controller for Benefit Plan
    /// </summary>
    public class CopyCopayConfigurationController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Copy Copay Configuration Controller
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public CopyCopayConfigurationController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Copy Copay Setup
        /// </summary>
        /// <param name="copyCopaySetupList"></param>
        /// <returns></returns>
        [HttpPut]
        public IHttpActionResult CopaySetupCopy(CopyCopaySetupList copyCopaySetupList)
        {
            try
            {
                string copyToPharmTypes = string.Empty;
                copyToPharmTypes = string.Join(",", copyCopaySetupList.copyToPharmTypes);

                using (var repo = _repoFactory.AtlasBenefitPlanStoredProcs())
                {
                    int returnCode = repo.CopaySetupCopy(copyCopaySetupList.bnftPlanSK, copyCopaySetupList.copyFromPharmTypeSK, copyToPharmTypes, copyCopaySetupList.copyFromNtwrkTierSK, copyCopaySetupList.copyToNtwrkTierSK , copyCopaySetupList.overwriteDuplicates, copyCopaySetupList.username);
                    return returnCode != -1
                        ? Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { (long)(copyCopaySetupList.bnftPlanSK ?? 0) }))
                        : Ok(JSONFunctions.AddUpdateErrorReponse(new List<Message>()
                            {
                                JSONFunctions.SetMessage(string.Empty, JSONMessageType.Error, "Copay setup rows for the destination pharmacy type(s) and network tier already exist for one or more of the day supply records from the source pharmacy type and network tier copay setup rows.", string.Empty)
                            }));
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

    }
}