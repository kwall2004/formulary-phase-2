using Atlas.BenefitPlan.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

using Atlas.BenefitPlan.DAL.Models;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.BenefitPlan
{
    public class ProductTypesController : ApiController
    {

        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Controller for all the dropdowns that are connected to benefit plan only
        /// </summary>
        /// <param name="repoFactory">the repository factory inject</param>
        /// <param name="exceptionResponseGenerator">the exception response </param>
        public ProductTypesController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }


        #region Product Types
        /// <summary>
        /// Get all the Product Types and return them in a list
        /// </summary>
        /// <returns>List of Product Types</returns>
        [HttpGet]
        public IHttpActionResult ProductTypes()
        {
            try
            {
                List<PrdctType> productTypes = GetAllProductTypes();
                var result = new QueryResult<PrdctType>() { Rows = productTypes, Count = productTypes.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get all the Product Types and return them in a list
        /// </summary>
        /// <returns>List of Product Types</returns>
        [HttpGet]
        public IHttpActionResult ProductTypesByLOBSK(long lOBSK)
        {
            try
            {
                using (var repo = _repoFactory.ProductType())
                {
                    List<PrdctType> prdctTypes = repo.FindAll(c => c.LOBSK == lOBSK).ToList();
                    var result = new QueryResult<PrdctType>() { Rows = prdctTypes, Count = prdctTypes.Count };
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get all the Product Types and return them in a list
        /// </summary>
        /// <returns>List of Product Types</returns>
        [HttpGet]
        public IHttpActionResult ProductTypes(long prdctTypeSK)
        {
            try
            {
                using (var repo = _repoFactory.ProductType())
                {
                    PrdctType prdctType = repo.FindOne(c => c.PrdctTypeSK == prdctTypeSK);
                    var result = new QueryResult<PrdctType>() { Rows = new List<PrdctType>() { prdctType }, Count = 1 };
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get All the ProductTypes from the drepository
        /// </summary>
        /// <returns>List of ProductTypes</returns>
        private List<PrdctType> GetAllProductTypes()
        {
            using (var repo = _repoFactory.ProductType())
            {
                List<PrdctType> prdctTypes = repo.FindAll().ToList();
                return prdctTypes;
            }
        }
        #endregion

    }
}
