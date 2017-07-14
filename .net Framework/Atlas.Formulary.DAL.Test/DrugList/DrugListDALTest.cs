using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

using System.Collections.Generic;
using System.Linq;
using Atlas.Formulary.DAL.Repositories.Interfaces;
using Atlas.Configuration;
using Atlas.Formulary.DAL.Models;
using Atlas.Reference.DAL;
using Atlas.Reference.DAL.Models;
using Atlas.Formulary.DAL.ViewModels;
using Atlas.Formulary.DAL.Models.Containers;
using System.Runtime.InteropServices;


namespace Atlas.Formulary.DAL.Test.DrugList
{
    [TestClass()]
    public class DrugListDALTest
    {


        private IConfig _config;
        private FormularyEntities _formularyEntities;
        private IFormularyRepositoryFactory _formFactory;
    
        private IReferenceRepositoryFactory _refFactory;
        private ReferenceEntities _refEntities;

        private IDrugListRepository drugListRepo;
        private DrugListHeaderVM drugList;

       
        /// <summary>
        /// Sets up.
        /// </summary>      
        [TestInitialize]
        public void SetUp()
        {
            _config = new FormularyDevConfig();
            _formularyEntities = new FormularyEntities();
            _formFactory = new FormularyRepositoryFactory(_config, _formularyEntities);

            _refEntities = new ReferenceEntities(_config);
            _refFactory = new ReferenceRepositoryFactory(_refEntities);
            
        }

        [Guid("8572fd27-d884-4994-2614-f0b778285eab")]
        private interface IMyInterface
        {
            void MyMethod();
        }

        /// <summary>
        /// TODO : FR3521 Phase 2 GUID not being passed to DB for some reason
        /// </summary>
        [TestMethod()]   
        public void ShouldSetDrugListHeaderWhenMedispanDataSource() 
        {
            
            using (drugListRepo = _formFactory.DrugList())
            {
                //ARRANGE
                long drugListSK = 30545;
                bool isNewRequest = true;
                int startIndex = 0;
                int count = 25;
                string userId = "jsmith";
                
                GuidAttribute IMyInterfaceAttribute = (GuidAttribute)Attribute.GetCustomAttribute(typeof(IMyInterface), typeof(GuidAttribute));

                spDrugListDtl_GetAllPaged_Result r1 = new spDrugListDtl_GetAllPaged_Result()
                {
                    DrugListDtlName="30545-GenericName/0-1",
                    DrugListDtlSK=30330,
                    DrugListSK= 30545,
                    NDCCount = 1
                    
                };

                spDrugListDtl_GetAllPaged_Result r2 = new spDrugListDtl_GetAllPaged_Result()
                {
                    DrugListDtlName = "30545-GenericName/0-1",
                    DrugListDtlSK = 30331,
                    DrugListSK = 30546,
                    NDCCount = 2

                };

                List<spDrugListDtl_GetAllPaged_Result> list = new List<spDrugListDtl_GetAllPaged_Result>();
                list.Add(r1);
                list.Add(r2);

                //ACT
                var result = drugListRepo.GetDrugListsDetailPaged(drugListSK, isNewRequest, startIndex, count, userId, new Guid(IMyInterfaceAttribute.Value));
                         
                //ASSERT                                          
                //Assert.AreEqual(result.FirstOrDefault().DrugListDtlName, list.LastOrDefault().DrugListDtlName);
                //Assert.AreEqual(result.FirstOrDefault().DrugListDtlSK, list.LastOrDefault().DrugListDtlSK);
                //Assert.AreEqual(result.FirstOrDefault().DrugListSK, list.LastOrDefault().DrugListSK);
                //Assert.AreEqual(result.FirstOrDefault().NDCCount, list.LastOrDefault().NDCCount);
               
            }
        }


