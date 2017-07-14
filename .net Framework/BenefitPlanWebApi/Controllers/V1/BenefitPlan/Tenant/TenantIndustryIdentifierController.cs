using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Models.Enums;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.Tenant
{
    /// <summary>
    /// The Tenant Industry Identifier Controller for Benefit Plan
    /// </summary>
    public class TenantIndustryIdentifierController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Tenant Industry Identifier Controller
        /// </summary>
        /// <param name="repoFactory">the Benefit Plan Repository Factory</param>
        /// <param name="exceptionResponseGenerator">the Exception Response Generator</param>
        public TenantIndustryIdentifierController(IBenefitPlanRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method to Get Tenant Industry Identifier Model by Tenant ID and Type
        /// </summary>
        /// <param name="type">the TenantIndustryIdentifier Type</param>
        /// <param name="tenantSK"></param>
        /// <returns>the Tenant TenantIndustryIdentifier View Model</returns>
        [HttpGet]
        public IHttpActionResult GetTenantIndustryIdentifiers(TenantIndustryIdentifier type, long tenantSK)
        {
            try
            {
                List<TenantIndustryIdentifierVM> tenantIndustryIdentifierList = GetTenantIndustryIdentifierDDL(type, tenantSK);
                var result = new QueryResult<TenantIndustryIdentifierVM>() { Rows = tenantIndustryIdentifierList, Count = tenantIndustryIdentifierList.Count() };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get Method to Get Tenant Industry Identifier Model by Tenant ID
        /// </summary>
        /// <param name="tenantSK"></param>
        /// <returns>the Tenant TenantIndustryIdentifier View Model</returns>
        [HttpGet]
        public IHttpActionResult GetTenantIndustryIdentifiers(long tenantSK)
        {
            try
            {

                using (var spRepository = _repoFactory.AtlasBenefitPlanStoredProcs())
                {
                    List<TenantIndustryIdentifierVM> tenantIndustryIdentifierList = spRepository.GetTenantIndustryIdentifier(tenantSK)
                    .Select(s => new TenantIndustryIdentifierVM()
                    {
                        IndustryIdentifier = (TenantIndustryIdentifier)System.Enum.Parse(typeof(TenantIndustryIdentifier), s.TenantIndustryIdentifier),
                        TenantTypeKey = s.TenantTypeKey,
                        ValueID = s.ValueID,
                        Type = s.Type,
                        Value = s.Value,
                        Description = s.Description,
                        EfctvStartDt = s.EfctvStartDt,
                        EfctvEndDt = s.EfctvEndDt,
                        Deleted = false
                    }
                ).ToList();

                    var result = new QueryResult<TenantIndustryIdentifierVM>() { Rows = tenantIndustryIdentifierList, Count = tenantIndustryIdentifierList.Count() };
                    return Ok(result);

                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }


        #region " Private Methods "
        /// <summary>
        /// Gets all of the Tenant PCN for a Tenant ID
        /// </summary>
        /// <param name="tenantSK">the TenantID</param>
        /// <returns>an IQuerable of all the Tenant PCNs</returns>
        private IQueryable<TenantPCN> GetTenantIndustryIdentifierPCN(long tenantSK)
        {
            return _repoFactory.TenantPCN().FindAll(w => w.TenantSK == tenantSK);
        }

        /// Gets all of the Tenant RXBIN for a Tenant ID
        /// </summary>
        /// <param name="tenantSK">the TenantID</param>
        /// <returns>an IQuerable of all the Tenant RXBINS</returns>
        private IQueryable<TenantRXBIN> GetTenantIndustryIdentifierRXBIN(long tenantSK)
        {
            return _repoFactory.TenantRXBIN().FindAll(w => w.TenantSK == tenantSK);
        }

        /// Gets all of the Tenant PayerID for a Tenant ID
        /// </summary>
        /// <param name="tenantSK">the TenantID</param>
        /// <returns>an IQuerable of all the Tenant PayerIDs</returns>
        private IQueryable<TenantPayerID> GetTenantIndustryIdentifierPayerID(long tenantSK)
        {
            return _repoFactory.TenantPayerId().FindAll(w => w.TenantSK == tenantSK);
        }

        /// <summary>
        /// Get the Tenant Industry Identifiers by TenantID
        /// </summary>
        /// <returns>List of Drop List Items</returns>
        private List<TenantIndustryIdentifierVM> GetTenantIndustryIdentifierDDL(TenantIndustryIdentifier type, long tenantSK)
        {
            switch (type)
            {
                case TenantIndustryIdentifier.PCN:
                    return GetTenantIndustryIdentifierPCN(tenantSK).Select(p => new TenantIndustryIdentifierVM
                    {
                        IndustryIdentifier = TenantIndustryIdentifier.PCN,
                        TenantTypeKey = p.TenantPCNSK,
                        Type = "PCN",
                        ValueID = p.PCN.PCNSK,
                        Value = p.PCN.PCN1,
                        Description = p.PCN.PCNDesc,
                        EfctvStartDt = p.EfctvStartDt,
                        EfctvEndDt = p.EfctvEndDt,
                        Deleted = false }).ToList();
                case TenantIndustryIdentifier.BIN:
                    return GetTenantIndustryIdentifierRXBIN(tenantSK).Select(p => new TenantIndustryIdentifierVM
                    {
                        IndustryIdentifier = TenantIndustryIdentifier.BIN,
                        TenantTypeKey = p.TenantRXBINSK,
                        Type = "BIN",
                        ValueID = p.RXBIN.RXBINSK,
                        Value = p.RXBIN.RXBIN1,
                        Description = p.RXBIN.RXBINDesc,
                        EfctvStartDt = p.EfctvStartDt,
                        EfctvEndDt = p.EfctvEndDt,
                        Deleted = false
                    }).ToList();
                case TenantIndustryIdentifier.PayerID:
                    return GetTenantIndustryIdentifierPayerID(tenantSK).Select(p => new TenantIndustryIdentifierVM
                    {
                        IndustryIdentifier = TenantIndustryIdentifier.PCN,
                        TenantTypeKey = p.TenantPayerIDSK,
                        Type = "Payer ID",
                        ValueID = p.PayerID.PayerIDSK,
                        Value = p.PayerID.PayerID1,
                        Description = p.PayerID.PayerIDDesc,
                        EfctvStartDt = p.EfctvStartDt,
                        EfctvEndDt = p.EfctvEndDt,
                        Deleted = false
                    }).ToList();
                default:
                    return new List<TenantIndustryIdentifierVM>();
            }
        }
        #endregion
    }
}