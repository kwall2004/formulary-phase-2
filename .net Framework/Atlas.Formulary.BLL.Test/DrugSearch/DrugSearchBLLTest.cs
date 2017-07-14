using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Atlas.Formulary.BLL.DrugSearch;
using Atlas.Formulary.BLL.Services.DrugSearch;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.Repositories.Interfaces;
using System.Linq;
using System.Collections.Generic;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Formulary.DAL.Models.Interfaces;
using Atlas.Formulary.DAL.Models.Containers;

namespace Atlas.Formulary.BLL.Test.DrugSearch
{
    [TestClass]
    public class DrugSearchBLLTest
    {
       
        private Mock<IFormularyRepositoryFactory> repoFactoryMock;
        private Mock<IDrugSearchColumnExclusionBitmaskGenerator> bitmaskGenMock;
        private Mock<ISearchWhereCriteriaGenerator> searchWhereCriteriaGenMock;
        private Mock<IDrugSearchRepository> drugRepoMock;

        [TestInitialize]
        public void SetupTest()
        {
            repoFactoryMock = new Mock<IFormularyRepositoryFactory>(); 
            drugRepoMock = new Mock<IDrugSearchRepository>();  //drug          
        }

        [TestMethod]        
        public void ShouldHaveCorrectDrugSearchResponse()
        {
            // ARRANGE
            List<Criteria> theCriteria = new List<Criteria>();

            Criteria aNewCrit0 = new Criteria
            {
                Property="NDC",
                Operator="include",
                Value="0"
            };
            Criteria aNewCrit1 = new Criteria
            {
                Property = "MedId",
                Operator = "include",
                Value = "0"
            };
            Criteria aNewCrit2 = new Criteria
            {
                Property = "LabelName",
                Operator = "include",
                Value = "0"
            };
            Criteria aNewCrit3 = new Criteria
            {
                Property = "GCN_SEQNO",
                Operator = "include",
                Value = "0"
            };
            Criteria aNewCrit4 = new Criteria
            {
                Property = "BrandName",
                Operator = "include",
                Value = "0"
            };
            Criteria aNewCrit5 = new Criteria
            {
                Property = "HICL_SEQNO",
                Operator = "include",
                Value = "0"
            };
            Criteria aNewCrit6 = new Criteria
            {
                Property = "ETC_NAME",
                Operator = "include",
                Value = "0"
            };
            Criteria aNewCrit7 = new Criteria
            {
                Property = "OTC",
                Operator = "include",
                Value = "0"
            };
            Criteria aNewCrit8 = new Criteria
            {
                Property = "DrugType",
                Operator = "include",
                Value = "0"
            };
            Criteria aNewCrit9 = new Criteria
            {
                Property = "DrugStrength",
                Operator = "include",
                Value = "0"
            };

            Criteria aNewCrit10 = new Criteria
            {
                Property = "GCRT_DESC",
                Operator = "include",
                Value = "0"
            };

            Criteria aNewCrit11 = new Criteria
            {
                Property = "ETC_ID",
                Operator = "=",
                Value = "0",
                
            };

            theCriteria.Add(aNewCrit0);
            theCriteria.Add(aNewCrit1);
            theCriteria.Add(aNewCrit2);
            theCriteria.Add(aNewCrit3);
            theCriteria.Add(aNewCrit4);
            theCriteria.Add(aNewCrit5);
            theCriteria.Add(aNewCrit6);
            theCriteria.Add(aNewCrit7);
            theCriteria.Add(aNewCrit8);
            theCriteria.Add(aNewCrit9);
            theCriteria.Add(aNewCrit10);
            theCriteria.Add(aNewCrit11);

            int rCount = 1;
            string user = "jsmith";
            long bitMaskResponse = 134328113; //returned 
            string whereCriteria = "";         
            var drugListSearchFDBResponse = new List<spDrugListSearchFDBv4_Result>()  //returned
            {
                new spDrugListSearchFDBv4_Result()
                {
                    BrandName = "AMYVID",
                    DosageForm = "VIAL (EA)",
                    DrugStrength = "10 mCi (370 MBq)",
                    DrugType = "SSB",
                    ETC_ID = 6355,
                    ETC_NAME = "Diagnostic Radiopharmaceuticals - Brain,  Amyloid Plaque Imaging",
                    GCN_SEQNO = 69224,
                    GCRT_DESC = "INTRAVENOUS",
                    GenericName = "FLORBETAPIR F-18",
                    GTC = 53,
                    GTC_DESC = "DIAGNOSTIC",
                    HICL_SEQNO = 39020,
                    IsCovered = true,  
                    IsObsolete = false,
                    IsSpecialtyDrug = false,
                    LabelName = "AMYVID VIAL",
                    MedId = "572762",
                    NDC = "00002026603",
                    ObsoleteDate = null,
                    OTC = false,
                    PackageSize = (decimal)1.000,
                    TierCode = "T1",
                    UserId = "jsmith",
                    RowCount=rCount
                    
                }
            };

            repoFactoryMock.Setup(a => a.DrugSearch()).Returns(drugRepoMock.Object);

            drugRepoMock
                .Setup(a => a.DrugListSearchFDB(whereCriteria, //wherecriteria
                                                                 0.ToString(), //etcId
                                                   bitMaskResponse, //bitmask
                                                                 null, //formularySk
                                                                 null, //orderbyClause
                                                                 0, //startindex
                                                                 25, //count
                                                                 user, //userid
                                                                 true, //criteriaChange
                                                                 new System.Guid("9755b8f5-8ad9-0795-2414-c470002c399b"), //sessionId
                                                                 null, //drugListSk
                                                                 null)).Returns(drugListSearchFDBResponse); //drugGtypeSK


            IDrugSearchColumnExclusionBitmaskGenerator dscebg = new DrugSearchColumnExclusionBitmaskGenerator() { };

            ISearchWhereCriteriaGenerator swcg = new SearchWhereCriteriaGenerator() { };
            
            DrugSearchBLL bll = new DrugSearchBLL(repoFactoryMock.Object,dscebg,swcg );
          
            // ACT
            var result = bll.Search(theCriteria,   //queries
                                    0,  //startIndex
                                    25, //count
                                    null, //formularySK
                                    null,  //orderBy
                                    user, //userId
                                    true, //criteriaChange
                                    new System.Guid("9755b8f5-8ad9-0795-2414-c470002c399b"), //sessionId
                                    null); //drugListSK
          
            // ASSERT
            var record = result.Rows.FirstOrDefault();
            //Assert.AreEqual(1, result.Count);
            Assert.AreNotEqual(null, record);
            Assert.AreEqual(record.BrandName, drugListSearchFDBResponse.FirstOrDefault().BrandName);
            Assert.AreEqual(record.DosageForm, drugListSearchFDBResponse.FirstOrDefault().DosageForm);
            Assert.AreEqual(record.DrugStrength, drugListSearchFDBResponse.FirstOrDefault().DrugStrength);
            Assert.AreEqual(record.DrugType, drugListSearchFDBResponse.FirstOrDefault().DrugType);
            Assert.AreEqual(record.ETC_ID, drugListSearchFDBResponse.FirstOrDefault().ETC_ID);
            Assert.AreEqual(record.ETC_NAME, drugListSearchFDBResponse.FirstOrDefault().ETC_NAME);
            Assert.AreEqual(record.GCN_SEQNO, drugListSearchFDBResponse.FirstOrDefault().GCN_SEQNO);
            Assert.AreEqual(record.GCRT_DESC, drugListSearchFDBResponse.FirstOrDefault().GCRT_DESC);
            Assert.AreEqual(record.GenericName, drugListSearchFDBResponse.FirstOrDefault().GenericName);
            Assert.AreEqual(record.GTC, drugListSearchFDBResponse.FirstOrDefault().GTC);
            Assert.AreEqual(record.GTC_DESC, drugListSearchFDBResponse.FirstOrDefault().GTC_DESC);
            Assert.AreEqual(record.HICL_SEQNO, drugListSearchFDBResponse.FirstOrDefault().HICL_SEQNO);
            Assert.AreEqual(record.IsCovered, drugListSearchFDBResponse.FirstOrDefault().IsCovered);
            Assert.AreEqual(record.IsObsolete, drugListSearchFDBResponse.FirstOrDefault().IsObsolete);
            Assert.AreEqual(record.IsSpecialtyDrug, drugListSearchFDBResponse.FirstOrDefault().IsSpecialtyDrug);
            Assert.AreEqual(record.LabelName, drugListSearchFDBResponse.FirstOrDefault().LabelName);
            Assert.AreEqual(record.MedId, drugListSearchFDBResponse.FirstOrDefault().MedId);
            Assert.AreEqual(record.NDC, drugListSearchFDBResponse.FirstOrDefault().NDC);
            Assert.AreEqual(record.ObsoleteDate, drugListSearchFDBResponse.FirstOrDefault().ObsoleteDate);
            Assert.AreEqual(record.OTC, drugListSearchFDBResponse.FirstOrDefault().OTC);
            Assert.AreEqual(record.PackageSize, (decimal)1.000);
            Assert.AreEqual(record.TierCode, drugListSearchFDBResponse.FirstOrDefault().TierCode);
            Assert.AreEqual(record.UserId, drugListSearchFDBResponse.FirstOrDefault().UserId);
        }