        [TestMethod()]       
        public void ShouldSetDrugListHeader()
        {
            using (drugListRepo = _formFactory.DrugList())
            {
                //ARRANGE
                var currDrugList = new DrugListHeaderVM { AutomaticallyAssignNewNDCsInd = true, DrugListName = "My Integration DrugList Test", DrugListSK = null, DrugPostObsltAlwdDays = 365, DrugRefDBSK = 1, EfctvStartDt = DateTime.Today, EfctvEndDt = DateTime.Parse("12/30/2017"), LOBSK = 1, SessionId = Guid.NewGuid(), UserId = "TheBatman" };

                //ACT
                var drugListSK = drugListRepo.SetDrugListHeader(currDrugList);
                var result = drugListRepo.GetDrugListHeader(drugListSK).FirstOrDefault();

                //ASSERT                  
                Assert.IsTrue(drugListSK != 0);
                Assert.IsNotNull(result);
                Assert.AreEqual(result.AutomaticallyAssignNewNDCsInd, currDrugList.AutomaticallyAssignNewNDCsInd);
                Assert.AreEqual(result.DrugListName, currDrugList.DrugListName);
                Assert.AreEqual(result.DrugPostObsltAlwdDays, currDrugList.DrugPostObsltAlwdDays);
                Assert.AreEqual(result.EfctvStartDt, currDrugList.EfctvStartDt);
                Assert.AreEqual(result.EfctvEndDt, currDrugList.EfctvEndDt);
                Assert.AreEqual(result.LOBSK, currDrugList.LOBSK);
                drugListRepo.DeleteDrugList(drugListSK);          
            }
        }
        
        [TestMethod]
        public void ShouldGetDrugListHeader()
        {
            using (drugListRepo = _formFactory.DrugList())
            { 
                //ARRANGE
                var drugListSK = InitializeDrugList();

                //ACT
                var drugListHeaderResult = drugListRepo.GetDrugListHeader(drugListSK);
                var record = drugListHeaderResult.FirstOrDefault();

                //ASSERT
                Assert.IsNotNull(drugListHeaderResult);
                Assert.AreEqual(record.DrugListSK, drugListSK);
                Assert.AreEqual(record.LOBSK, drugList.LOBSK);
                Assert.AreEqual(record.DrugRefDBSK, drugList.DrugRefDBSK);
                Assert.AreEqual(record.DrugListName, drugList.DrugListName);
                Assert.AreEqual(record.DrugPostObsltAlwdDays, drugList.DrugPostObsltAlwdDays);
                Assert.AreEqual(record.AutomaticallyAssignNewNDCsInd, drugList.AutomaticallyAssignNewNDCsInd);
                Assert.AreEqual(record.EfctvStartDt, drugList.EfctvStartDt);
                Assert.AreEqual(record.EfctvEndDt, drugList.EfctvEndDt);

                drugListRepo.DeleteDrugList(drugListSK);              
            }

        }
        
        [TestMethod]
        public void ShouldCopyDrugList()
        {
            using (drugListRepo = _formFactory.DrugList())
            {
                //ARRANGE
                var drugListSK = InitializeDrugList();

                //Act
                long resultSK = drugListRepo.CopyDrugList(drugListSK, "TheBatman");
                var result = drugListRepo.GetDrugListHeader(resultSK);

                //Assert
                Assert.IsNotNull(result);
                drugListRepo.DeleteDrugList(resultSK);
                drugListRepo.DeleteDrugList(drugListSK);               
            }
        }
        
        [TestMethod]
        public void ShouldGetAllDrugLists()
        {
            using (var Repo = _formFactory.DrugList())
            {
                
                //Arrange
                bool getAllInactive = true;
                long drugListSK1 = Repo.SetDrugListHeader(new DrugListHeaderVM { AutomaticallyAssignNewNDCsInd = true, DrugListName = "MeridianDrugList", DrugListSK = null, DrugPostObsltAlwdDays = 365, DrugRefDBSK = 1, EfctvStartDt = DateTime.Today, EfctvEndDt = DateTime.Parse("12/30/2017"), LOBSK = 1, SessionId = Guid.NewGuid(), UserId = "TheBatman" });
                long drugListSK2 = Repo.SetDrugListHeader(new DrugListHeaderVM { AutomaticallyAssignNewNDCsInd = true, DrugListName = "MHPDrugList", DrugListSK = null, DrugPostObsltAlwdDays = 365, DrugRefDBSK = 1, EfctvStartDt = DateTime.Today, EfctvEndDt = DateTime.Parse("12/30/2017"), LOBSK = 1, SessionId = Guid.NewGuid(), UserId = "TheBatman" });

                //Act
                var drugListResults = Repo.GetAllDrugLists(getAllInactive);
                var drugList1 = drugListResults.FirstOrDefault(a => a.DrugListSK == drugListSK1);
                var drugList2 = drugListResults.FirstOrDefault(a => a.DrugListSK == drugListSK2);

                //Assert
                Assert.IsNotNull(drugListResults);
                Assert.IsTrue(drugListResults.Count > 1);
                Assert.AreEqual(drugList1.DrugListSK, drugListSK1);
                Assert.AreEqual(drugList2.DrugListSK, drugListSK2);

                Repo.DeleteDrugList(drugListSK1);
                Repo.DeleteDrugList(drugListSK2);                
            }

        }

