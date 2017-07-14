using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.Models.Containers;
using Atlas.Formulary.DAL.ViewModels.SummaryVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Summary
{
    public class SummaryConfigCoveragePropertyController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repoFactory">Formulary repository factory</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        public SummaryConfigCoveragePropertyController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        [HttpGet]
        public IHttpActionResult GetSummaryConfigCoverageProperty(long summaryReportConfigSK)
        {
            try
            {
                using (var summaryConfig = _repoFactory.FormularySummary())
                {
                    var result = summaryConfig.GetSummaryReportCoverageProperty(summaryReportConfigSK);
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpPost]
        public IHttpActionResult PostFormularySummaryConfigCoverageProperty(long summaryReportConfigSK)
        {
            try
            {
                using (var summaryConfig = _repoFactory.FormularySummary())
                {
                    string userId = Request.Headers.GetValues("username").FirstOrDefault();
                    var result = summaryConfig.PostSummaryReportCoverageProperty(summaryReportConfigSK, userId);
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpPut]
        public IHttpActionResult PutFormularySummaryConfigCoverageProperty(SummaryConfigCoveragePropertyVM summaryReportCoverageProperty)
        {
            try
            {
                using (var summaryConfig = _repoFactory.FormularySummary())
                {
                    string userId = Request.Headers.GetValues("username").FirstOrDefault();
                    var result = summaryConfig.PutSummaryReportCoverageProperty(summaryReportCoverageProperty, userId);
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
