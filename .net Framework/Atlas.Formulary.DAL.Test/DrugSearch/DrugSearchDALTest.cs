using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Atlas.Formulary.DAL.Repositories.Interfaces;
using Atlas.Formulary.DAL.Repositories;
using Atlas.Configuration;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.ViewModels;

using Atlas.Reference.DAL.ViewModels;
using Atlas.Reference.DAL;
using Atlas.Reference.DAL.Models;


using Atlas.Core.DAL.Models.Containers;
using Atlas.Formulary.DAL.Models.Containers;
using System.Data.Entity.Core.Objects;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using Atlas.Core.WebApi.Models.Requests;
using Atlas.Formulary.BLL.DrugSearch;
using Atlas.Formulary.BLL.Services.DrugSearch;
using System.Data.Entity.Validation;

namespace Atlas.Formulary.DAL.Test.DrugSearch
{
    [TestClass]
    public class DrugSearchDALTest
    {

        private IConfig _config;
        private FormularyEntities _formularyEntities;
        private IFormularyRepositoryFactory _formFactory;

        private IReferenceRepositoryFactory _refFactory;
        private ReferenceEntities _refEntities;

        private IDrugSearchBLL _bll;

        private IDrugSearchColumnExclusionBitmaskGenerator _ibmeg;
        private ISearchWhereCriteriaGenerator _iSwcg;

        /// <summary>
        /// Sets up.
        /// </summary>
        [TestInitialize]
        public void SetUp()
        {
            _config = new FormularyDevConfig();
            _formularyEntities = new FormularyEntities(_config);
            _formFactory = new FormularyRepositoryFactory(_config, _formularyEntities);

            _refEntities = new ReferenceEntities(_config);
            _refFactory = new ReferenceRepositoryFactory(_refEntities);

            _ibmeg = new DrugSearchColumnExclusionBitmaskGenerator();
            _iSwcg = new SearchWhereCriteriaGenerator();

            _bll = new DrugSearchBLL(_formFactory,_ibmeg,_iSwcg);

        }


        [TestMethod]
        public void ShouldGetMedispanDrugSearch()
        {
            using (var Repo = _formFactory.DrugSearch())
            {
                using (var medRepo = _refFactory.MedispanDrugList())
                {

                    var dlSK = _refEntities.MedispanDrugList.Max(x => x.NDC);
                 
                    MedispanDrugList itemToUpdate = new MedispanDrugList()
                    {
                        NDC = "00006000000",
                        EffectiveDate = DateTime.Now,
                        GPIName = "Penicillin G SMURFING",                       
                        ETC_ID=null

                    };
                                                          
                    _refEntities.MedispanDrugList.Attach(itemToUpdate);
                    _refEntities.Entry(itemToUpdate).State = itemToUpdate.NDC != null ? EntityState.Added : EntityState.Modified;
                    _refEntities.SaveChanges(); 

                    //ARRANGE
                    string whereCriteria = "";
                    string gpiID = "0110";
                    long bitmask = 677112961;
                    long? formSk = null ;
                    string orderByClause = "NDC ASC";
                    int? startIndex = 0;
                    int count = 25;
                    string UserId = "jsmith";
                    bool? criteriaChange = true;
                    
                    Guid sessionId = new Guid("ce6dc2c2-fac1-44a2-2614-1ed7484b00dd");
                    long? drugListSk = null;
                    long? drugCatgSk = null;
                                     
                    //ACT
                    var actualResult = Repo.DrugListSearchMedispan(whereCriteria, gpiID, bitmask, formSk, orderByClause, startIndex, count, UserId, criteriaChange, sessionId, drugListSk, drugCatgSk);

                    var itu = _refEntities.MedispanDrugList.FirstOrDefault(drug => drug.NDC == itemToUpdate.NDC);
                    //ASSERT
                    Assert.IsNotNull(itu);
                    Assert.AreEqual(itu.NDC, itemToUpdate.NDC);
                    Assert.AreEqual(itu.GPIName, itemToUpdate.GPIName);
                    Assert.AreEqual(itu.ETC_ID, itemToUpdate.ETC_ID);
                                          
                    _refEntities.MedispanDrugList.Remove(itu);
                    _refEntities.SaveChanges();

                }
            }
        }