        [TestMethod]
        public void ShouldHaveFormularyConfigSmartSearchResponse()
        {


            string query = "fentanyl";
            long frmlrySK = 11;
            long smartDrugSearchColumnSK = 1;
            //Arrange
            var smartSearchResponse = new List<spFullTextDrugSearchExt_Frmlry_Result>()
            {
                new spFullTextDrugSearchExt_Frmlry_Result()
                {
                   BrandName_Rank=5,  
                   BrandName=query,
                   GCN_SEQNO="32",
                   GenericName="fentanyl22",
                   HICL_SEQNO=22,
                   LabelName="fentanyl patch",
                   NDC="22222"
                  

                },
                new spFullTextDrugSearchExt_Frmlry_Result(){
                   DosageForm_Rank=5,
                   BrandName =query,
                   GCN_SEQNO="32",
                   GenericName="fentanyl22",
                   HICL_SEQNO=22,
                   LabelName="fentanyl patch",
                   NDC="22222"
           
                },
                new spFullTextDrugSearchExt_Frmlry_Result(){
                   DrugStrength_Rank=5,
                   BrandName=query,
                   GCN_SEQNO="32",
                   GenericName="fentanyl22",
                   HICL_SEQNO=22,
                   LabelName="fentanyl patch",
                   NDC="22222"

                },
                new spFullTextDrugSearchExt_Frmlry_Result(){
                   DrugType_Rank=5,
                   BrandName=query,
                   GCN_SEQNO="32",
                   GenericName="fentanyl22",
                   HICL_SEQNO=22,
                   LabelName="fentanyl patch",
                   NDC="22222"

                },
                new spFullTextDrugSearchExt_Frmlry_Result(){
                   ETC_NAME_Rank=5,
                   BrandName =query,
                   GCN_SEQNO="32",
                   GenericName="fentanyl22",
                   HICL_SEQNO=22,
                   LabelName="fentanyl patch",
                   NDC="22222"

                },
                new spFullTextDrugSearchExt_Frmlry_Result(){
                   GCRT_DESC_Rank=5,
                   BrandName=query,
                   GCN_SEQNO="32",
                   GenericName="fentanyl22",
                   HICL_SEQNO=22,
                   LabelName="fentanyl patch",
                   NDC="22222"

                },
                new spFullTextDrugSearchExt_Frmlry_Result(){
                   GenericName_Rank=5,
                   BrandName=query,
                   GCN_SEQNO="32",
                   GenericName="fentanyl22",
                   HICL_SEQNO=22,
                   LabelName="fentanyl patch",
                   NDC="22222"

                },
                new spFullTextDrugSearchExt_Frmlry_Result(){
                   GTC_DESC_Rank=5,
                   BrandName=query,
                   GCN_SEQNO="32",
                   GenericName="fentanyl22",
                   HICL_SEQNO=22,
                   LabelName="fentanyl patch",
                   NDC="22222"

                },
                new spFullTextDrugSearchExt_Frmlry_Result(){
                   LabelName_Rank=5,
                   BrandName=query,
                   GCN_SEQNO="32",
                   GenericName="fentanyl22",
                   HICL_SEQNO=22,
                   LabelName="fentanyl patch",
                   NDC="22222"

                },
                new spFullTextDrugSearchExt_Frmlry_Result(){
                   NDC_Rank=5,
                   BrandName=query,
                   GCN_SEQNO="32",
                   GenericName="fentanyl22",
                   HICL_SEQNO=22,
                   LabelName="fentanyl patch",
                   NDC="22222"

                },
                new spFullTextDrugSearchExt_Frmlry_Result(){
                   GCN_SEQNO_Rank=5,
                   BrandName=query,
                   GCN_SEQNO="32",
                   GenericName="fentanyl22",
                   HICL_SEQNO=22,
                   LabelName="fentanyl patch",
                   NDC="22222"

                },
            };

            repoFactoryMock
            .Setup(a => a.DrugSearch())
            .Returns(drugRepoMock.Object);

            drugRepoMock
                .Setup(a => a.SmartDrugSearchFormulary(query,frmlrySK, smartDrugSearchColumnSK))
                .Returns(smartSearchResponse);

            Criteria criteria0 = new Criteria()
            {
                Property="BrandName",
                Operator="",
                Value=smartSearchResponse[0].BrandName
            };
            Criteria criteria1 = new Criteria()
            {
                Property = "DosageForm",
                Operator = "",
                Value = smartSearchResponse[1].DosageForm
            };
            Criteria criteria2 = new Criteria()
            {
                Property = "DrugStrength",
                Operator = "",
                Value = smartSearchResponse[2].DrugStrength
            };
            Criteria criteria3 = new Criteria()
            {
                Property = "DrugType",
                Operator = "",
                Value = smartSearchResponse[3].DrugType
            };
            Criteria criteria4 = new Criteria()
            {
                Property = "ETC_NAME",
                Operator = "",
                Value = smartSearchResponse[4].ETC_NAME
            };
            Criteria criteria5 = new Criteria()
            {
                Property = "GCRT_DESC",
                Operator = "",
                Value = smartSearchResponse[5].GCRT_DESC
            };
            Criteria criteria6 = new Criteria()
            {
                Property = "GenericName",
                Operator = "",
                Value = smartSearchResponse[6].GenericName
            };
            Criteria criteria7 = new Criteria()
            {
                Property = "GTC_DESC",
                Operator = "",
                Value = smartSearchResponse[7].GTC_DESC
            };
            Criteria criteria8 = new Criteria()
            {
                Property = "LabelName",
                Operator = "",
                Value = smartSearchResponse[8].LabelName
            };
            Criteria criteria9 = new Criteria()
            {
                Property = "NDC",
                Operator = "",
                Value = smartSearchResponse[9].NDC
            };
            Criteria criteria10 = new Criteria()
            {
                Property = "GCN_SEQNO",
                Operator = "",
                Value = smartSearchResponse[10].GCN_SEQNO
            };

            IDrugSearchColumnExclusionBitmaskGenerator dscebg = new DrugSearchColumnExclusionBitmaskGenerator() { };

            ISearchWhereCriteriaGenerator swcg = new SearchWhereCriteriaGenerator() { };



            DrugSearchBLL bll = new DrugSearchBLL(repoFactoryMock.Object, dscebg, swcg) { };

            // ACT
            var result = bll.FormularyConfigSmartSearch(query,frmlrySK, smartDrugSearchColumnSK);
            var record0 = result.Rows[0];
            var record1 = result.Rows[1];
            var record2 = result.Rows[2];
            var record3 = result.Rows[3];
            var record4 = result.Rows[4];
            var record5 = result.Rows[5];
            var record6 = result.Rows[6];
            var record7 = result.Rows[7];
            var record8 = result.Rows[8];
            var record9 = result.Rows[9];
            var record10 = result.Rows[10];
            
            // ASSERT

            Assert.AreNotEqual(null, result);
            Assert.AreEqual(record0.BrandName, query);
            Assert.AreEqual(record0.GCN, "32");
            Assert.AreEqual(record0.GenericName, "fentanyl22");
            Assert.AreEqual(record0.HICL, "22");
            Assert.AreEqual(record0.LabelName, "fentanyl patch");
            Assert.AreEqual(record0.NDC, "22222");
            Assert.AreEqual(record0.Rule.Property, criteria0.Property);
            Assert.AreEqual(record1.Rule.Property, criteria1.Property);
            Assert.AreEqual(record2.Rule.Property, criteria2.Property);
            Assert.AreEqual(record3.Rule.Property, criteria3.Property);
            Assert.AreEqual(record4.Rule.Property, criteria4.Property);
            Assert.AreEqual(record5.Rule.Property, criteria5.Property);
            Assert.AreEqual(record6.Rule.Property, criteria6.Property);
            Assert.AreEqual(record7.Rule.Property, criteria7.Property);
            Assert.AreEqual(record8.Rule.Property, criteria8.Property);
            Assert.AreEqual(record9.Rule.Property, criteria9.Property);
            Assert.AreEqual(record10.Rule.Property, criteria10.Property);
        }

