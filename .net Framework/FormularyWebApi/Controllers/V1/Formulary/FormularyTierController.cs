using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using Atlas.Formulary.BLL.Formulary;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.ViewModels;
using System;
using System.Net;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Formulary
{
    /// <summary>
    /// Formulary Tier WebApi controller
    /// </summary>
    public class FormularyTierController : ApiController
    {

        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repoFactory">Formulary repository factory</param>
        /// <param name="formularyBll">Formulary BLL</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        public FormularyTierController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }


        /// <summary>
        /// Retrieve the formulary tiers based on formulary Id
        /// </summary>
        /// <param name="formularyId"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetFormularyTierNames(int frmlrySK)
        {
            try
            {
                using (var db = _repoFactory.DrugTier())
                {
                    var formularyTiers = db.GetFormularyTierNames(frmlrySK);

                    var result = new QueryResult<spFormulary_GetTierNames_Result>();
                    result.Rows = formularyTiers;
                    result.Count = formularyTiers.Count;

                    return Ok(result);
                }

            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }


        [HttpPost]
        public IHttpActionResult PostFormularyTierNames(TierNamesVM tiers)
        {
            return SetFormularyTierNames(tiers);
        }

        [HttpPut]
        public IHttpActionResult UpdateFormularyTierNames(TierNamesVM tiers)
        {
            return SetFormularyTierNames(tiers);
        }

        private IHttpActionResult SetFormularyTierNames(TierNamesVM tiers)
        {
            try
            {
                using (var repo = _repoFactory.DrugTier())
                {
                    repo.PutFormularyTierNames(tiers);
                    return Ok("Successful");
                }
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Cannot insert duplicate key row in object"))
                {
                    return Content(HttpStatusCode.BadRequest, _exceptionResponseGenerator.GetCustomExceptionMessage(ex, "310", "All tiers must have a unique name."));
                }
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}