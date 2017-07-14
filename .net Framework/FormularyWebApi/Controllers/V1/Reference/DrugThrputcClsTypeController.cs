using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Reference
{
    /// <summary>
    /// DrugThrputcClsType WebApi controller
    /// </summary>
    public class DrugThrputcClsTypeController : ApiController
    {

        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repoFactory">DrugThrputcClsType repository factory</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        public DrugThrputcClsTypeController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }


        [HttpGet]
        public IHttpActionResult GetDrugThrputcClsTypes()
        {
            var result = new QueryResult<DrugThrputcClsType>();
            using (var drugThrputcClsTypesRepository = _repoFactory.DrugThrputcClsType())
            {

                List<DrugThrputcClsType> values = drugThrputcClsTypesRepository.GetDrugThrputcClsType();
                result.Count = values.Count();
                result.Rows = values;
            }

            return Ok(result);
        }
    }
}