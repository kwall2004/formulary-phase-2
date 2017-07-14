using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using System;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.Search
{
    /// <summary>
    ///  Benefit Plan Search Controller
    /// </summary>
    public class BenefitPlanSearchController : ApiController
    {
        /// <summary>the Benefit Plan BLL</summary>
        private IBenefitPlanBLL _benefitPlanBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;
        /// <summary>
        /// The Constructor for the Benefit Plan Search Controller
        /// </summary>
        /// <param name="BLL"></param>
        /// <param name="exceptionResponseGenerator"></param>
        public BenefitPlanSearchController(IBenefitPlanBLL benefitPlanBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _benefitPlanBLL = benefitPlanBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        ///  BenefitPlan Search EndPoint
        ///  
        ///  by BnftPlanSK:   BenefitPlanSearch?bnftPlanSK=6&LOBSK=?
        ///  by PBPSK:   BenefitPlanSearch?bnftPlanSK=&LOBSK=?&pBPSK=14
        ///  by Others:   BenefitPlanSearch?bnftPlanSK=&LOBSK=1&pBPSK=&tmltInd=&efctvStartDt=&efctvEndDt=
        /// </summary>
        /// <param name="bnftPlanSK">benefit plan ID</ param >
        /// <param name="LOBSK">The lobsk.</param>
        /// <param name="pBPSK">The p BPSK.</param>
        /// <param name="bnftPlanTypeSK">The BNFT plan type sk.</param>
        /// <param name="tmpltInd">The TMPLT ind.</param>
        /// <param name="efctvStartDt">The efctv start dt.</param>
        /// <param name="efctvEndDt">The efctv end dt.</param>
        /// <returns>list of Benefit plans</returns>
        [HttpGet]
        public IHttpActionResult Search(long? bnftPlanSK=null, long? lOBSK=null, long? pBPSK=null, long? bnftPlanTypeSK=null, Boolean? tmpltInd = null, DateTime? efctvStartDt = null, DateTime? efctvEndDt = null)
        {
            try
            {
                var plans = _benefitPlanBLL.BenefitPlanSearch(bnftPlanSK, lOBSK, pBPSK, bnftPlanTypeSK, tmpltInd, efctvStartDt, efctvEndDt);
                var result = new QueryResult<spBenefitPlanSearch_Result>() { Rows = plans, Count = plans.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        ///  BenefitPlan Search EndPoint
        /// </summary>
        /// <param name="bnftPlanName">The BNFT plan Name.</param>
        /// <param name="LOBSK">The lobsk.</param>
        /// <param name="pBPSK">The p BPSK.</param>
        /// <param name="bnftPlanTypeSK">The BNFT plan type sk.</param>
        /// <param name="tmpltInd">The TMPLT ind.</param>
        /// <param name="efctvStartDt">The efctv start dt.</param>
        /// <param name="efctvEndDt">The efctv end dt.</param>
        /// <returns>list of Benefit plans</returns>
        [HttpGet]
        public IHttpActionResult Search(string bnftPlanName, long? lOBSK = null, long? pBPSK = null, long? bnftPlanTypeSK = null, bool? tmpltInd = null, DateTime? efctvStartDt = null, DateTime? efctvEndDt = null)
        {
            try
            {
                var plans = _benefitPlanBLL.BenefitPlanSearchByText(bnftPlanName, lOBSK, pBPSK, bnftPlanTypeSK, tmpltInd, efctvStartDt, efctvEndDt);
                var result = new QueryResult<spBenefitPlanSearchByText_Result>() { Rows = plans, Count = plans.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
