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
    public class SummaryConfigTitlePageController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repoFactory">Formulary repository factory</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        public SummaryConfigTitlePageController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        [HttpGet]
        public IHttpActionResult GetFormularySummaryConfigTitlePage(long summaryReportConfigSectionSK)
        {
            try
            {
                using (var summaryConfig = _repoFactory.FormularySummary())
                {
                    var repoResult = summaryConfig.GetSummaryReportConfigSection(summaryReportConfigSectionSK);
                    var stringSplit = repoResult.SctnCfgJSON.Split('.');
                    var indexOfName = stringSplit[0].LastIndexOf(@"\") + 1;
                    int firstColon = repoResult.SctnCfgJSON.IndexOf(":") + 2;
                    stringSplit[0] = stringSplit[0].Remove(firstColon, indexOfName - firstColon);
                    stringSplit[1] = "." + stringSplit[1];
                    repoResult.SctnCfgJSON = string.Join("", stringSplit);
                    var result = JsonConvert.DeserializeObject(repoResult.SctnCfgJSON);
                    var list = new List<object>();
                    list.Add(result);
                    return Ok(list);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpPut]
        public IHttpActionResult PutFormularySummaryConfigBackText(SummaryConfigTitleVM rawData)
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
