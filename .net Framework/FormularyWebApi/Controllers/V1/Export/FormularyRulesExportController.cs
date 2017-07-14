using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Export
{
    public class FormularyRulesExportController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repoFactory">Formulary repository factory</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        public FormularyRulesExportController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        [HttpPost]
        public IHttpActionResult SetFormularyRulesExport(long formularySK)
        {
            try
            {
                using (var repo = _repoFactory.FormularyExport())
                {
                    var userId = Request.Headers.GetValues("username").FirstOrDefault();
                    repo.PutJobExport(6, formularySK, userId);
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
