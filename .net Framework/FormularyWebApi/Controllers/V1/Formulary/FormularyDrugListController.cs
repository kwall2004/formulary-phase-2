using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Formulary
{
    public class FormularyDrugListController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repoFactory">Formulary repositry factory</param>
        /// <param name="refFactory">Reference repositry factory</param>
        /// <param name="formularyBll">Formulary BLL</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        public FormularyDrugListController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        [HttpGet]
        public IHttpActionResult GetDrugLists(long formularySK)
        {
            try
            {
                using (var repo = _repoFactory.Formulary())
                {
                    var drugLists = repo.GetDrugLists(formularySK).ToList();
                    var result = new QueryResult<spFormulary_GetDrugLists_Result>() { Rows = drugLists, Count = drugLists.Count };
                    return Ok(result);
                }

            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }

        }

        [HttpPost]
        public IHttpActionResult PutDrugLists(DrugListSaveVM drugList)
        {
            try
            {
                using (var repo = _repoFactory.Formulary())
                {
                    long sk = -1;
                    var result = repo.PutDrugLists(drugList.formularySK, drugList.drugListNames, drugList.userId);
                    var response = result.FirstOrDefault();

                    if (response != null)
                    {
                        if (response.ErrorNumber != 0)
                        { 
                            throw new Exception(response.ErrorMessage);
                        }
                        else
                        {
                            sk = response.ErrorSeverity.Value;
                        }
                    }
                    return Ok(sk);
                }

            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }

        }
    }
}
