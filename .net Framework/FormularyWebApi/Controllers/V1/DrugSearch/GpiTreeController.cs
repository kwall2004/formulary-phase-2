using Atlas.Core.WebApi.Services;
using Atlas.Formulary.BLL.DrugSearch;
using Atlas.Formulary.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.DrugSearch
{
    public class GpiTreeController : ApiController
    {
        private IDrugSearchBLL _bll;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        /// <param name="FormularyRepoFactory">Formulary repository factory</param>
        public GpiTreeController(IDrugSearchBLL bll, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _bll = bll;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Returns a tree of GPIs
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetGPITree()
        {
            try
            {
                var result = _bll.GetGpiTree();
                return Ok(new { children = result });                
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
