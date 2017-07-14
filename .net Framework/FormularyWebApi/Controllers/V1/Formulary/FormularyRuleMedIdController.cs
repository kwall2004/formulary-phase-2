using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Formulary
{
    public class FormularyRuleMedIdController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;
        public FormularyRuleMedIdController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        [HttpPost]
        public IHttpActionResult ConvertRulesToMedId(long formularySK)
        {
            try
            {
                var userId = Request.Headers.GetValues("username").FirstOrDefault();

                if (string.IsNullOrEmpty(userId))
                {
                    throw new Exception("userId missing from header of request!");
                }

                using (var repo = _repoFactory.Formulary())
                {
                    repo.ConvertRulesToMedId(formularySK, userId);
                    return Ok("Successful conversion.");
                }

            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
