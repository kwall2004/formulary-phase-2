using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.DrugSearch
{
    public class NewDrugsToMarketMedispanController : ApiController
    {
        private IExceptionMessageGenerator _exceptionResponseGenerator;
        private IFormularyRepositoryFactory _FormularyRepoFactory;

        public NewDrugsToMarketMedispanController(IExceptionMessageGenerator exceptionResponseGenerator, IFormularyRepositoryFactory FormularyRepoFactory)
        {
            _exceptionResponseGenerator = exceptionResponseGenerator;
            _FormularyRepoFactory = FormularyRepoFactory;
        }

        [HttpGet]
        public IHttpActionResult GetNewDrugsToMarket(string gpiId = null, string drugType = null, DateTime? fromDate = null, DateTime? thruDate = null)
        {
            try
            {
                using (var repo = _FormularyRepoFactory.NewDrugsToMarket())
                {
                    var result = repo.GetNewDrugsToMarketMedispan(fromDate, thruDate, drugType, gpiId).ToList();
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Search drugs based on smart search text string only. 
        /// </summary>
        /// <param name="searchString">Search query</param>
        /// <param name="drugListSK"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult NewDrugsSmartDrugSearchMedispan(string searchString)
        {
            try
            {
                using (var repo = _FormularyRepoFactory.NewDrugsToMarket())
                {
                    var result = repo.GetNewDrugsToMarketFullTextSearchMedispan(searchString);
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}
