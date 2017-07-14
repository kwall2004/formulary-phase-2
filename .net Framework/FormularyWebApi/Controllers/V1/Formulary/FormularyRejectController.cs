using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.ViewModels;
using System;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Formulary
{
    public class FormularyRejectController : ApiController
    {
        private IExceptionMessageGenerator _exceptionResponseGenerator;
        private IFormularyRepositoryFactory _repoFactory;
        public FormularyRejectController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        [HttpPost]
        public IHttpActionResult DashboardRejectFormulary(DashboardVM parms)
        {
            try
            {
                using (var repo = _repoFactory.Formulary())
                {
                    repo.DashboardFormularyReject(parms);
                    return Ok();
                }
            }
            catch(Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
