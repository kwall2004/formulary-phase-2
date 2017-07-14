using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using Atlas.Formulary.BLL.DrugCategory;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.Models.Containers;
using Atlas.Formulary.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.DrugSearch
{
    /// <summary>
    /// Drug Category Properties controller
    /// </summary>
    public class DrugCategoryController : ApiController
    {
        private IDrugCategoryBLL _bll;
        private IExceptionMessageGenerator _exceptionResponseGenerator;
        private IFormularyRepositoryFactory _FormularyRepoFactory;

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        /// <param name="FormularyRepoFactory">Formulary repository factory</param>
        public DrugCategoryController(IDrugCategoryBLL bll, IExceptionMessageGenerator exceptionResponseGenerator, IFormularyRepositoryFactory FormularyRepoFactory)
        {
            _exceptionResponseGenerator = exceptionResponseGenerator;
            _FormularyRepoFactory = FormularyRepoFactory;
            _bll = bll;
        }


        [HttpGet]
        public IHttpActionResult GetDrugCategories (long formularySK)
        {
            try
            {
                
                using (var drugCategoryRepository = _FormularyRepoFactory.DrugCategory())
                {
                    var result = _bll.GetDrugCategoriesByFormularySK(formularySK);
                    return Ok(result);   
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpPost]
        public IHttpActionResult SetDrugCategoryCriteria(DrugCatgCrtriaGrpSP drugCategoryCriteria)
        {
            try
            {
                long? result = null;
                 
                using (var drugCategoryRepository = _FormularyRepoFactory.DrugCategory())
                {
                    drugCategoryRepository.SetDrugCategoryCriteria(drugCategoryCriteria);
                    result = drugCategoryCriteria.DrugCatgSK_Upd;
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpDelete]
        public IHttpActionResult DeleteDrugCategory(long drugCategorySK)
        {
            try
            {
                using (var drugCategoryRepository = _FormularyRepoFactory.DrugCategory())
                {
                    drugCategoryRepository.DeleteDrugCategory(drugCategorySK);
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpGet]
        public IHttpActionResult GetPagedDrugCategory(long formularySK, bool IsNewRequest, int page, int pageSize)
        {
            try
            {
                using (var repo = _FormularyRepoFactory.DrugCategory())
                {
                    string userId = Request.Headers.GetValues("username").FirstOrDefault();
                    string sessionIdString = Request.Headers.GetValues("sessionid").FirstOrDefault();
                    var sessionId = Guid.Parse(sessionIdString);
                    if (sessionId == null || string.IsNullOrEmpty(userId))
                    {
                        throw new Exception("userId or sessionId missing from header!");
                    }

                    int startIndex = page == 1 ? 0 : (page - 1) * pageSize;
                    var pagedRequest = new PagedRequestVM() { Count = pageSize, FormularySK = formularySK, IsNewRequest = IsNewRequest, StartIndex = startIndex};
                    var data = repo.DrugCategoryPaged(pagedRequest, userId, sessionId);
                    int totalCount = 0;
                    if (data.Count > 0)
                    {
                        totalCount = data.First().TotalCount.Value;
                    }
                     

                    var viewModel = new List<DrugCategoryPagedVM>();
                    foreach (spDrugCatg_GetAllPaged_Result record in data)
                    {
                        viewModel.Add(new DrugCategoryPagedVM
                        {
                            cvrdInd = record.CvrdInd,
                            drugCategorySK = record.DrugCatgSK,
                            formularySK = record.FrmlrySK,
                            formularyTierName = record.FrmlryTierName,
                            formularyTierSK = record.FrmlryTierSK,
                            name = record.DrugCatgName,
                            NDCCount = record.NDCCount,
                            cacheStatusDesc = record.CacheStatusDesc,
                            cacheStatusSK = record.CacheStatusSK
                        });
                    }

                    var result = new QueryResult<DrugCategoryPagedVM>() { Rows = viewModel, Count = totalCount };
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
