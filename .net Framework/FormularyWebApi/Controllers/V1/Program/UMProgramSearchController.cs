using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Program
{
    public class UMProgramSearchController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        public UMProgramSearchController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        [HttpGet]
        public IHttpActionResult UMProgramSmartSearch(string searchQuery)
        {
            try
            {
                using (var programRepo = _repoFactory.CoveragePropertyProgram())
                {
                    var result = programRepo.SmartSearchCoveragePropertyProgram(searchQuery);
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
