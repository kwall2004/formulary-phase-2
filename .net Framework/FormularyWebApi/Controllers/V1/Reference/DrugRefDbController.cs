using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Reference
{
    public class DrugRefDbController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        public DrugRefDbController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        [HttpGet]
        public IHttpActionResult Get()
        {
            var result = new QueryResult<DrugRefDb>();
            using (var repo = _repoFactory.DrugRefDb())
            {
                List<DrugRefDb> values = repo.Get();
                result.Count = values.Count();
                result.Rows = values;
            }

            return Ok(result);
        }
    }
}