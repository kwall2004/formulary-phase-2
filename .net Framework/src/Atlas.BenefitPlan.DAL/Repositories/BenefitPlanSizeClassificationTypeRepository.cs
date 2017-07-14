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
	/// the BenefitPlanSizeClassificationType Repository for Benefit Plan
	/// </summary>
	public class BenefitPlanSizeClassificationTypeRepository : EFRepositoryBase<BnftPlanSizeClsfcnType, BenefitPlanEntities>, IBenefitPlanSizeClassificationTypeRepository
	{
		/// <summary>
		/// the Constructor for BenefitPlanSizeClassificationType Repository
		/// </summary>
		/// <param name="db">the Benefit Plan Entity Framework</param>
		public BenefitPlanSizeClassificationTypeRepository(IConfig config, BenefitPlanEntities db) : base(config, db)
		{
		}
	}
}

