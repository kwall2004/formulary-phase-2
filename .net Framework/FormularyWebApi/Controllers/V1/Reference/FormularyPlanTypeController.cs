using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using Atlas.Reference.DAL;
using Atlas.Reference.DAL.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Reference
{
    /// <summary>
    /// Formulary Plan Type WebApi controller
    /// </summary>
    public class FormularyPlanTypeController : ApiController
    {

        private IReferenceRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repoFactory">Formulary Plan Type repository factory</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        public FormularyPlanTypeController(IReferenceRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }


        [HttpGet]
        public IHttpActionResult GetFormularyPlanType()
        {
            var result = new QueryResult<FrmlryPlanType>();
            using (var formularyPlanTypeRepository = _repoFactory.FrmlryPlanType())
            {

                List<FrmlryPlanType> values = formularyPlanTypeRepository.GetFormularyPlanType();
                result.Count = values.Count();
                result.Rows = values;
            }

            return Ok(result);
        }
    }
}