        [TestMethod]
        public void ShouldGetDrugListSearchFDB()
        {
            using (var Repo = _formFactory.DrugSearch())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {

                    var dlSK = _formularyEntities.DrugList.Max(x => x.DrugListSK);

                    FDBDrugList itemToUpdate = new FDBDrugList()
                    {

                        NDC = "00006000000",
                        EffectiveDate = DateTime.Now,
                        LabelName = "SMURFING",
                        ETC_ID = null,


                    };

                    _refEntities.FDBDrugList.Attach(itemToUpdate);
                    _refEntities.Entry(itemToUpdate).State = itemToUpdate.DrugListSK == 0 ? EntityState.Added : EntityState.Modified;
                    _refEntities.SaveChanges();

                    //ARRANGE
                    string whereCriteria = "WHERE (FDBDrugList.LabelName IN ('SMURFING'))";
                    string etcId = 1.ToString();
                    int bitmask = 134328113;
                    int startIndex = 0;
                    int count = 25;
                    string UserId = "jsmith";
                    bool criteriaChange = true;
                    Guid sessionId = new Guid("fd28ebb9-3214-ffa0-2214-165d709340a4");

                    //ACT
                    var actualResult = Repo.DrugListSearchFDB(whereCriteria, etcId, bitmask, null, null, startIndex, count, UserId, criteriaChange, sessionId, null, null);

                    //ASSERT
                    Assert.IsNotNull(actualResult);
                    Assert.AreEqual(actualResult.FirstOrDefault().UserId, "jsmith");
                    Assert.AreEqual(actualResult.FirstOrDefault().LabelName, itemToUpdate.LabelName);
                    Assert.AreEqual(actualResult.FirstOrDefault().ETC_ID, null);

                    _refEntities.FDBDrugList.Remove(itemToUpdate);
                    _refEntities.SaveChanges();

                }
            }
        }

