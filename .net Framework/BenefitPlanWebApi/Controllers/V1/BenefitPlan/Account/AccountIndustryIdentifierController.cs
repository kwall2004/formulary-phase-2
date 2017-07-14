using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models.Enums;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.Account
{
    /// <summary>
    /// The Account Industry Identifier Controller for Benefit Plan
    /// </summary>
    public class AccountIndustryIdentifierController : ApiController
    {
        /// <summary>the Benefit Plan Repository Factory</summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>the Entity BLL</summary>
        private IEntityBLL _entityBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Account Industry Identifier Controller
        /// </summary>
        /// <param name="repoFactory">the Benefit Plan Repository Factory</param>
        /// <param name="entityBLL">the Benefit Plan Entity BLL</param>
        /// <param name="exceptionResponseGenerator">the Exception Response Generator</param>
        public AccountIndustryIdentifierController(IBenefitPlanRepositoryFactory repoFactory, IEntityBLL entityBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _entityBLL = entityBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method to Get Account Industry Identifier Model by Account ID
        /// </summary>
        /// <param name="acctSK"></param>
        /// <returns>the AccountIndustryIdentifier View Model</returns>
        [HttpGet]
        public IHttpActionResult GetAccountIndustryIdentifiers(long acctSK)
        {
            try
            {
                using (var spRepository = _repoFactory.AtlasBenefitPlanStoredProcs())
                {
                    List<AccountIndustryIdentifierVM> accountIndustryIdentifierList = spRepository.GetAccountTenantIndustryIdentifier(acctSK)
                        .Select(s => new AccountIndustryIdentifierVM()
                        {
                            IndustryIdentifier = (TenantIndustryIdentifier)System.Enum.Parse(typeof(TenantIndustryIdentifier), s.TenantIndustryIdentifier),
                            TenantTypeKey = s.TenantTypeKey,
                            AcctTypeKey = s.AcctTypeKey,
                            ValueID = s.ValueID,
                            Type = s.Type,
                            Value = s.Value,
                            Deleted = false
                        }
                        ).ToList();

                    var result = new QueryResult<AccountIndustryIdentifierVM>() { Rows = accountIndustryIdentifierList, Count = accountIndustryIdentifierList.Count() };
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Get Method to Get Account Industry Identifier Model by Account ID and Type
        /// </summary>
        /// <param name="type">the TenantIndustryIdentifier Type</param>
        /// <param name="acctSK">the Account Key</param>
        /// <returns>the Account AccountIndustryIdentifier View Model</returns>
        [HttpGet]
        public IHttpActionResult GetAccountIndustryIdentifiers(TenantIndustryIdentifier type, long acctSK)
        {
            try
            {
                List<AccountIndustryIdentifierVM> accountIndustryIdentifierList = GetAccountIndustryIdentifierDDL(type, acctSK);
                var result = new QueryResult<AccountIndustryIdentifierVM>() { Rows = accountIndustryIdentifierList, Count = accountIndustryIdentifierList.Count() };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        #region " Private Methods "
        /// <summary>
        /// Get the Account Industry Identifiers by Account ID
        /// </summary>
        /// <param name="type">the TenantIndustryIdentifier Type</param>
        /// <param name="acctSK">the Account Key</param>
        /// <returns></returns>
        private List<AccountIndustryIdentifierVM> GetAccountIndustryIdentifierDDL(TenantIndustryIdentifier type, long acctSK)
        {
            switch (type)
            {
                case TenantIndustryIdentifier.PCN:
                    return _entityBLL.GetAccountIndustryIdentifierPCN(acctSK).Select(p => new AccountIndustryIdentifierVM
                    {
                        IndustryIdentifier = TenantIndustryIdentifier.PCN,
                        TenantTypeKey = p.TenantPCNSK,
                        AcctTypeKey = p.AcctPCNSK,
                        Type = "PCN",
                        ValueID = p.TenantPCN.PCN.PCNSK,
                        Value = p.TenantPCN.PCN.PCN1,
                        Deleted = false
                    }).ToList();
                case TenantIndustryIdentifier.BIN:
                    return _entityBLL.GetAccountIndustryIdentifierRXBIN(acctSK).Select(p => new AccountIndustryIdentifierVM
                    {
                        IndustryIdentifier = TenantIndustryIdentifier.BIN,
                        TenantTypeKey = p.TenantRXBINSK,
                        AcctTypeKey = p.AcctRXBINSK,
                        Type = "BIN",
                        ValueID = p.TenantRXBIN.RXBIN.RXBINSK,
                        Value = p.TenantRXBIN.RXBIN.RXBIN1,
                        Deleted = false
                    }).ToList();
                case TenantIndustryIdentifier.PayerID:
                    return _entityBLL.GetAccountIndustryIdentifierPayerID(acctSK).Select(p => new AccountIndustryIdentifierVM
                    {
                        IndustryIdentifier = TenantIndustryIdentifier.PCN,
                        TenantTypeKey = p.TenantPayerIDSK,
                        AcctTypeKey = p.AcctPayerIDSK,
                        Type = "Payer ID",
                        ValueID = p.TenantPayerID.PayerID.PayerIDSK,
                        Value = p.TenantPayerID.PayerID.PayerID1,
                        Deleted = false
                    }).ToList();
                default:
                    return new List<AccountIndustryIdentifierVM>();
            }
        }
        #endregion
    }
}