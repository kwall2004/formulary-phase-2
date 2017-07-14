using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Formulary
{
    public class FormularyNDCController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        public FormularyNDCController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }
    
        [HttpGet]
        public IHttpActionResult GetFormulariesByNDC(string NDC)
        {

            try
            {
                using (var repo = _repoFactory.Formulary())
                {
                    List<spFormulariesForNDC_Get_Result> formularies = repo.GetFormulariesByNDC(NDC);
                    return Ok(formularies);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }

        }
    }
}


