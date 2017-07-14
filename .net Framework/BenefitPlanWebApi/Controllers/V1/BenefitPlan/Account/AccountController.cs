using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using BenefitPlanWebApi.Services;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace BenefitPlanWebApi.Controllers.V1.BenefitPlan.Account
{
    /// <summary>
    /// The Account Controller for Benefit Plan
    /// </summary>
    public class AccountController : ApiController
    {
        /// <summary>the Entity BLL</summary>
        private IEntityBLL _entityBLL;

        /// <summary>the Atlas Exception Message Generator</summary>
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// The Constructor for the Account Controller
        /// </summary>
        /// <param name="entityBLL">the Benefit Plan Entity BLL</param>
        /// <param name="exceptionResponseGenerator">the Exception Response Generator</param>
        public AccountController(IEntityBLL entityBLL, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _entityBLL = entityBLL;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        /// <summary>
        /// Get Method to Get Account Model by Account ID
        /// </summary>
        /// <param name="acctSK">the Account ID</param>
        /// <returns>the Account Model</returns>
        [HttpGet]
        public IHttpActionResult GetAccountModel(long acctSK = 0)
        {
            try
            {
                AccountVM account = _entityBLL.GetAccount(acctSK);
                var result = new QueryResult<AccountVM>() { Rows = new List<AccountVM>() { account }, Count = 1 };
                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Post Method to Set Account
        /// </summary>
        /// <param name="account">the Account View Model to Set</param>
        /// <returns>the Account Model</returns>
        [HttpPost]
        public IHttpActionResult AddAccountModel(AccountVM account)
        {
            account.AcctSK = 0;
            return SetAccountModel(account);
        }

        /// <summary>
        /// Put Method to Set Account
        /// </summary>
        /// <param name="account">the Account View Model to Set</param>
        /// <returns>the Account Model</returns>
        [HttpPut]
        public IHttpActionResult UpdateAccountModel(AccountVM account)
        {
            return SetAccountModel(account);
        }


        /// <summary>
        /// Get Method to Get Account Model by Account ID
        /// </summary>
        /// <param name="acctSK">the Account ID</param>
        /// <returns>the Account Model</returns>
        [HttpGet]
        public IHttpActionResult GetAccountsByTenantFamSK(long tenantFamSK)
        {
            try
            {
                List<Acct> accounts = _entityBLL.GetAccountsByTenantFamSK(tenantFamSK);
                var result = new QueryResult<Acct>() { Rows = accounts, Count = accounts.Count };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        #region " Private Methods "
        /// <summary>
        /// Method to Set Account
        /// </summary>
        /// <param name="account">the Account View Model to Set</param>
        /// <returns>the Account Model</returns>
        private IHttpActionResult SetAccountModel(AccountVM account)
        {
            try
            {
                account.CurrentUser = UtilityFunctions.GetCurrentUser(account.CurrentUser);
                if (ValidateAccount(account))
                {
                    AccountVM result = _entityBLL.SetAccount(account);
                    return Ok(JSONFunctions.AddUpdateSuccessReponse(new List<long>() { result.AcctSK }));
                }
                else
                {
                    return Ok(JSONFunctions.AddUpdateErrorReponse(ModelState));
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        /// <summary>
        /// Validate Account 
        /// </summary>
        /// <param name="account">the Account View Model to Validate</param>
        private bool ValidateAccount(AccountVM account)
        {
            if (ModelState.IsValid)
            {
                foreach (Message item in _entityBLL.ValidateAccount(account))
                {
                    ModelState.AddModelError(item.Fieldname, item.MessageText);
                }
            }

            return ModelState.IsValid;
        }
        #endregion
    }
}