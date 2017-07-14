using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Atlas.Configuration;
using Atlas.Formulary.DAL.Models;
using Atlas.Reference.DAL;
using Atlas.Reference.DAL.Models;
using System.Linq;
using System.Collections.Generic;
using Atlas.Reference.DAL.Repositories;
using Atlas.Reference.DAL.Repositories.Interfaces;
using System.Diagnostics;
using Atlas.Formulary.DAL.Repositories.Interfaces;

namespace Atlas.Formulary.DAL.Test.NewDrugsToMarket
{
    [TestClass]
    public class NewDrugsToMarketDALTest
    {
        private IConfig _config;
        private FormularyEntities _formularyEntities;
        private IFormularyRepositoryFactory _repoFactory;
        private IReferenceRepositoryFactory _refFactory;
        private ReferenceEntities _refEntities;

        private IFDBDrugListRepository fdbRepo;
        private INewDrugsToMarketRepository newDrugsRepo;
        private FDBDrugList newDrug, newDrug2;

        /// <summary>
        /// Sets up.
        /// </summary>
        [TestInitialize]
        public void SetUp()
        {
            _config = new FormularyDevConfig();
            _formularyEntities = new FormularyEntities();
            _repoFactory = new FormularyRepositoryFactory(_config, _formularyEntities);
            
            _refEntities = new ReferenceEntities(_config);
            _refFactory = new ReferenceRepositoryFactory(_refEntities);
        }

        [TestMethod]
        public void ShouldHaveCorrectGetAllNewDrugsToMarketResponse()
        {
            using (fdbRepo = _refFactory.FDBDrugList())
            {
                //ARRANGE
                CleanData();
                InitializeTestData();

                //ACT
                List<spNewDrugsToMarket_Get_Result> newDrugsToMarket;
                using (newDrugsRepo = _repoFactory.NewDrugsToMarket())
                {
                    newDrugsToMarket = newDrugsRepo.GetAllNewDrugsToMarket(null, null, null, 1).ToList();
                }
                var finalDrugResult = newDrugsToMarket.FirstOrDefault(a => a.NDC == newDrug.NDC);
                var finalDrugResult2 = newDrugsToMarket.FirstOrDefault(a => a.NDC == newDrug2.NDC);

                //ASSERT
                Assert.IsNotNull(newDrugsToMarket);
                Assert.IsNotNull(finalDrugResult);
                Assert.IsNotNull(finalDrugResult2);
                Assert.AreEqual(finalDrugResult.LabelName, newDrug.LabelName);
                Assert.AreEqual(finalDrugResult2.LabelName, newDrug2.LabelName);

                //CLEANUP
                CleanData(); 
            }
        }

        private void InitializeTestData()
        {
            //Creating a new drug
            var ndcCheck = fdbRepo.FindOne(a => a.NDC == newDrug.NDC);
            var ndcCheck2 = fdbRepo.FindOne(a => a.NDC == newDrug2.NDC);

            if (ndcCheck == null && ndcCheck2 == null)
            {
                fdbRepo.AddOrUpdate(newDrug);
                fdbRepo.AddOrUpdate(newDrug2);
                fdbRepo.SaveChanges();

                ndcCheck = fdbRepo.FindOne(a => a.NDC == newDrug.NDC);
                ndcCheck2 = fdbRepo.FindOne(a => a.NDC == newDrug2.NDC);

                //confirm our drug got added
                if(ndcCheck == null || ndcCheck.LabelName != newDrug.LabelName)
                {
                    throw new Exception("Data could not be added to the database.");
                }
                if(ndcCheck2 == null || ndcCheck2.LabelName != newDrug2.LabelName)
                {
                    throw new Exception("Data could not be added to the database.");
                }
            }
            else
            {
                throw new Exception("Data could not be added to the database.");
            } 
        }
        private void CleanData()
        {
            newDrug = new FDBDrugList { DrugListSK = 0, NDC = "12332112312", NDCTypeSK = 1, DateToMarket = DateTime.Today, IsNewDrug = true, LabelName = "NewDrug", ETC_ID = 1, EffectiveDate = DateTime.Today };
            newDrug2 = new FDBDrugList { DrugListSK = 0, NDC = "12344321123", NDCTypeSK = 1, DateToMarket = DateTime.Today, IsNewDrug = true, LabelName = "OtherNewDrug", ETC_ID = 1, EffectiveDate = DateTime.Today };

            var drug1 = fdbRepo.FindOne(a => a.NDC == newDrug.NDC);
            var drug2 = fdbRepo.FindOne(a => a.NDC == newDrug2.NDC);

            //confirm we aren't deleting the wrong drug
            if(drug1 != null && drug1.LabelName == newDrug.LabelName)
            {
                _refEntities.FDBDrugList.Remove(drug1);
                _refEntities.SaveChanges();
            }
            if (drug2 != null && drug2.LabelName == newDrug2.LabelName)
            {
                _refEntities.FDBDrugList.Remove(drug2);
                _refEntities.SaveChanges();
            }            
        }
    }
}