        [TestMethod]
        public void ShouldPerformDrugListFullTextSearch()
        {
            using (var Repo = _formFactory.DrugList())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    //Arrange
                    string searchString = "MeridianRXDrugList";
                    long drugListSK1 = Repo.SetDrugListHeader(new DrugListHeaderVM { AutomaticallyAssignNewNDCsInd = true, DrugListName = searchString, DrugListSK = null, DrugPostObsltAlwdDays = 365, DrugRefDBSK = 1, EfctvStartDt = DateTime.Today, EfctvEndDt = DateTime.Parse("12/30/2017"), LOBSK = 1, SessionId = Guid.NewGuid(), UserId = "TheBatman" });
                   
                    //Act
                    var drugListFullTextResults = Repo.DrugListFullTextSearch(searchString);

                    //Assert
                    Assert.IsNotNull(drugListFullTextResults);
                    Assert.IsTrue(drugListFullTextResults.Count >= 1);                  
               
                    Repo.DeleteDrugList(drugListSK1);

                }
            }

        }
        
        [TestMethod]
        public void ShouldGetDrugListsDetailPaged()
        {
            using (drugListRepo = _formFactory.DrugList())
            {
                //Arrange
                var drugListSK = InitializeDrugList();
                bool isNewRequest =true;
                int startInd =0;
                int count =100;
                string userID = "TheBatman";
                Guid sessionID = Guid.NewGuid();
                    
                //ACT
                drugListRepo.SetDrugListDetailCriteriaGroup(new DrugListDtlCrtriaGrpSP { CriteriaName = "", DrugListSk = drugListSK, UserId = userID, tblRules = new List<CriteriaDetailTableType> { new CriteriaDetailTableType { OperTypeCode = "=", CrtriaVal = "1058", ValQulfrCode = "ETC_ID" } } });
                var drugListDetailedPagedResults = drugListRepo.GetDrugListsDetailPaged(drugListSK, isNewRequest, startInd, count, userID, sessionID);
                
                //Assert
                Assert.AreEqual(drugListDetailedPagedResults.FirstOrDefault().DrugListSK, drugListSK);
                drugListRepo.DeleteDrugListDetail(drugListDetailedPagedResults.FirstOrDefault().DrugListDtlSK.Value);
                drugListRepo.DeleteDrugList(drugListSK);

            }
        }
        
        [TestMethod]
        public void GetDrugListDetailCriteriaGroup()
        {
            using (drugListRepo = _formFactory.DrugList())
            {
                //Arrange
                var drugListSK = InitializeDrugList();
                bool isNewRequest = true;
                int startInd = 0;
                int count = 100;
                string userID = "TheBatman";
                Guid sessionID = Guid.NewGuid();

                //ACT
                var drugListDetailModel = new DrugListDtlCrtriaGrpSP { CriteriaName = "", DrugListSk = drugListSK, UserId = userID, tblRules = new List<CriteriaDetailTableType> { new CriteriaDetailTableType { OperTypeCode = "=", CrtriaVal = "1058", ValQulfrCode = "ETC_ID" } } };
                drugListRepo.SetDrugListDetailCriteriaGroup(drugListDetailModel);
                var drugListDetailPaged = drugListRepo.GetDrugListsDetailPaged(drugListSK, isNewRequest, startInd, count, userID, sessionID);
                var record = drugListRepo.GetDrugListDetailCriteriaGroup(drugListDetailPaged.FirstOrDefault().DrugListDtlSK.Value).FirstOrDefault();
                
                //ASSERT
                Assert.AreEqual(record.CrtriaVal, drugListDetailModel.tblRules.FirstOrDefault().CrtriaVal);
                Assert.AreEqual(record.OperTypeCode, drugListDetailModel.tblRules.FirstOrDefault().OperTypeCode);
                Assert.AreEqual(record.ValQulfrCode, drugListDetailModel.tblRules.FirstOrDefault().ValQulfrCode);

                drugListRepo.DeleteDrugListDetail(drugListDetailPaged.FirstOrDefault().DrugListDtlSK.Value);
                drugListRepo.DeleteDrugList(drugListSK);
            }

        }