        [TestMethod]
        public void ShouldHaveFormularyETCTreeResponse()
        {

            //Arrange
            var ETCHierarchyResponse = new List<spETCHierarchy_Get_Result>()
            {
                new spETCHierarchy_Get_Result()
                {
                    
                    ETC_PARENT_ETC_ID=0,
                    ETC_ID=3333,
                    ETC_NAME="Linus"                          
                    
                }
            };
            
            repoFactoryMock
            .Setup(a => a.DrugSearch())
            .Returns(drugRepoMock.Object);   

            drugRepoMock
                .Setup(a => a.FormularyTreeSearch()) 
                .Returns(ETCHierarchyResponse);

            IDrugSearchColumnExclusionBitmaskGenerator dscebg = new DrugSearchColumnExclusionBitmaskGenerator() { };

            ISearchWhereCriteriaGenerator swcg = new SearchWhereCriteriaGenerator() { };

            DrugSearchBLL bll = new DrugSearchBLL(repoFactoryMock.Object, dscebg, swcg) { };

            // ACT
            var result = bll.FormularyEtcTree();
            var record = result.children.FirstOrDefault();

            // ASSERT
            
            Assert.AreNotEqual(null, result);
            Assert.AreEqual(record.PARENT_ETC_ID,ETCHierarchyResponse.FirstOrDefault().ETC_PARENT_ETC_ID );
            Assert.AreEqual(record.ETC_ID, ETCHierarchyResponse.FirstOrDefault().ETC_ID);
            Assert.AreEqual(record.ETC_NAME, ETCHierarchyResponse.FirstOrDefault().ETC_NAME);
            
            
        }

