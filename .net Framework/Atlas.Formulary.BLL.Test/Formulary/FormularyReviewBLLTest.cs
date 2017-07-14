//TODO: Work with Matt 
//using System;
//using Microsoft.VisualStudio.TestTools.UnitTesting;
//using Moq;
//using Atlas.Formulary.BLL.Formulary;
//using Atlas.Formulary.DAL.Repositories.Interfaces;
//using System.Linq;
//using System.Collections.Generic;
//using Atlas.Core.DAL.Models.Containers;
//using Atlas.Formulary.DAL.ViewModels;
//using Atlas.Formulary.DAL.Models;
//using Atlas.Formulary.DAL;

//namespace Atlas.Formulary.BLL.Test.Formulary
//{
//    [TestClass]
//    public class FormularyReviewBLLTest
//    {
//        private Mock<FormularyReviewBLL> bll;
//        private Mock<IFormularyRepositoryFactory> repoFactoryMock;

//        private Mock<IFormularyRepositoryFactory> FormularyReviewRepoMock;

//        [TestInitialize]
//        public void SetupTest()
//        {
//            repoFactoryMock = new Mock<IFormularyRepositoryFactory>();
//            FormularyReviewRepoMock = new Mock<IFormularyRepositoryFactory>();

//            bll = new Mock<FormularyReviewBLL>(repoFactoryMock.Object)
//            {
//                CallBase = true
//            };
//        }

//        [TestMethod]
//        public void ShouldGetFormularyReviewResponse()
//        {
//            // ARRANGE


//            int formularySK = 42;
//            var getFormularyReviewresponse = new List<spFormularyReview_Get_Result>()
//            {
//                new spFormularyReview_Get_Result()
//                {
//                    FrmlryChanges="CharlieBrown",
//                    NDC = "122334432333333L",
//                    ETC_ID = null,
//                    ETC_NAME = "112",
//                    HICL_SEQNO = null,
//                    GenericName = "Bork",
//                    BrandName="Matt",
//                    LabelName="sam",
//                    MedId=null,
//                    DrugType="EEC",
//                    OTC="ss",
//                    DrugStrength="strong",
//                    DosageForm="eec",
//                    RouteAdministration="oral",
//                    PackageSize="small"
                    
//                }
//            };

          
          
//            FormularyReviewRepoMock
//                .Setup(a => a.GetFormularyReview(formularySK, 
//                                                null,
//                                                null,
//                                                null,
//                                                null,
//                                                null))
//                .Returns(getFormularyReviewresponse);

//            repoFactoryMock
//               .Setup(a => a.FormularyReview())
//               .Returns(FormularyReviewRepoMock.Object);

//            // ACT
//            var result = bll.Object.GetFormularyReview(formularySK,null,null,null,null);


//            // ASSERT
//            var record = result.FirstOrDefault();

//            Assert.AreEqual(1, result.Count);
//            Assert.AreNotEqual(null, record);
//            Assert.AreEqual(record.FrmlryChanges,"CharlieBrown");
//            Assert.AreEqual(record.NDC, "122334432333333L");
//            Assert.AreEqual(record.ETC_ID, null);
//            Assert.AreEqual(record.ETC_NAME, "112");
//            Assert.AreEqual(record.HICL_SEQNO, null);
//            Assert.AreEqual(record.GenericName, "Bork");
//            Assert.AreEqual(record.BrandName, "Matt");
//            Assert.AreEqual(record.LabelName, "sam");
//            Assert.AreEqual(record.MedId, null);
//            Assert.AreEqual(record.DrugType,"EEC");
//            Assert.AreEqual(record.OTC, "ss");
//            Assert.AreEqual(record.DrugStrength, "strong");
//            Assert.AreEqual(record.DosageForm, "eec");
//            Assert.AreEqual(record.RouteAdministration, "oral");
//            Assert.AreEqual(record.PackageSize, "small");
//        }

