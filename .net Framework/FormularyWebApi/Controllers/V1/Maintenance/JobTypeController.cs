using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Maintenance
{
    public class JobTypeController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        public JobTypeController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        [HttpGet]
        public IHttpActionResult Get()
        {
            using (var repo = _repoFactory.JobType())
            {
                var result = repo.Get();
                return Ok(result);
            }
        }
    }
}