using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using System;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.Search
{
    public class BenefitDefinitionSearchController : ApiController
    {
        /// <summary>the Admin Config BLL</summary>
        private IAdminConfigBLL _adminConfigBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the BenefitDefinitionSearch Controller
        /// </summary>
        /// <param name="adminConfigBLL">Admin Config BLL</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public BenefitDefinitionSearchController(IAdminConfigBLL adminConfigBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _adminConfigBLL = adminConfigBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Benefit Definition Search
        /// </summary>
        /// <param name="bnftName">the bnft name</param>
        /// <param name="bnftCode">the bnft Code</param>
        /// <param name="svcTypeSK">the Service Type SK</param>
        /// <param name="efctvStartDt">effective start date</param>
        /// <param name="efctvEndDt">effective end date</param>
        /// <returns>list of Benefits with their optional Service Types</returns>
        [HttpGet]
        public IHttpActionResult Search(string bnftName = null, string bnftCode = null, long? svcTypeSK = null, DateTime? efctvStartDt = null, DateTime? efctvEndDt = null)
        {
            try
            {
                var benefits = _adminConfigBLL.BenefitDefinitionSearch(bnftName, bnftCode, svcTypeSK, efctvStartDt, efctvEndDt);
                var result = new QueryResult<spBenefitDefinitionSearch_Result>() { Rows = benefits, Count = benefits.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