        [TestMethod]
        public void ShouldGetFormularyTreeSearch()
        {
            using (var Repo = _formFactory.DrugSearch())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    //Arrange                
                    List<spETCHierarchy_Get_Result> listExpected = new List<spETCHierarchy_Get_Result>();

                    spETCHierarchy_Get_Result expectedETCHierarchyTree = new spETCHierarchy_Get_Result()
                    {
                        ETC_PARENT_ETC_ID = 0,
                        ETC_ID = 1058,
                        ETC_NAME = "Alternative Therapy"
                    };

                    spETCHierarchy_Get_Result anotherExpectedETCHierarchyTree = new spETCHierarchy_Get_Result()
                    {
                        ETC_PARENT_ETC_ID = 1058,
                        ETC_ID = 1100,
                        ETC_NAME = "Alternative Therapy - Androgenic Agents"
                    };

                    
                    TreeChildren x = new TreeChildren()
                    {
                        ETC_ID = 23,
                        PARENT_ETC_ID = 33,
                        ETC_NAME = "eeee",
                        leaf = true,
                        children = new List<TreeChildren>()
                        
                    };   

                    listExpected.Add(expectedETCHierarchyTree);
                    listExpected.Add(anotherExpectedETCHierarchyTree);
                  

                    var result = new QueryResult<spETCHierarchy_Get_Result>();

                    //Act
                    var actualFormularyTreeSearch = Repo.FormularyTreeSearch().ToList();
                    result.Count = actualFormularyTreeSearch.Count();
                    result.Rows = actualFormularyTreeSearch;

                    //Assert

                    Assert.AreEqual(result.Rows.FirstOrDefault().ETC_PARENT_ETC_ID, listExpected[0].ETC_PARENT_ETC_ID);
                    Assert.AreEqual(result.Rows.FirstOrDefault().ETC_ID, listExpected[0].ETC_ID);
                    Assert.AreEqual(result.Rows.FirstOrDefault().ETC_NAME, listExpected[0].ETC_NAME);

                    Assert.AreEqual(result.Rows[1].ETC_PARENT_ETC_ID, listExpected[1].ETC_PARENT_ETC_ID);
                    Assert.AreEqual(result.Rows[1].ETC_ID, listExpected[1].ETC_ID);
                    Assert.AreEqual(result.Rows[1].ETC_NAME, listExpected[1].ETC_NAME);

                }
            }
        }

        //TODO: This test is not needed because Dead Code FormularyRule method is never used
        [TestMethod]
        public void ShouldGetFormularyRule()
        {
            
        }

        [TestMethod]
        public void ShouldReturnSmartDrugSearchFDB()
        {
            using (var Repo = _formFactory.DrugSearch())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    //ARRANGE
                    String Query = "SMURF";
                    string UserID = "jsmith";
                    long smartDrugSearchColumnSK = 1;

                    FDBDrugList itemToUpdate = new FDBDrugList()
                    {
                                            
                        NDC = "00093000000",                       
                        EffectiveDate = DateTime.Now,
                        ETC_ID = null,
                        ETC_NAME = null,                      
                        HICL_SEQNO = 25246,
                        LabelName="SMURFING",
                        BrandName = "FENTANYL-BUPIVACAINE-NS",
                        GenericName="a little"

                    };

                     _refEntities.FDBDrugList.Attach(itemToUpdate);
                     _refEntities.Entry(itemToUpdate).State = itemToUpdate.DrugListSK == 0 ? EntityState.Added : EntityState.Modified;
                    
                     _refEntities.SaveChanges();

                   
                                     
                    var result = new QueryResult<spFullTextDrugSearchExt_FDB_Result>();

                    //Act
                    var actualFullTextDrugSearchExtFDB = Repo.SmartDrugSearchFDB(Query, smartDrugSearchColumnSK).ToList();
                    result.Count = actualFullTextDrugSearchExtFDB.Count();
                    result.Rows = actualFullTextDrugSearchExtFDB;

                    //ASSERT
                   
                    Assert.AreEqual(result.Rows.LastOrDefault().NDC, itemToUpdate.NDC);                                     
                    Assert.AreEqual(result.Rows.LastOrDefault().ETC_ID, itemToUpdate.ETC_ID);
                    Assert.AreEqual(result.Rows.LastOrDefault().ETC_NAME, itemToUpdate.ETC_NAME);                    
                    Assert.AreEqual(result.Rows.LastOrDefault().HICL_SEQNO, itemToUpdate.HICL_SEQNO);
                    Assert.AreEqual(result.Rows.LastOrDefault().LabelName, itemToUpdate.LabelName);
                    Assert.AreEqual(result.Rows.LastOrDefault().BrandName, itemToUpdate.BrandName);
                    Assert.AreEqual(result.Rows.LastOrDefault().GenericName, itemToUpdate.GenericName);
                   
                    //var xxx = _refEntities.FDBDrugList.Where(y=>y.NDC == itemToUpdate.NDC);
                    _refEntities.FDBDrugList.Remove(itemToUpdate);
                    _refEntities.SaveChanges();
                 
                }
            }
        }

        //TODO: Check for Unique NDC each time
        [TestMethod]
        public void ShouldReturnSmartDrugSearchFormulary()
        {
            using (var Repo = _formFactory.DrugSearch())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    using (var formRepo = _formFactory.Formulary()) {
                        //ARRANGE
                        String Query = "SMURF";

                        long? frmlrySK = null;
                        long? lOBSK = 3; //commercial
                        long? drugThrputcClsTypeSK = 1; //can only be 1
                        long? drugRefDbSK = 1;
                        int? drugPostObsltAlwdDays = 365;
                        string frmlryName = "Matt_"+DateTime.Now;  //has to be unique
                        DateTime efctvStartDt = DateTime.Now;
                        DateTime efctvEndDt = DateTime.Now;
                        string planType = "Commercial";
                        string drugTypeFn = "FDB";
                        bool? isExcludeOTC = true;
                        string userId = "jsmith";
                        string drugListName_List = "";
                        string tierName_List = "";
                        Nullable<long> ownerUserGrpSkList = new Nullable<long>();
                        string accessUserGrpSk_List = "";
                        DateTimeOffset? inctvTs = null;
                        DateTimeOffset? delTs = null;
                        bool autoAddNewNDCs = false;
                        long summaryReportConfigSK = 1;
                                 

                        formRepo.PutFormularyHeader(frmlrySK, lOBSK, drugThrputcClsTypeSK, drugRefDbSK, drugPostObsltAlwdDays, frmlryName,
                             efctvStartDt, efctvEndDt, planType, drugTypeFn, isExcludeOTC, userId,drugListName_List, tierName_List,ownerUserGrpSkList ,
                             accessUserGrpSk_List, inctvTs, delTs, autoAddNewNDCs, summaryReportConfigSK);

                        formRepo.SaveChanges();


                        var maxFormSK = _formularyEntities.Frmlry.Max(x => x.FrmlrySK);

                        FDBDrugList itemToUpdate = new FDBDrugList()
                        {

                            NDC = "00093000002",      //NDC has to be unique, assuming this does not exist
                            EffectiveDate = DateTime.Now,
                            ETC_ID = null,
                            ETC_NAME = null,
                            HICL_SEQNO = 25246,
                            LabelName = "SMURFING",
                            BrandName = "FENTANYL-BUPIVACAINE-NS",
                            GenericName = "a little"

                        };

                        _refEntities.FDBDrugList.Attach(itemToUpdate);
                        _refEntities.Entry(itemToUpdate).State = itemToUpdate.DrugListSK == 0 ? EntityState.Added : EntityState.Modified;
                        _refEntities.SaveChanges();



                        var maxDrugListSK = _refEntities.FDBDrugList.Max(x => x.DrugListSK);


                        spFullTextDrugSearchExt_Frmlry_Result expectedMissingNDCGCNSearch = new spFullTextDrugSearchExt_Frmlry_Result()
                        {
                            DrugListSK = maxDrugListSK,
                            NDC = itemToUpdate.NDC,

                            ETC_ID = itemToUpdate.ETC_ID,
                            ETC_NAME = itemToUpdate.ETC_NAME,

                            HICL_SEQNO = itemToUpdate.HICL_SEQNO,
                            LabelName = itemToUpdate.LabelName,
                            BrandName = itemToUpdate.BrandName,
                            GenericName = itemToUpdate.GenericName

                        };
                                            
                        var result = new QueryResult<spFullTextDrugSearchExt_Frmlry_Result>();

                        //Act
                        var actualSmartDrugSearchFormulary = Repo.SmartDrugSearchFormulary(Query, maxFormSK, null).ToList();
                        result.Count = actualSmartDrugSearchFormulary.Count();
                        result.Rows = actualSmartDrugSearchFormulary;

                        //Assert

                        Assert.AreEqual(result.Rows.LastOrDefault().DrugListSK, expectedMissingNDCGCNSearch.DrugListSK);
                        Assert.AreEqual(result.Rows.LastOrDefault().NDC, expectedMissingNDCGCNSearch.NDC);

                        Assert.AreEqual(result.Rows.LastOrDefault().ETC_ID, expectedMissingNDCGCNSearch.ETC_ID);
                        Assert.AreEqual(result.Rows.LastOrDefault().ETC_NAME, expectedMissingNDCGCNSearch.ETC_NAME);

                        Assert.AreEqual(result.Rows.LastOrDefault().HICL_SEQNO, expectedMissingNDCGCNSearch.HICL_SEQNO);
                        Assert.AreEqual(result.Rows.LastOrDefault().LabelName, expectedMissingNDCGCNSearch.LabelName);
                        Assert.AreEqual(result.Rows.LastOrDefault().BrandName, expectedMissingNDCGCNSearch.BrandName);
                        Assert.AreEqual(result.Rows.LastOrDefault().GenericName, expectedMissingNDCGCNSearch.GenericName);

                        _formularyEntities.spFormulary_Delete(maxFormSK, DateTime.Now);

                        _refEntities.FDBDrugList.Remove(itemToUpdate);
                        _refEntities.SaveChanges();
                    }
                }
            }
        }

        //TODO: select unique NDC
        [TestMethod]
        public void ShouldReturnMissingNDCGCNSearch()
        {
            using (var Repo = _formFactory.DrugSearch())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {

                    var maxDrugListSK = _refEntities.FDBDrugList.Max(x => x.DrugListSK);

                    FDBDrugList itemToUpdate = new FDBDrugList()
                    {

                        NDC = "00093000003",      //NDC has to be unique, assuming this does not exist
                        EffectiveDate = DateTime.Now,
                        ETC_ID = null,
                        ETC_NAME = null,
                        HICL_SEQNO = 25246,
                        LabelName = "SMURFING",
                        BrandName = "FENTANYL-BUPIVACAINE-NS",
                        GenericName = "a little",
                        GCN_SEQNO="15883"
                        
                    };

                    _refEntities.FDBDrugList.Attach(itemToUpdate);
                    _refEntities.Entry(itemToUpdate).State = itemToUpdate.DrugListSK == 0 ? EntityState.Added : EntityState.Modified;
                    _refEntities.SaveChanges();

                    //Arrange
                    string searchString = "SMUR";
                    spMissingNDCGCN_Search_Result expectedMissingNDCGCNSearch = new spMissingNDCGCN_Search_Result()
                    {
                       LabelName= itemToUpdate.LabelName,
                       GCN_SEQNO= itemToUpdate.GCN_SEQNO,
                       NDC= itemToUpdate.NDC

                    };

                    var result = new QueryResult<spMissingNDCGCN_Search_Result>();

                    //Act
                    var actualMissingNDCGCNSearch2 = Repo.MissingNDCGCNSearch(searchString).ToList();
                    result.Count = actualMissingNDCGCNSearch2.Count();
                    result.Rows = actualMissingNDCGCNSearch2;

                    //Assert

                    Assert.AreEqual(result.Rows.LastOrDefault().NDC, expectedMissingNDCGCNSearch.NDC);
                    Assert.AreEqual(result.Rows.LastOrDefault().GCN_SEQNO, expectedMissingNDCGCNSearch.GCN_SEQNO);
                    Assert.AreEqual(result.Rows.LastOrDefault().LabelName, expectedMissingNDCGCNSearch.LabelName);                  

                    _refEntities.FDBDrugList.Remove(itemToUpdate);
                    _refEntities.SaveChanges();
                }
            }
        }

        [TestMethod]
        public void ShouldGetMissingNDCMedispanSearch()
        {
            using (var Repo = _formFactory.DrugSearch())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    //Arrange
                    string searchString = "fentanyl";
                    spMissingNDCMedispan_Search_Result expectedMissingNDCMedispanSearch = new spMissingNDCMedispan_Search_Result()
                    {
                       //NDC="42549066105",
                       LabelName= "FENTANYL"                                                    

                    };

                    var result = new QueryResult<spMissingNDCMedispan_Search_Result>();

                    //Act
                    var actualMissingNDCMedispanSearch = Repo.MissingNDCMedispanSearch(searchString).ToList();
                    result.Count = actualMissingNDCMedispanSearch.Count();
                    result.Rows = actualMissingNDCMedispanSearch;

                    //Assert

                    //Assert.AreEqual(result.Rows.FirstOrDefault().NDC, expectedMissingNDCMedispanSearch.NDC);
                    Assert.IsFalse(!(result.Rows.FirstOrDefault().LabelName.Contains(expectedMissingNDCMedispanSearch.LabelName)));
                    Assert.IsTrue(result.Rows.FirstOrDefault().LabelName.Contains(expectedMissingNDCMedispanSearch.LabelName));
                }
            }
        }

        [TestMethod]
        public void ShouldGetGPIHierarchyTree()
        {
            using (var Repo = _formFactory.DrugSearch())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    //Arrange               
                    spGPIHierarchy_Get_Result result1 = new spGPIHierarchy_Get_Result()
                    {
                        GPI= "01",
                        GPI_Name= "*PENICILLINS*",
                        GPI_Parent = null

                    };

                    spGPIHierarchy_Get_Result result2 = new spGPIHierarchy_Get_Result()
                    {

                        GPI = "99.87.00.10.00",
                        GPI_Name = "Homeopathic Products",
                        GPI_Parent = "99.87.00"

                    };

                    List<spGPIHierarchy_Get_Result> list = new List<spGPIHierarchy_Get_Result>();

                    list.Add(result1);
                    list.Add(result2);

                    var result = new QueryResult<spGPIHierarchy_Get_Result>();

                    //Act
                    var actualGPIHierarchyResult = Repo.GetGPIHierarchy().ToList();
                    result.Count = actualGPIHierarchyResult.Count();
                    result.Rows = actualGPIHierarchyResult;

                    //Assert

                    //Assert.AreEqual(result.Rows.FirstOrDefault().NDC, expectedMissingNDCMedispanSearch.NDC);
                    Assert.AreEqual(result.Rows.FirstOrDefault().GPI_Name, list.FirstOrDefault().GPI_Name);
                    Assert.AreEqual(result.Rows.FirstOrDefault().GPI.ToString(), list.FirstOrDefault().GPI);
                    Assert.AreEqual(result.Rows.FirstOrDefault().GPI_Parent, list.FirstOrDefault().GPI_Parent);

                    Assert.AreEqual(result.Rows.LastOrDefault().GPI_Name, list.LastOrDefault().GPI_Name);
                    Assert.AreEqual(result.Rows.LastOrDefault().GPI, list.LastOrDefault().GPI);
                    Assert.AreEqual(result.Rows.LastOrDefault().GPI_Parent, list.LastOrDefault().GPI_Parent);
                }
            }
        }

        [TestMethod]
        public void ShouldGetSmartDrugListSearchMedispan()
        {
            using (var Repo = _formFactory.DrugSearch())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {

                    string searchFor = "laxative";
                    int druglistSK = 9;
                    long? smartSearchFieldSK = null;


                    //Arrange               
                    spFullTextDrugSearchExt_DrugListMS_Result result1 = new spFullTextDrugSearchExt_DrugListMS_Result()
                    {
                        DrugListSK = 392543,
                        NDC = "76420018990",
                        NDC_Rank = 0,
                        EffectiveDate = new DateTime(2017, 09, 13),
                        ETC_ID = 412,
                        ETC_NAME = "laxative - Bulk Forming",
                        ETC_NAME_Rank = 0,
                        HICL_SEQNO = 38110,
                        BrandName = "COLOX",
                        BrandName_Rank = 0,
                        GCN_SEQNO = "68051",
                        GCN_SEQNO_Rank = 0,
                        LabelName = "COLOX 750 MG CAPSULE",
                        LabelName_Rank = 0,
                        MedId = "567613",
                        MedId_Rank = 0,
                        DrugType = "SSB",
                        DrugType_Rank = 0,
                        OTC = true,
                        DrugStrength = "750mg"

                    };

                    spFullTextDrugSearchExt_DrugListMS_Result result2 = new spFullTextDrugSearchExt_DrugListMS_Result()
                    {
                        DrugListSK = 3235,
                        NDC = "36800008663",
                        NDC_Rank = 0,
                        EffectiveDate = new DateTime(2017, 02, 27),
                        ETC_ID = 411,
                        ETC_NAME = "Laxative - Stimulant",
                        ETC_NAME_Rank = 0,
                        HICL_SEQNO = 1301,
                        BrandName = "LAXATIVE",
                        BrandName_Rank = 0,
                        GCN_SEQNO = "28519",
                        GCN_SEQNO_Rank = 0,
                        LabelName = "LAXATIVE 5 MG TABLET",
                        LabelName_Rank = 100,
                        MedId = "447536",
                        MedId_Rank = 0,
                        DrugType = "MSB",
                        DrugType_Rank = 0,
                        OTC = true,
                        DrugStrength = "5 mg"

                    };

                    List<spFullTextDrugSearchExt_DrugListMS_Result> list = new List<spFullTextDrugSearchExt_DrugListMS_Result>();

                    list.Add(result1);
                    list.Add(result2);
                    

                    var result = new QueryResult<spFullTextDrugSearchExt_DrugListMS_Result>();
                       
                    //Act
                    var actualFullTextDrugSearchExt_DrugList = Repo.SmartDrugListSearchMedispan(searchFor, druglistSK, smartSearchFieldSK).ToList();
                    result.Count = actualFullTextDrugSearchExt_DrugList.Count();
                    result.Rows = actualFullTextDrugSearchExt_DrugList;

                    //Assert

                    var x= result.Rows.FindAll(s => s.DrugListSK == 392543);

                    Assert.AreEqual(result.Rows.FirstOrDefault().DrugListSK, list.FirstOrDefault().DrugListSK);
                    Assert.AreEqual(result.Rows.FirstOrDefault().NDC, list.FirstOrDefault().NDC);
                    Assert.AreEqual(result.Rows.FirstOrDefault().NDC_Rank, list.FirstOrDefault().NDC_Rank);

                    Assert.AreEqual(result.Rows.FirstOrDefault().EffectiveDate, list.FirstOrDefault().EffectiveDate);
                    Assert.AreEqual(result.Rows.FirstOrDefault().ETC_ID, list.FirstOrDefault().ETC_ID);
                    Assert.AreEqual(result.Rows.FirstOrDefault().ETC_NAME, list.FirstOrDefault().ETC_NAME);
                    Assert.AreEqual(result.Rows.FirstOrDefault().ETC_NAME_Rank, list.FirstOrDefault().ETC_NAME_Rank);
                    Assert.AreEqual(result.Rows.FirstOrDefault().HICL_SEQNO, list.FirstOrDefault().HICL_SEQNO);
                    Assert.AreEqual(result.Rows.FirstOrDefault().BrandName, list.FirstOrDefault().BrandName);
                    Assert.AreEqual(result.Rows.FirstOrDefault().BrandName_Rank, list.FirstOrDefault().BrandName_Rank);
                    Assert.AreEqual(result.Rows.FirstOrDefault().GCN_SEQNO, list.FirstOrDefault().GCN_SEQNO);
                    Assert.AreEqual(result.Rows.FirstOrDefault().GCN_SEQNO_Rank, list.FirstOrDefault().GCN_SEQNO_Rank);
                    Assert.AreEqual(result.Rows.FirstOrDefault().LabelName, list.FirstOrDefault().LabelName);
                    Assert.AreEqual(result.Rows.FirstOrDefault().LabelName_Rank, list.FirstOrDefault().LabelName_Rank);
                    Assert.AreEqual(result.Rows.FirstOrDefault().MedId, list.FirstOrDefault().MedId);
                    Assert.AreEqual(result.Rows.FirstOrDefault().MedId_Rank, list.FirstOrDefault().MedId_Rank);
                    Assert.AreEqual(result.Rows.FirstOrDefault().DrugType, list.FirstOrDefault().DrugType);
                    Assert.AreEqual(result.Rows.FirstOrDefault().DrugType_Rank, list.FirstOrDefault().DrugType_Rank);
                    Assert.AreEqual(result.Rows.FirstOrDefault().OTC, list.FirstOrDefault().OTC);
                    Assert.AreEqual(result.Rows.FirstOrDefault().DrugStrength, list.FirstOrDefault().DrugStrength);
                    
                }
            }
        }

        [TestMethod]
        public void ShouldAccomodateForMultipleETCIDsInARuleWhenFDBDS()
        {
            using (var Repo = _formFactory.DrugSearch())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {

                    DrugSearchRequest<Criteria> query = new DrugSearchRequest<Criteria>()
                    {
                        FormularySK=22,
                        DrugListSK=33,
                        OrderBy="",
                        userId="",
                        SessionId=new Guid("{AC9A80B1-6165-482D-8B11-37A9146ABF90}"),
                        CriteriaChange =true
                                              
                    };

                    ETC etc1 = new ETC()
                    {
                        ETC_ID = 9000,
                        ETC_NAME = "m",
                        ETC_PARENT_ETC_ID = 0,
                        BatchId = new Guid("{AC9A80B1-6165-482D-8B11-37A9146ABF90}")

                    };

                    ETC etc2 = new ETC()
                    {
                        ETC_ID = 9001,
                        ETC_NAME = "mc",
                        ETC_PARENT_ETC_ID = 0,
                        BatchId = new Guid("{AC9A80B1-6165-482D-8B11-37A9146ABF90}")

                    };

                    ETC etc3 = new ETC()
                    {
                        ETC_ID = 9002,
                        ETC_NAME = "mck",
                        ETC_PARENT_ETC_ID = 0,
                        BatchId = new Guid("{AC9A80B1-6165-482D-8B11-37A9146ABF90}")
                       

                    };

                    FDBDrugList aDrug = new FDBDrugList()
                    {
                        BrandName="matts drug",
                        LabelName ="matts drug",
                        ETC_ID=9002,
                        ETC_NAME="mck",
                        NDC = "00000200000", //needed
                        DateToMarket= DateTime.Now,  //needed
                        EffectiveDate = DateTime.Now,
                        DeletedDate= DateTime.Now

                    };
                                                    
                    _refEntities.ETC.Attach(etc1);
                    _refEntities.Entry(etc1).State = EntityState.Added;

                    _refEntities.ETC.Attach(etc2);
                    _refEntities.Entry(etc2).State = EntityState.Added;

                    _refEntities.ETC.Attach(etc3);
                    _refEntities.Entry(etc3).State = EntityState.Added;

                    _refEntities.FDBDrugList.Attach(aDrug);
                    _refEntities.Entry(aDrug).State = EntityState.Added;
                                       
                    try
                    {
                        _refEntities.SaveChanges();
                    }
                    catch (DbEntityValidationException ex)
                    {
                        // Retrieve the error messages as a list of strings.
                        var errorMessages = ex.EntityValidationErrors
                                .SelectMany(x => x.ValidationErrors)
                                .Select(x => x.ErrorMessage);

                        // Join the list to a single string.
                        var fullErrorMessage = string.Join("; ", errorMessages);

                        // Combine the original exception message with the new one.
                        var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                        // Throw a new DbEntityValidationException with the improved exception message.
                        throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
                    }
                                   
                    List<Criteria> queries = new List<Criteria>() { };

                    Criteria a = new Criteria()
                    {
                        Property="GenericName",
                        Operator="include",
                        Value="0"
                    };

                    Criteria b = new Criteria()
                    {
                        Property = "BrandName",
                        Operator = "include",
                        Value = "0"
                    };

                    Criteria c = new Criteria()
                    {
                        Property = "LabelName",
                        Operator = "include",
                        Value = "0"
                    };

                    Criteria d = new Criteria()
                    {
                        Property = "DrugType",
                        Operator = "include",
                        Value = "0"
                    };

                    Criteria e = new Criteria()
                    {
                        Property = "OTC",
                        Operator = "include",
                        Value = "0"
                    };

                    Criteria f = new Criteria()
                    {
                        Property = "ETC_ID",
                        Operator = "=",
                        Value = "9000, 9001, 9002"
                    };

                    queries.Add(a);
                    queries.Add(b);
                    queries.Add(c);
                    queries.Add(d);
                    queries.Add(e);
                    queries.Add(f);

                    DrugSearchRequest<Criteria> q = new DrugSearchRequest<Criteria>()
                    {
                        Payload = queries,
                        StartIndex = 0,
                        Count = 25,
                        FormularySK = 51925,
                        OrderBy = "NDC ASC",
                        userId = "jsmith",
                        CriteriaChange = true,
                        SessionId = new Guid("{88a85f58-58bd-b1be-2714-0923584bc4a9}"),
                        DrugListSK = null

                    };

                    spDrugListSearchFDBv5_Result expected = new spDrugListSearchFDBv5_Result()
                    {
                       BrandName="matts drug",
                       LabelName="matts drug",
                       ETC_ID   = null,    //expected 9002
                       ETC_NAME = null     //expected mck
                        
                    };

                    QueryResult<spDrugListSearchFDBv5_Result> result = new QueryResult<spDrugListSearchFDBv5_Result>() { };                                                         

                    //ACT
                    var actualResult = _bll.Search(q.Payload,q.StartIndex,q.Count,q.FormularySK,q.OrderBy,q.userId,q.CriteriaChange,q.SessionId,q.DrugListSK);
                    result = actualResult;
                    result.Count = actualResult.Count; 

                    //ASSERT
                    Assert.AreEqual(result.Rows.FirstOrDefault().BrandName, expected.BrandName);
                    Assert.AreEqual(result.Rows.FirstOrDefault().LabelName, expected.LabelName);
                    Assert.AreEqual(result.Rows.FirstOrDefault().ETC_ID, expected.ETC_ID);
                    Assert.AreEqual(result.Rows.FirstOrDefault().ETC_NAME, expected.ETC_NAME);
                  
                    _refEntities.ETC.Remove(etc1);
                    _refEntities.Entry(etc1).State = EntityState.Deleted;
                    _refEntities.SaveChanges();
                    _refEntities.ETC.Remove(etc2);
                    _refEntities.Entry(etc2).State = EntityState.Deleted;
                    _refEntities.SaveChanges();
                    _refEntities.ETC.Remove(etc3);
                    _refEntities.Entry(etc3).State = EntityState.Deleted;
                    _refEntities.SaveChanges();
                    _refEntities.FDBDrugList.Remove(aDrug);
                    _refEntities.Entry(aDrug).State = EntityState.Deleted;
                    _refEntities.SaveChanges();

                }
            }
        }

    }
}