/*
        //TODO: Phase II
        /*
        [TestMethod]
        public void SetDrugListDetailCriteriaGroup()
        {
            using (var Repo = _formFactory.DrugList())
            {   


                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    List<CriteriaDetailTableType> listCDTT = new List<CriteriaDetailTableType>();
                    CriteriaDetailTableType aCDTT = new CriteriaDetailTableType
                    {
                        ValQulfrCode="2",
                        OperTypeCode="1",
                        CrtriaPrity=0,
                        CrtriaVal="6331"
                    };

                    CriteriaDetailTableType anotherCDTT = new CriteriaDetailTableType
                    {
                        ValQulfrCode ="2",
                        OperTypeCode ="1",
                        CrtriaPrity =0,
                        CrtriaVal ="1058"
                    };

                    listCDTT.Add(aCDTT);
                    listCDTT.Add(anotherCDTT);

                    DrugListDtlCrtriaGrpSP input = new DrugListDtlCrtriaGrpSP()
                    {
                        DrugListDtlSK = 33,
                        DrugListSk = 33,
                        CriteriaName = "DSDSD",
                        UserId = "jsmith",
                        tblRules = listCDTT
                        
                    };
                    //Repo.SetDrugListDetailCriteriaGroup(input);

                    Assert.AreEqual(1, 1);
                }
            }
        }*/
        
        [TestMethod]
        public void ShouldDeleteDrugListDetail()
        {
            using (drugListRepo = _formFactory.DrugList())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    //ARRANGE
                    long drugListSK = drugListRepo.SetDrugListHeader(new DrugListHeaderVM { AutomaticallyAssignNewNDCsInd = true, DrugListName = "MeridianDrugListt", DrugListSK = null, DrugPostObsltAlwdDays = 365, DrugRefDBSK = 1, EfctvStartDt = DateTime.Today, EfctvEndDt = DateTime.Parse("12/30/2017"), LOBSK = 1, SessionId = Guid.NewGuid(), UserId = "TheBatman" });
                    drugListRepo.SetDrugListDetailCriteriaGroup(new DrugListDtlCrtriaGrpSP { CriteriaName = "", DrugListSk = drugListSK, UserId = "TheBatman", tblRules = new List<CriteriaDetailTableType> { new CriteriaDetailTableType { ValQulfrCode = "ETC_ID", OperTypeCode = "=", CrtriaVal = "1024" } } });
                    var drugListDetails = drugListRepo.GetDrugListsDetailPaged(drugListSK, true, 0, 25, "TheBatman", Guid.NewGuid());
                    var drugListDetailSK = drugListDetails.FirstOrDefault().DrugListDtlSK;

                    //ACT
                    drugListRepo.DeleteDrugListDetail(drugListDetailSK.Value);
                    var getResults = drugListRepo.GetDrugListDetailCriteriaGroup(drugListDetailSK.Value);

                    //ASSERT
                    Assert.IsTrue(getResults.Count == 0);
                    drugListRepo.DeleteDrugList(drugListSK);
                }
            }

        }

        private long InitializeDrugList()
        {
            drugList = new DrugListHeaderVM { AutomaticallyAssignNewNDCsInd = true, DrugListName = "My Integration DrugList Test", DrugListSK = null, DrugPostObsltAlwdDays = 365, DrugRefDBSK = 1, EfctvStartDt = DateTime.Today, EfctvEndDt = DateTime.Parse("12/30/2017"), LOBSK = 1, SessionId = Guid.NewGuid(), UserId = "TheBatman" };
            var drugListSK = drugListRepo.SetDrugListHeader(drugList);
            return drugListSK;       
        }
    }
}
