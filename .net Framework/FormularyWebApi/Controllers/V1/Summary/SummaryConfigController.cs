using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Summary
{
    public class SummaryConfigController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repoFactory">Formulary repository factory</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        public SummaryConfigController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        [HttpGet]
        public IHttpActionResult GetAllFormularySummaryConfigs()
        {
            try
            {
                using (var summaryConfig = _repoFactory.FormularySummary())
                {
                    var result = summaryConfig.GetAllSummaryReportConfig();
                    return Ok(result);
                }
            }
            catch(Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpPost]
        public IHttpActionResult PostFormularySummaryConfig(long formularySK)
        {
            try
            {
                using (var summaryConfig = _repoFactory.FormularySummary())
                {
                    string userId = Request.Headers.GetValues("username").FirstOrDefault();
                    var result = summaryConfig.PostSummaryReportConfig(formularySK, userId);
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
        
        [HttpPut]
        public IHttpActionResult PutFormularySummaryConfig(SummaryConfigReportPutVM summaryConfig)
        {
            try
            {
                using (var summaryConfigRepo = _repoFactory.FormularySummary())
                {
                    string userId = Request.Headers.GetValues("username").FirstOrDefault();
                    var result = summaryConfigRepo.PutSummaryReportConfig(summaryConfig, userId);
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpPost]
        public IHttpActionResult ActivateFormularySummary(long summaryReportConfigSK)
        {
            try
            {
                using (var summaryConfigRepo = _repoFactory.FormularySummary())
                {
                    string userId = Request.Headers.GetValues("username").FirstOrDefault();
                    summaryConfigRepo.ActivateSummaryReportConfig(summaryReportConfigSK, userId);
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpGet]
        public IHttpActionResult GetFormularySummaryConfig(long summaryReportConfigSK)
        {
            try
            {
                using (var summaryConfigRepo = _repoFactory.FormularySummary())
                {
                    var result = summaryConfigRepo.GetSummaryReportConfig(summaryReportConfigSK);
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