        [TestMethod]
        public void ShouldHaveCorrectDrugSearchResponseException()
        {
            // Arrange
            List<Criteria> queries = new List<Criteria>();
            bitmaskGenMock.Setup(a => a.GenerateBitmask(queries))
                .Throws<ArgumentNullException>();

            bool handledException = false;

            DrugSearchBLL bll = new DrugSearchBLL(repoFactoryMock.Object, bitmaskGenMock.Object, searchWhereCriteriaGenMock.Object) { };

            try
            {
                // Act
                var result = bll.Search(queries, 1, 25, 0, "", "unitTestUsr", true);
            }
            catch (Exception ex)
            {
                // Assert
                Assert.IsInstanceOfType(ex, typeof(ArgumentNullException));
                handledException = true;
            }

            Assert.AreEqual(true, handledException);
        }

        [TestMethod]
        public void ShouldHaveCorrectSmartSearchResponse()
        {
            //ARRANGE
            string mockQuery = "TYLENOL";
            var mockRepoResponse = new List<spFullTextDrugSearchExt_FDB_Result>();
            long smartDrugSearchColumnSK = 1;

            mockRepoResponse.Add(new spFullTextDrugSearchExt_FDB_Result
            {
                BrandName = "TYLENOL 500 MG",
                GCN_SEQNO = "231321312",
                GenericName = "TYLENOL 500 MG",
                HICL_SEQNO = 323,
                LabelName = "TYLENOL 500 MG Extra Strength",
                NDC = "12321434332" 
                
            });

            repoFactoryMock
                .Setup(a => a.DrugSearch())
                .Returns(drugRepoMock.Object);
            drugRepoMock
                .Setup(a => a.SmartDrugSearchFDB(mockQuery, smartDrugSearchColumnSK))
                .Returns(mockRepoResponse);


            IDrugSearchColumnExclusionBitmaskGenerator dscebg = new DrugSearchColumnExclusionBitmaskGenerator() { };

            ISearchWhereCriteriaGenerator swcg = new SearchWhereCriteriaGenerator() { };

            DrugSearchBLL bll = new DrugSearchBLL(repoFactoryMock.Object, dscebg, swcg) { };

            //ACT
            var result = bll.SmartSearch(mockQuery, smartDrugSearchColumnSK);
            var record = result.Rows.FirstOrDefault();

            //ASSERT
            Assert.AreNotEqual(null, record);
            Assert.AreEqual(mockRepoResponse.FirstOrDefault().BrandName, record.BrandName);
            Assert.AreEqual(mockRepoResponse.FirstOrDefault().GCN_SEQNO, record.GCN);
            Assert.AreEqual(mockRepoResponse.FirstOrDefault().GenericName, record.GenericName);
            Assert.AreEqual(mockRepoResponse.FirstOrDefault().HICL_SEQNO, Convert.ToInt32(record.HICL));
            Assert.AreEqual(mockRepoResponse.FirstOrDefault().LabelName, record.LabelName);
            Assert.AreEqual(mockRepoResponse.FirstOrDefault().NDC, record.NDC);

        }
    }
}
