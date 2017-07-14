using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Reference
{
    public class DrugRefDbValQulfrTypeController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        public DrugRefDbValQulfrTypeController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        [HttpGet]
        public IHttpActionResult Get(long? drugRefDbSk = null)
        {
            using (var repo = _repoFactory.DrugRefDbValQulfrType())
            {
                var result = repo.Get(drugRefDbSk);
                return Ok(result);
            }
        }
    }
}