using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.ViewModels.SummaryVM;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Summary
{
    public class SummaryConfigPaStController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repoFactory">Formulary repository factory</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        public SummaryConfigPaStController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        [HttpGet]
        public IHttpActionResult GetFormularySummaryConfigPaSt(long summaryReportConfigSectionSK)
        {
            try
            {
                using (var summaryConfig = _repoFactory.FormularySummary())
                {
                    var repoResult = summaryConfig.GetSummaryReportConfigSection(summaryReportConfigSectionSK);
                    var result = JsonConvert.DeserializeObject(repoResult.SctnCfgJSON);
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpPut]
        public IHttpActionResult PutFormularySummaryConfigPaSt(SummaryConfigPaStVM rawData)
        {
            try
            {
                using (var summaryConfig = _repoFactory.FormularySummary())
                {
                    var summaryReportConfigSectionSK = rawData.summaryReportConfigSectionSK;
                    var sectionConfigJson = JsonConvert.SerializeObject(rawData);
                    var result = summaryConfig.PutSummaryReportConfigSection(summaryReportConfigSectionSK, sectionConfigJson);
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
