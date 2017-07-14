using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Linq;
using Atlas.Formulary.DAL;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Formulary.BLL.Formulary;
using Atlas.Reference.DAL.Models;
using Atlas.Reference.DAL;
//using Atlas.Formulary.DAL.ViewModels;
//using Atlas.Formulary.DAL.ViewModels;
using Atlas.Reference.DAL.ViewModels;
using Atlas.Formulary.BLL.CustomNDC;
using Atlas.Core.WebApi.Services;
using System.Net;

namespace AtlasWebApi.Controllers.V1.DrugDetail
{

    /// <summary>
    /// CustomNdc WebApi controller
    /// </summary>
    public class CustomNdcController : ApiController
    {
        
        private IReferenceRepositoryFactory _refFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;
        private IFormularyRepositoryFactory _formularyFactory;
        private ICustomNDCBLL _customNDCBLL;


        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="refFactory">Reference repositry factory</param>
        /// <param name="formularyBll">Formulary BLL</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        public CustomNdcController(IReferenceRepositoryFactory refFactory, IExceptionMessageGenerator exceptionResponseGenerator, IFormularyRepositoryFactory formularyFactory, ICustomNDCBLL customNDCBLL)
        {      
            _refFactory = refFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
            _formularyFactory = formularyFactory;
            _customNDCBLL = customNDCBLL;
        }


        /// <summary>
        /// Get all Custom NDCs.
        /// </summary>
        /// <param name=""></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetAllCustomNdc()
        {

            try
            {

                using (var fdbRepo = _refFactory.FDBDrugList())
                {

                    List<FDBDrugList> customNDCs = fdbRepo.FindAll(fdb => fdb.NDCTypeSK == 3 && fdb.DeletedDate == null).ToList();
                    var result = new QueryResult<FDBDrugList>()
                    {
                        Rows = customNDCs,
                        Count = customNDCs.Count

                    };
                    return Ok(result);

                }//using

            }//try
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }

        }//Public



        /// <summary>
        /// Gets Custom NDC if DrugListSK exists.
        /// </summary>
        /// <param name="DrugListSK"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetCustomNdc(int? DrugListSK)
        {
          
            if (DrugListSK == null)
            {
                throw new ArgumentException("This service requires a DrugListSK as an input parameter!");
            }

            try
            {

                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    
                        var result = fdbRepo.FindOne(fdb => fdb.DrugListSK == DrugListSK && fdb.DeletedDate == null);
                        
                        if (result == null)
                        {
                            return NotFound();
                           
                        }

                    return Ok(result);     

                }//using
              
            }//try
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
           
        }//Public

        private static string FirstCharToUpper(string input)
        {
            if (String.IsNullOrEmpty(input))
                throw new ArgumentException("Empty String!");
            return input.First().ToString().ToUpper() + String.Join("", input.Skip(1));
        }

        private bool IsDigitsOnly(string str)
        {
            foreach (char c in str)
            {
                if (c < '0' || c > '9')
                    return false;
            }

            return true;
        }


        /// <summary>
        /// Adds new CustomNDC if CustomNDC number is unique
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult AddCustomNdc(CustomNdc request)
        {
            try
            {
                if(request.NDC.Length != 11)
                {
                    throw new Exception("NDC must be 11 digits long.");
                }
                if(!IsDigitsOnly(request.NDC))
                {
                    throw new Exception("NDC must be numeric.");
                }

                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    request.LabelName = FirstCharToUpper(request.LabelName);
                    var FDB = fdbRepo.FindOne(fdb => fdb.NDC == request.NDC);                                                                                                     

                    if (FDB == null)
                    {
                        var newFDBDrugListRow = new FDBDrugList
                        {

                            NDC = request.NDC,
                            LabelName = request.LabelName,
                            NDCTypeSK = 3,
                            UnitPrice = request.UnitPrice,
                            DateToMarket = request.DateToMarket,
                            EffectiveDate = DateTime.Now
                        };

                        fdbRepo.AddOrUpdate(newFDBDrugListRow);
                        fdbRepo.SaveChanges();
                        var result = newFDBDrugListRow.DrugListSK;
                        return Ok(result);   
                                   
                    }
                    else
                    {
                        throw new Exception("NDC already exists within FDB source!");
                    }   
                     
                }  
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("NDC must be 11 digits long."))
                {
                    return Content(HttpStatusCode.BadRequest, _exceptionResponseGenerator.GetCustomExceptionMessage(ex, "030", "NDC must be 11 digits."));
                }
                if(ex.Message.Contains("NDC must be numeric."))
                {
                    return Content(HttpStatusCode.BadRequest, _exceptionResponseGenerator.GetCustomExceptionMessage(ex, "032", "NDC must be numeric value."));
                }
                if (ex.Message.Contains("NDC already exists"))
                {
                    return Content(HttpStatusCode.BadRequest, _exceptionResponseGenerator.GetCustomExceptionMessage(ex, "031", "NDC must be unique."));
                }
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }


        /// <summary>
        /// Updates Custom NDC for an existing, non-unique CustomNDC number
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPut]
        public IHttpActionResult UpdateCustomNdc(CustomNdc request)
        {
            try
            {
                if (request.NDC.Length != 11)
                {
                    throw new Exception("NDC must be 11 digits long.");
                }
                if (!IsDigitsOnly(request.NDC))
                {
                    throw new Exception("NDC must be numeric.");
                }

                using (var repo = _formularyFactory.CustomNDC())
                {
                    var result = new QueryResult<CustomNdc>();
                    result.Count = 1;
                    result.Rows.Add(request);

                    request.LabelName = FirstCharToUpper(request.LabelName);
                    repo.PutCustomNDC(request);
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                if(ex.Message.Contains("NDC must be 11 digits long."))
                {
                    return Content(HttpStatusCode.BadRequest, _exceptionResponseGenerator.GetCustomExceptionMessage(ex, "030", "NDC must be 11 digits."));
                }
                if (ex.Message.Contains("NDC must be numeric."))
                {
                    return Content(HttpStatusCode.BadRequest, _exceptionResponseGenerator.GetCustomExceptionMessage(ex, "032", "NDC must be numeric value."));
                }
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }

        }

        [HttpGet]
        public IHttpActionResult GetFormulariesByNDC(string NDC)
        {
            try
            {

                var result = _customNDCBLL.GetFormulariesForNDC(NDC);
                 return Ok(result);
                
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpDelete]
        public IHttpActionResult DeleteCustomNDC(string NDC)
        {
            try
            {
                using (var repo = _formularyFactory.CustomNDC())
                {
                    repo.DeleteCustomNDC(NDC);
                    return Ok("Successful deletion.");}
                }
            catch (Exception ex)
            {
                if (ex.Message.Contains("NDC exists on formularies"))
                {
                    return Content(HttpStatusCode.BadRequest, _exceptionResponseGenerator.GetCustomExceptionMessage(ex, null, "This NDC is associated with existing formularies."));
                }
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }


    }


}
