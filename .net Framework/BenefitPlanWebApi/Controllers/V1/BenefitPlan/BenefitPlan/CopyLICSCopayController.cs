using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.Models.Enums.JSON;
using Atlas.Core.WebApi.Services;
using BenefitPlanWebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    /// <summary>
    /// The Copy LICS Copay Controller for Benefit Plan
    /// </summary>
    public class CopyLICSCopayController : ApiController
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
        public CopyLICSCopayController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Copy LICS Setup
        /// </summary>
        /// <param name="copyLICSCopayList"></param>
        /// <returns></returns>
        [HttpPut]
        public IHttpActionResult LICSSetupCopy(CopyLICSCopayList copyLICSCopayList)
        {
            try
            {
                string copyToLICSTypes = string.Empty;
                string copyToPharmTypes = string.Empty;

                copyToLICSTypes = string.Join(",", copyLICSCopayList.copyToLICSTypes);
                copyToPharmTypes = string.Join(",", copyLICSCopayList.copyToPharmTypes);

                using (var repo = _repoFactory.AtlasBenefitPlanStoredProcs())
                {
                    int returnCode = repo.LICSSetupCopy(copyLICSCopayList.bnftPlanSK, copyLICSCopayList.copyFromLICSTypeSK, copyToLICSTypes, copyLICSCopayList.copyFromPharmTypeSK, copyToPharmTypes, copyLICSCopayList.overwriteDuplicates, copyLICSCopayList.username);
                    return returnCode != -1
                        ? Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { (long)(copyLICSCopayList.bnftPlanSK ?? 0) }))
                        : Ok(JSONFunctions.AddUpdateErrorReponse(new List<Message>()
                            {
                                JSONFunctions.SetMessage(string.Empty, JSONMessageType.Error, "LICS copay rows for the destination LICS type(s) and pharm type(s) already exist for one or more records from the source LICS type and pharm type LICS copay rows.", string.Empty)
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
