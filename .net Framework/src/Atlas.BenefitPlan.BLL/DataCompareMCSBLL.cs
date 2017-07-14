using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Atlas.Configuration;
using Atlas.BenefitPlan.DAL.Models.DataCompare;
using Atlas.BenefitPlan.DAL.Models.DataCompare.MCS;

namespace Atlas.BenefitPlan.BLL
{
    /// <summary>
    /// Class Data Compare MCS BLL for Benefit Plan.
    /// </summary>
    public class DataCompareMCSBLL : IDataCompareMCSBLL
    {
        /// <summary>
        /// the Benefit Plan Repository Factory
        /// </summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>
        /// the Benefit Plan Configuration
        /// </summary>
        private IBenefitPlanConfig _config;


        /// <summary>
        /// The Constructor for the Data Compare MCS BLL for Benefit Plan
        /// </summary>
        /// <param name="repoFactory">the Benefit Plan Repository Factory</param>
        public DataCompareMCSBLL(IBenefitPlanRepositoryFactory repoFactory, IBenefitPlanConfig config)
        {
            _repoFactory = repoFactory;
            _config = config;
        }

        ///// <summary>
        ///// 
        ///// </summary>
        ///// <returns></returns>
        //public List<CompareResults> ComparePlan(long? bnftPlanSK, string planPgmCode)
        //{

        //    AtlasBenefitPlanForMerlin fromAtlas = new AtlasBenefitPlanForMerlin().Load(fromAtlasXML.Root);
        //    AtlasBenefitPlanForMerlin fromMerlin = new AtlasBenefitPlanForMerlin().Load(fromMerlinXML.Root);

        //    List<CompareResults> results = fromAtlas.CompareEx(fromMerlin);
        //    return results;
        //}
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        //public List<CompareResults> CompareBenefit(long? bnftSK)
        //{

        //    Bnft bnftFromAtlas = new AtlasBenefitPlanForMerlin().Load(fromAtlasXML.Root);
        //    Bnft_MCS  bnftFromMerlin = new AtlasBenefitPlanForMerlin().Load(fromMerlinXML.Root);

        //    List<CompareResults> results = fromAtlas.CompareEx(fromMerlin);
        //    return results;
        //}

    }
}
