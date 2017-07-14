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
    /// Drug Type WebApi controller
    /// </summary>
    public class DrugTypeFnController : ApiController
    {

        private IReferenceRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repoFactory">Drug Type Fn repository factory</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        public DrugTypeFnController(IReferenceRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// GetDrugTypeFn
        /// </summary>
        /// <param name="drugRefDbSK"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetDrugTypeFn(long drugRefDbSK)
        {
            var result = new QueryResult<DrugTypeFn>();
            using (var drugTypeFnRepository = _repoFactory.DrugType())
            {

                List<DrugTypeFn> values = drugTypeFnRepository.GetDrugTypeFns(drugRefDbSK);
                result.Count = values.Count();
                result.Rows = values;
            }

            return Ok(result);
        }
    }
}