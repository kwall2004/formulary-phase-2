using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using Atlas.Reference.DAL;
using Atlas.Reference.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.DrugDetail
{
    /// <summary>
    /// CRUD services for Missing NDC. 
    /// </summary>
    public class MissingNdcFdbController : ApiController
    {
        private IReferenceRepositoryFactory _refFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;
        private IFormularyRepositoryFactory _formularyFactory;


        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="refFactory">Reference repositry factory</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        public MissingNdcFdbController(IReferenceRepositoryFactory refFactory, IExceptionMessageGenerator exceptionResponseGenerator, IFormularyRepositoryFactory formularyFactory)
        {
            _refFactory = refFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
            _formularyFactory = formularyFactory;
        }


        /// <summary>
        /// Gets all created missing NDC's.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetMissingNDCs()
        {
            try
            {
                using (var repo = _refFactory.MedispanDrugList())
                {
                    using (var ndcTypeRepo = _refFactory.NDCType())
                    {
                        var results = new List<MedispanDrugList>();
                        var ndcType = ndcTypeRepo.GetNdcType("FDB"); 
                        var matches = repo.FindAll(d => d.NDCTypeSK == ndcType.NDCTypeSK);

                        if (matches.Count() > 0)
                        {
                            results = matches.ToList();
                        }

                        var returnedResults = new QueryResult<MedispanDrugList> { Rows = results, Count = results.Count() };

                        return Ok(returnedResults); 
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }

        }

        /// <summary>
        /// Creates a new missing NDC. 
        /// </summary>
        /// <param name="missingNDC"></param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult CreateMissingNDC(MedispanDrugList missingNDC)
        {
            try
            {
                return AddOrUpdatedMissingNDC(missingNDC);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Updates an existing missing NDC. 
        /// </summary>
        /// <param name="missingNDC"></param>
        /// <returns></returns>
        [HttpPut]
        public IHttpActionResult UpdateMissingNDC(MedispanDrugList missingNDC)
        {
            try
            {
                return AddOrUpdatedMissingNDC(missingNDC);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Removes an existing custom NDC. 
        /// </summary>
        /// <param name="NDC"></param>
        /// <returns></returns>
        [HttpDelete]
        public IHttpActionResult DeleteMissingNDCs(string NDC)
        {
            try
            {
                using (var repo = _formularyFactory.CustomNDC())
                {
                    repo.DeleteMissingNDC(NDC, "Medispan");
                    return Ok("Successful deletion.");
                }
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("NDC exists on formularies"))
                {
                    return Content(System.Net.HttpStatusCode.BadRequest, _exceptionResponseGenerator.GetCustomExceptionMessage(ex, null, "This NDC is associated with existing formularies."));
                }
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Helper method for camel casing a label name.
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        private static string CamelCaseLabelName(string input) // TODO: Find a better home for this. 
        {
            if (String.IsNullOrEmpty(input))
                throw new ArgumentException("Empty String!");
            return input.First().ToString().ToUpper() + String.Join("", input.Skip(1));
        }

        private IHttpActionResult AddOrUpdatedMissingNDC(MedispanDrugList missingNDC)
        {
            using (var repo = _refFactory.MedispanDrugList())
            {
                using (var ndcTypeRepo = _refFactory.NDCType())
                {
                    var ndcType = ndcTypeRepo.GetNdcType("FDB");
                    missingNDC.LabelName = CamelCaseLabelName(missingNDC.LabelName);
                    missingNDC.EffectiveDate = DateTime.Today;
                    missingNDC.DateToMarket = DateTime.Today;
                    missingNDC.NDCTypeSK = ndcType.NDCTypeSK;
                    repo.AddOrUpdate(missingNDC);
                    repo.SaveChanges();

                    return Ok(missingNDC.NDC); 
                }
            }
        }
    }
}