//        [TestMethod]
//        public void ShouldGetFormularyETCTree()
//        {
            
//            int formularySK = 42;
//            var getFormularyReviewETCresponse = new List<spFormularyReview_ETC_Result>()
//            {
//                new spFormularyReview_ETC_Result()
//                {
//                    ETC_PARENT_ETC_ID=0,
//                    ETC_ID=11112,
//                    ETC_NAME="sam0"

//                },
//                new spFormularyReview_ETC_Result()
//                {
//                    ETC_PARENT_ETC_ID=5,
//                    ETC_ID=11113,
//                    ETC_NAME="sam5"

//                },
//                new spFormularyReview_ETC_Result()
//                {
//                    ETC_PARENT_ETC_ID=7,
//                    ETC_ID=11114,
//                    ETC_NAME="sam7"

//                }
//            };

//            FormularyReviewRepoMock
//                .Setup(a => a.FormularyReview_ETC(formularySK))
//                .Returns(getFormularyReviewETCresponse);

//            repoFactoryMock
//               .Setup(a => a.FormularyReview())
//               .Returns(FormularyReviewRepoMock.Object);

//            // ACT
//            var result = bll.Object.FormularyEtcTree(formularySK);

//            // ASSERT
//            var record = result.children.FirstOrDefault();
     
//            //Assert.AreEqual(0, result.children.Count());
//            Assert.AreNotEqual(null, record);
//            Assert.AreEqual(record.PARENT_ETC_ID, 0);
//            Assert.AreEqual(record.ETC_ID, 11112);
//            Assert.AreEqual(record.ETC_NAME, "sam0");
           
//        }
    

//        [TestMethod]
//        public void ShouldGetFormularyAHFSTree()
//        {
        
//            int formularySK = 42;
//            var getFormularyReviewAHFSresponse = new List<spFormularyReview_AHFS_Result>()
//                {
//                    new spFormularyReview_AHFS_Result()
//                    {
//                        AHFS_ParentId="0",
//                        AHFS_Id = "11230",
//                        AHFS_Name = "whataboutBob0"                                  
//                    },
//                    new spFormularyReview_AHFS_Result()
//                    {
//                        AHFS_ParentId="5",
//                        AHFS_Id = "11235",
//                        AHFS_Name = "whataboutBob5"
//                    },
//                    new spFormularyReview_AHFS_Result()
//                    {
//                        AHFS_ParentId="7",
//                        AHFS_Id = "11237",
//                        AHFS_Name = "whataboutBob7"
//                    }
//                };

//            FormularyReviewRepoMock
//                .Setup(a => a.FormularyReview_AHFS(formularySK))                                        
//                .Returns(getFormularyReviewAHFSresponse);

//            repoFactoryMock
//               .Setup(a => a.FormularyReview())
//               .Returns(FormularyReviewRepoMock.Object);

//            // ACT
//            var result = bll.Object.FormularyAhfsTree(formularySK);


//            // ASSERT
//            var record = result.children.FirstOrDefault();

//            Assert.AreEqual(1, result.children.Count());
//            Assert.AreNotEqual(null, record);
//            Assert.AreEqual(record.AHFS_ParentId, "0");
//            Assert.AreEqual(record.AHFS_Id, "11230");
//            Assert.AreEqual(record.AHFS_Name, "whataboutBob0");
           
//        }

//        [TestMethod]
//        public void ShouldHaveCorrectCustomNDCResponseException()
//        {
//            // Arrange


//            bool handledException = false;
//            string ndc = "11111111111";
//            try
//            {
//                // Act
//               // var result = bll.Object.GetFormulariesForNDC(ndc);
//            }
//            catch (Exception ex)
//            {
//                // Assert
//                Assert.IsInstanceOfType(ex, typeof(ArgumentNullException));
//                handledException = true;
//            }

//            Assert.AreEqual(true, handledException);
//        }
//    }
//}
