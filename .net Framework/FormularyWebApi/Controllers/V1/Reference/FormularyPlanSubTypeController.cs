using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using Atlas.Reference.DAL;
using Atlas.Reference.DAL.Models;
using System;
using System.Linq;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Reference
{
    public class FormularyPlanSubTypeController : ApiController
    {

        private IReferenceRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        public FormularyPlanSubTypeController (IReferenceRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        [HttpGet]
        public IHttpActionResult GetFormularyPlanType()
        {
            try
            {
                var result = new QueryResult<FrmlryPlanSubType>();
                using (var formularyPlanTypeRepository = _repoFactory.FrmlryPlanSubType())
                {
                    var values = formularyPlanTypeRepository.GetFormularyPlanSubType();
                   
                    if (values.Count() > 0)
                    {
                        result.Count = values.Count();
                        result.Rows = values.ToList();
                    }
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

    }
}
