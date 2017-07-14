using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using Atlas.Formulary.BLL.Formulary;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Formulary
{
    /// <summary>
    /// Formulary Header WebApi controller
    /// </summary>
    public class FormularyHeaderController : ApiController
    {

        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repoFactory">Formulary repository factory</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        public FormularyHeaderController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }


        /// <summary>
        /// Retrieve the formulary header based on formulary Id
        /// </summary>
        /// <param name="formularyId"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetFormularyHeader(int FrmlrySK)
        {
            try
            {
                using (var db = _repoFactory.Formulary())
                {
                    var formularyHeader = db.GetHeader(FrmlrySK);

                    var result = new QueryResult<spFormulary_GetHeader_Result>();
                    result.Rows.Add(formularyHeader);
                    result.Count = 1;

                    return Ok(result);
                }

            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
        /// <summary>
        /// Retrieve all formulary headers.
        /// </summary>
        /// <returns>array</returns>
        [HttpGet]
        public IHttpActionResult GetAllFormularyHeaders()
        {
            try
            {
                using (var repo = _repoFactory.Formulary())
                {
                    List<spFormulary_GetAll_Result> formularyheaders = repo.GetAll();
                    var result = new QueryResult<spFormulary_GetAll_Result>() { Rows = formularyheaders, Count = formularyheaders.Count };
                    return Ok(result);
                }

            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }


        /// <summary>
        /// Creates formulary header.
        /// </summary>
        /// <param name="formularyHeader"></param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult PostFormularyHeader(spFormulary_GetHeader_Result formularyHeader)
        {
            formularyHeader.FrmlrySK = null;
            formularyHeader.CreatedBy = Request.Headers.GetValues("username").FirstOrDefault();

            return AddOrCreateHeaderHeader(formularyHeader);
        }


        /// <summary>
        /// Updates formulary header.
        /// </summary>
        /// <param name="formularyHeader"></param>
        /// <returns></returns>
        [HttpPut]
        public IHttpActionResult PutFormularyHeader(spFormulary_GetHeader_Result formularyHeader)
        {
            formularyHeader.CreatedBy = Request.Headers.GetValues("username").FirstOrDefault();
            return AddOrCreateHeaderHeader(formularyHeader);
        }

        [HttpDelete]
        public IHttpActionResult DeleteFormularyHeader(long FrmlrySK)
        {
            try
            {
                using (var repo = _repoFactory.Formulary())
                {
                    repo.DeleteFormulary(FrmlrySK);
                    return Ok();
                }
            }
            catch(Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        public static string FirstCharToUpper(string input)
        {
            if (String.IsNullOrEmpty(input))
                throw new ArgumentException("Empty String!");
            return input.First().ToString().ToUpper() + String.Join("", input.Skip(1));
        }

        private IHttpActionResult AddOrCreateHeaderHeader(spFormulary_GetHeader_Result formularyHeader)
        {
            try
            {
                using (var repo = _repoFactory.Formulary())
                {
                    //TODO refactor sort into a common helper function
                    formularyHeader.FrmlryName = FirstCharToUpper(formularyHeader.FrmlryName);
                    
                    var result = repo.PutFormularyHeader(formularyHeader.FrmlrySK,
                                  formularyHeader.LOBSK,
                                  formularyHeader.DrugThrputcClsTypeSK,
                                  formularyHeader.DrugRefDbSK,
                                  formularyHeader.DrugPostObsltAlwdDays,
                                  formularyHeader.FrmlryName,
                                  formularyHeader.EfctvStartDt.Value,
                                  formularyHeader.EfctvEndDt.Value,
                                  formularyHeader.PlanType,
                                  formularyHeader.DrugTypeFunction,
                                  formularyHeader.IsExcludeOTC, //put this in until we get clarification on the GET
                                  formularyHeader.CreatedBy,
                                  null,
                                  "1,2,3,4,5",
                                  1,
                                  "1",
                                  null,
                                  null,
                                  formularyHeader.AutomaticallyAssignNewNDCsInd.Value, 
                                  formularyHeader.SumRptCfgSK);
                    var resultResult = new QueryResult<long> { Rows = { result }, Count = 1 };
                    return Ok(resultResult);
                }
            }         
            catch (Exception ex)
            {
                if(ex.Message.Contains("Cannot insert duplicate key row in object"))
                {
                    return Content(HttpStatusCode.BadRequest, _exceptionResponseGenerator.GetCustomExceptionMessage(ex, "010", "Formulary name/version must be unique."));
                }
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }
    }
}