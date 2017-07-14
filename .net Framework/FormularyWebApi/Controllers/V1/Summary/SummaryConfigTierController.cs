using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.ViewModels.SummaryVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Summary
{
    public class SummaryConfigTierController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repoFactory">Formulary repository factory</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        public SummaryConfigTierController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        [HttpPost]
        public IHttpActionResult PostFormularySummaryConfigTier(long summaryReportConfigSK, long formularySK)
        {
            try
            {
                using (var summaryConfig = _repoFactory.FormularySummary())
                {
                    var userId = Request.Headers.GetValues("username").FirstOrDefault();
                    var result = summaryConfig.PostSummaryReportConfigTier(summaryReportConfigSK, formularySK, userId);
                    return Ok(result);
                }
            }
            catch(Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpPut]
        public IHttpActionResult PutFormularySummaryConfigTier(SummaryConfigReportTierPutVM summaryConfigTier)
        {
            try
            {
                using (var summaryConfig = _repoFactory.FormularySummary())
                {
                    var userId = Request.Headers.GetValues("username").FirstOrDefault();
                    var result = summaryConfig.PutSummaryReportConfigTier(summaryConfigTier, userId);
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpGet]
        public IHttpActionResult GetFormularySummaryConfigTier(long summaryReportConfigSK, long formularySK)
        {
            try
            {
                using (var summaryConfig = _repoFactory.FormularySummary())
                {
                    var result = summaryConfig.GetSummaryReportConfigTier(summaryReportConfigSK, formularySK);
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
