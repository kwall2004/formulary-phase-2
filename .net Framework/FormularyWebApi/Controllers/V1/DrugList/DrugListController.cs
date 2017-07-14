using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;

// TODO: Refactor into multiple controllers.
namespace AtlasWebApi.Controllers.V1.DrugList
{
    public class DrugListController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repoFactory">Formulary repositry factory</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        public DrugListController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        [HttpPut]
        public IHttpActionResult PutDrugList(DrugListHeaderVM drugList)
        { 
            return SetDrugList(drugList);
        }

        [HttpPost]
        public IHttpActionResult PostDrugList(DrugListHeaderVM drugList)
        {
            drugList.DrugListSK = null;
            return SetDrugList(drugList);
        }

        public static string FirstCharToUpper(string input)
        {
            if (String.IsNullOrEmpty(input))
                throw new ArgumentException("Empty String!");
            return input.First().ToString().ToUpper() + String.Join("", input.Skip(1));
        }

        private IHttpActionResult SetDrugList(DrugListHeaderVM drugList)
        {
            try
            {
                using (var repo = _repoFactory.DrugList())
                {
                    //TODO refactor sort into a common helper function
                    drugList.DrugListName = FirstCharToUpper(drugList.DrugListName);
                    
                    var result = repo.SetDrugListHeader(drugList);
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("Cannot insert duplicate key row in object"))
                {
                    return Content(HttpStatusCode.BadRequest, _exceptionResponseGenerator.GetCustomExceptionMessage(ex, "020", "Drug list name must be unique."));
                }
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpGet]
        public IHttpActionResult GetDrugList(long drugListSK)
        {
            try
            {
                using (var repo = _repoFactory.DrugList())
                {
                    var result = repo.GetDrugListHeader(drugListSK);
                    var prettyResult = correctDb(result);
                    var prettyResultList = new List<DrugListHeaderGetVM>();
                    prettyResultList.Add(prettyResult);

                    var returnResult = new QueryResult<DrugListHeaderGetVM>() { Rows = prettyResultList, Count = prettyResultList.Count };
                    return Ok(returnResult);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        private DrugListHeaderGetVM correctDb (List<spDrugList_GetHeader_Result> result)
        {
            var newResult = new DrugListHeaderGetVM();
            newResult.DrugListSK = result.FirstOrDefault().DrugListSK;
            newResult.LOBSK = result.FirstOrDefault().LOBSK;
            newResult.LOBName = result.FirstOrDefault().LOBName;
            newResult.DrugRefDbSK = result.FirstOrDefault().DrugRefDBSK;
            newResult.DrugRefDbName = result.FirstOrDefault().DrugRefDbName;
            newResult.DrugListName = result.FirstOrDefault().DrugListName;
            newResult.DrugPostObsltAlwdDays = result.FirstOrDefault().DrugPostObsltAlwdDays;
            newResult.AutomaticallyAssignNewNDCsInd = result.FirstOrDefault().AutomaticallyAssignNewNDCsInd;
            newResult.EfctvStartDt = result.FirstOrDefault().EfctvStartDt;
            newResult.EfctvEndDt = result.FirstOrDefault().EfctvEndDt;
            return newResult;
        }
        /// <summary>
        /// Copies a drug list
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Route("api/DrugList/Copy")]
        public IHttpActionResult CopyDrugList(long drugListSK)
        {
            string userId = Request.Headers.GetValues("username").FirstOrDefault();

            try
            {
                using (var repo = _repoFactory.DrugList())
                {
                    var result = repo.CopyDrugList(drugListSK, userId);
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpDelete]
        public IHttpActionResult DeleteDrugList(long drugListSK)
        {
            try
            {
                using (var repo = _repoFactory.DrugList())
                {
                    var result = repo.DeleteDrugList(drugListSK);
                    return Ok("Successful");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpGet]
        public IHttpActionResult GetAllDrugLists(bool includeInactive = true)
        {
            try
            {
                using (var repo = _repoFactory.DrugList())
                {
                    var result = repo.GetAllDrugLists(includeInactive);
                    var returnResult = new QueryResult<spDrugList_GetAll_Result>() { Rows = result, Count = result.Count };
                    return Ok(returnResult);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }

        }

        [HttpGet]
        public IHttpActionResult DrugListFullTextSearch(string searchString)
        {
            try
            {
                using (var repo = _repoFactory.DrugList())
                {
                    var result = repo.DrugListFullTextSearch(searchString);
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
