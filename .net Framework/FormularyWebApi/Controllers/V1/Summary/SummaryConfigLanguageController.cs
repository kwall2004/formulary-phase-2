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
    public class SummaryConfigLanguageController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repoFactory">Formulary repository factory</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        public SummaryConfigLanguageController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        [HttpGet]
        public IHttpActionResult GetAllFormularySummaryConfigLanguages()
        {
            try
            {
                using (var summaryConfig = _repoFactory.FormularySummary())
                {
                    var result = summaryConfig.GetAllLanguages();
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
