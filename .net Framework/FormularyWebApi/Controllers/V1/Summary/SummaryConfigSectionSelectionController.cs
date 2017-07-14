using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Summary
{
    public class SummaryConfigSectionSelectionController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repoFactory">Formulary repository factory</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        public SummaryConfigSectionSelectionController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        [HttpPost]
        public IHttpActionResult PostFormularySummaryConfigSection(long summaryReportConfigSK, long summaryReportSectionSK)
        {
            try
            {
                using (var summaryConfig = _repoFactory.FormularySummary())
                {
                    var userId = Request.Headers.GetValues("username").FirstOrDefault();
                    var result = summaryConfig.AddSummaryReportConfigSection(summaryReportConfigSK, summaryReportSectionSK, userId);
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpGet]
        public IHttpActionResult GetSummaryConfigSections(bool selected, long summaryReportConfigSK)
        {
            try
            {
                using (var summaryConfig = _repoFactory.FormularySummary())
                {
                    if(selected)
                    {
                        var result = summaryConfig.GetSelectedSummaryReportConfigSection(summaryReportConfigSK);
                        return Ok(result);
                    }
                    else
                    {
                        var result = summaryConfig.GetUnselectedSummaryReportConfigSection(summaryReportConfigSK);
                        return Ok(result);
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpDelete]
        public IHttpActionResult DeleteSummaryConfigSection(long summaryReportConfigSK, long summaryReportSectionSK)
        {
            try
            {
                using (var summaryConfig = _repoFactory.FormularySummary())
                {
                    summaryConfig.DeleteSummaryReportConfigSection(summaryReportConfigSK, summaryReportSectionSK);
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
