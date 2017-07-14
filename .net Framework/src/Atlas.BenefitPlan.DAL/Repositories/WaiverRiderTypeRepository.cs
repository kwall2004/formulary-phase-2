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
	/// the WaiverRiderType Repository for Benefit Plan
	/// </summary>
	public class WaiverRiderTypeRepository : EFRepositoryBase<WvrRiderType, BenefitPlanEntities>, IWaiverRiderTypeRepository
	{
		/// <summary>
		/// the Constructor for WaiverRiderType Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public WaiverRiderTypeRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}
	}
}

