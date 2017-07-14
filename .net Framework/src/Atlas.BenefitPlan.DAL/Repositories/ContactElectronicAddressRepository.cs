using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Repositories.Interfaces; 
using Atlas.Configuration;
using Atlas.Core.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks; 

namespace Atlas.BenefitPlan.DAL.Repositories
{
	/// <summary>
	/// the ContactElectronicAddress Repository for Benefit Plan
	/// </summary>
	public class ContactElectronicAddressRepository : EFRepositoryBase<CntctElctrncAddr, BenefitPlanEntities>, IContactElectronicAddressRepository
	{
		/// <summary>
		/// the Constructor for ContactElectronicAddress Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public ContactElectronicAddressRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}

        /// <summary>
        ///  Override AddOrUpdate
        /// </summary>
        /// <param name="itemToUpdate"></param>
        public override void AddOrUpdate(CntctElctrncAddr itemToUpdate)
        {
            _db.CntctElctrncAddr.Attach(itemToUpdate);
            _db.Entry(itemToUpdate).State = itemToUpdate.CntctElctrncAddrSK == 0 ? EntityState.Added : EntityState.Modified;
        }
    }
}

