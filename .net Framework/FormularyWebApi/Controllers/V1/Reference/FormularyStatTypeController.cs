using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Reference
{
    public class FormularyStatTypeController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repoFactory">Formulary Stat Type repository factory</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        public FormularyStatTypeController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        [HttpGet]
        public IHttpActionResult GetFormularyStatTypes()
        {
            try
            {
                using (var repo = _repoFactory.Formulary())
                {
                    var result = new QueryResult<StatType>();
                    var statTypes = repo.GetStatTypes();
                    result.Count = statTypes.Count;
                    result.Rows = statTypes;

                    return Ok(result);
                }

            }
            catch(Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
