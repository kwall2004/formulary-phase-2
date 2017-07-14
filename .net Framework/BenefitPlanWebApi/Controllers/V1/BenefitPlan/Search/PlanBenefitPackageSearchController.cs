using System;
using System.Linq;
using System.Web.Http;

//project using statements
using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Models.Containers;
using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.Models.Enums.JSON;
using Atlas.Core.WebApi.Services;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.Search
{

    /// <summary>
    /// The Plan Benefit Package Controller for Benefit Plan
    /// </summary>
    public class PlanBenefitPackageSearchController : ApiController
    {
        /// <summary>the Benefit Plan Repository BLL</summary>
        private IPlanBenefitPackageBLL _planBenefitPackageBLL;

        /// <summarythe Population Group Plan Benefit Package BLL</summary>
        private IPopulationGroupPlanBenefitPackageBLL _populationGroupPlanBenefitPackageBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;


        /// <summary>
        /// The Constructor for the PBP Search Controller
        /// </summary>
        /// <param name="planBenefitPackageBLL>the Benefit Plan Repository BLL</param>
        /// <param name="exceptionResponseGenerator">the Exception Response Generator</param>
        public PlanBenefitPackageSearchController(IPlanBenefitPackageBLL planBenefitPackageBLL, IPopulationGroupPlanBenefitPackageBLL populationGroupPlanBenefitPackageBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _planBenefitPackageBLL = planBenefitPackageBLL;
            _populationGroupPlanBenefitPackageBLL = populationGroupPlanBenefitPackageBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Validate if the Plan Benefit Package can be assigned to a Population Group
        /// </summary>
        /// <param name="pbpSK">the Plan Benefit Package Key</param>
        /// <param name="popGrpSK">the Population Group Key</param>
        /// <returns>returns a Validation Response</returns>
        [HttpGet]
        public IHttpActionResult AssignPlanBenefitPackage(long pbpSK, long popGrpSK)
        {
            try
            {
                Message message = _populationGroupPlanBenefitPackageBLL.GetPlanBenefitPackageAssignmentMessage(popGrpSK, pbpSK);
                ValidationResponse validationMessage = new ValidationResponse() { };
                validationMessage.Success = message.Type == JSONMessageType.Info.ToString() ? true : false;
                validationMessage.Messages.Add(message);
                validationMessage.Count = validationMessage.Messages.Count();
                return Ok(validationMessage);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// PBP Search
        /// 
        /// Find by PBPSK:  PlanBenefitPackageSearch?pBPSK=1 
        /// Find by other:  PlanBenefitPackageSearch?pBPSK=&lobSK=1&bnftPlanTypeSK=&tenantFamName=tenantName=&acctName=&grpName=&popGrpName=&efctvStartDt=&efctvEndDt=
        /// 
        /// </summary>
        /// <param name="pBPSK">the PBP ID</param>
        /// <param name="lOBSK">the line of business </param>
        /// <param name="bnftPlanTypeSK">the benefit plan type</param>
        /// <param name="tenantFamName"> tenant family name to search</param>
        /// <param name="tenantName">tenant name to search</param>
        /// <param name="acctName">account name</param>
        /// <param name="grpName">group name</param>
        /// <param name="popGrpName">population group name</param>
        /// <param name="efctvStartDt">effective start date</param>
        /// <param name="efctvEndDt">effective end date</param>
        /// <returns>list of PBPs</returns>
        [HttpGet]
        public IHttpActionResult Search(long? pBPSK = null, long? lOBSK = null, long? bnftPlanTypeSK = null
            , string tenantFamName = null, string tenantName = null, string acctName = null, string grpName=null, string popGrpName = null
            , DateTime? efctvStartDt = null, DateTime? efctvEndDt = null)
        {
            try
            {
                var packages = _planBenefitPackageBLL.PlanBenefitPackageSearch(pBPSK, lOBSK, bnftPlanTypeSK, tenantFamName, tenantName, acctName, grpName, popGrpName, efctvStartDt, efctvEndDt);
                var result = new QueryResult<spPlanBenefitPackageSearch_Result>() { Rows = packages, Count = packages.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// PBP Search By Text
        /// </summary>
        /// <param name="pbpName">the PBP Name</param>
        /// <param name="lOBSK">the line of business </param>
        /// <param name="bnftPlanTypeSK">the benefit plan type</param>
        /// <param name="tenantFamName"> tenant family name to search</param>
        /// <param name="tenantName">tenant name to search</param>
        /// <param name="acctName">account name</param>
        /// <param name="grpName">group name</param>
        /// <param name="popGrpName">population group name</param>
        /// <param name="efctvStartDt">effective start date</param>
        /// <param name="efctvEndDt">effective end date</param>
        /// <returns>list of PBPs</returns>
        [HttpGet]
        public IHttpActionResult Search(string pbpName, long? lOBSK = null, long? bnftPlanTypeSK = null
            , string tenantFamName = null, string tenantName = null, string acctName = null, string grpName = null, string popGrpName = null
            , DateTime? efctvStartDt = null, DateTime? efctvEndDt = null)
        {
            try
            {
                var packages = _planBenefitPackageBLL.PlanBenefitPackageSearchByText(pbpName, lOBSK, bnftPlanTypeSK, tenantFamName, tenantName, acctName, grpName, popGrpName, efctvStartDt, efctvEndDt);
                var result = new QueryResult<spPlanBenefitPackageSearchByText_Result>() { Rows = packages, Count = packages.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
