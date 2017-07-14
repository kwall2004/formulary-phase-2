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
using System.Linq.Expressions;

namespace Atlas.Formulary.DAL.Test.MedispanDrugSearch
{
    [TestClass]
    public class MedispanDrugSearchDALTest
    {

        private IConfig _config;
        private FormularyEntities _formularyEntities;
        private IFormularyRepositoryFactory _formFactory;

        private IReferenceRepositoryFactory _refFactory;
        private ReferenceEntities _refEntities;

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
        /*
        //TODO: Phase II
        [TestMethod]
        public void ShouldFindAllMedispanDrugLists()
        {
            using (var Repo = _formFactory.MedispanDrugSearch())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    //Arrange
                    string NDC = "00000000000";
                    MedispanDrugList expectedFormByNDC = new MedispanDrugList()
                    {
                       

                    };

                    var result = new IQueryable<MedispanDrugList>();

                    //Act
                    var actualFByNDC = Repo.FindAll().ToList();
                    result.Count = actualFByNDC.Count();
                    result.Rows = actualFByNDC;

                    //Assert

                    Assert.AreEqual(result.Rows.FirstOrDefault().FrmlryName, expectedFormByNDC.FrmlryName);
                    Assert.AreEqual(result.Rows.FirstOrDefault().FrmlryID, expectedFormByNDC.FrmlryID);
                    Assert.AreEqual(result.Rows.FirstOrDefault().TierNbr, expectedFormByNDC.TierNbr);
                    Assert.AreEqual(result.Rows.FirstOrDefault().EfctvStartDt, expectedFormByNDC.EfctvStartDt);
                    Assert.AreEqual(result.Rows.FirstOrDefault().FrmlryVer, expectedFormByNDC.FrmlryVer);
                    // Assert.AreEqual(result.Rows.FirstOrDefault().ApprovedDate, expectedFormByNDC.ApprovedDate);


                }
            }
        }
        */


        //TODO : Figure out why not showing up in CC report
        //[TestMethod]
        //public void ShouldFindOneMedispanDrugList()
        //{
        //    using (var Repo = _formFactory.MedispanDrugSearch())
        //    {
        //        using (var fdbRepo = _refFactory.MedispanDrugList())
        //        {
        //            //Arrange
                   
        //            Expression<Func<MedispanDrugList, bool>> where = a=> a.NDC =="00002120001";
        //            MedispanDrugList mDL = new MedispanDrugList()
        //            {
        //               NDC="00002120001",
        //               EffectiveDate=new DateTime(2016,07,28,00,00,00),
        //               GPI= "94352530002020",
        //               GPIName=null,
        //               GenericName= "Florbetapir F 18 IV Soln 500-1900 MBq/ML (13.5-51 mCi/ML)   ",
        //               LabelName= "AMYVID                                                      ",
        //               OTC=0,
        //               IsObsolete=0,
        //               RouteAdministration= "Intravenous                             ",
        //               DosageForm= "Liquid                                  ",
        //               DrugType= "SSB",
        //               AHFS= "780000",
        //               DrugStrength= "0.00000            ",
        //               PackageSize= "1.000 EA",
        //               ObsoleteDate=null,
        //               NDCTypeSK=2,
        //               UnitPrice=null
                 

        //            };
                 
        //            //Act
        //            var actualFByNDC = fdbRepo.FindAll(where).FirstOrDefault();

        //            //Assert
        //            Assert.AreEqual(actualFByNDC.NDC, mDL.NDC);
        //            Assert.AreEqual(actualFByNDC.EffectiveDate, mDL.EffectiveDate);
        //            Assert.AreEqual(actualFByNDC.GPI, mDL.GPI);
        //            Assert.AreEqual(actualFByNDC.GPIName, mDL.GPIName);
        //            Assert.AreEqual(actualFByNDC.GenericName, mDL.GenericName);
        //            Assert.AreEqual(actualFByNDC.LabelName, mDL.LabelName);
        //            Assert.AreEqual(actualFByNDC.OTC, mDL.OTC);
        //            Assert.AreEqual(actualFByNDC.IsObsolete, mDL.IsObsolete);
        //            Assert.AreEqual(actualFByNDC.RouteAdministration, mDL.RouteAdministration);
        //            Assert.AreEqual(actualFByNDC.DosageForm, mDL.DosageForm);
        //            Assert.AreEqual(actualFByNDC.DrugType, mDL.DrugType);
        //            Assert.AreEqual(actualFByNDC.AHFS, mDL.AHFS);
        //            Assert.AreEqual(actualFByNDC.DrugStrength, mDL.DrugStrength);
        //            Assert.AreEqual(actualFByNDC.PackageSize, mDL.PackageSize);
        //            Assert.AreEqual(actualFByNDC.ObsoleteDate, mDL.ObsoleteDate);
        //            Assert.AreEqual(actualFByNDC.NDCTypeSK, mDL.NDCTypeSK);
        //            Assert.AreEqual(actualFByNDC.UnitPrice, mDL.UnitPrice);
                    
        //        }
        //    }
        //}

        //TODO: Phase II
        //[TestMethod]
        //public void ShouldGetDrugListMedispan()
        //{
        //    using (var Repo = _formFactory.MedispanDrugSearch())
        //    {
        //        using (var fdbRepo = _refFactory.MedispanDrugList())
        //        {
        //            //Arrange

        //            string whereCriteria = "";
        //            long bitmask = 0010000001000010;
        //            long? formularySK = 333;
        //            string orderByClasue = "";
        //            int? startIndex = 0;
        //            int? count = 100;
        //            string userId = "jsmith";
        //            bool? criteriaChange = true;
        //            string gpi_ID = "";
        //            Guid? sessionId = new System.Guid("F2A9BD80-CDCA-4996-B267-8081A5207C8B");
        //            string NDC = "00000000000";
        //            spDrugListSearchMedispan_Result x = new spDrugListSearchMedispan_Result()
        //            {
        //               UserId="jsmith",
        //               NDC="00002120001",
        //               GPI="943525300002020",
        //               GPIName=null,
        //               GenericName= "Florbetapir F 18 IV Soln 500-1900 MBq/ML (13.5-51 mCi/ML)   ",
        //               LabelName= "AMYVID                                                      ",
        //               DrugType= "SSB",
        //               OTC=false,
        //               DrugStrength= "0.00000            ",
        //               DosageForm= "Liquid                                  ",
        //               RouteAdministration= "Intravenous                             ",
        //               PackageSize= "1.000 EA",
        //               IsObsolete= false,
        //               ObsoleteDate=null,
        //               AHFS= "780000",
        //               //IsCovered="",
        //               //TierCode="",
        //               //IsSpecialtyDrug="",
        //               //RowCount=""

        //            };

        //            var result = new QueryResult<spDrugListSearchMedispan_Result>();
                    

        //            //Act
        //            var actualDrugListMed = Repo.GetDrugListMedispan(whereCriteria,bitmask,formularySK,orderByClasue,startIndex,count,userId,criteriaChange,gpi_ID,sessionId).ToList();
        //            result.Count = actualDrugListMed.Count();
        //            result.Rows = actualDrugListMed;

        //            //Assert

        //            Assert.AreEqual(actualDrugListMed.FirstOrDefault().UserId, x.UserId);
        //            Assert.AreEqual(actualDrugListMed.FirstOrDefault().NDC, x.NDC);
        //            Assert.AreEqual(actualDrugListMed.FirstOrDefault().GPI, x.GPI);
        //            Assert.AreEqual(actualDrugListMed.FirstOrDefault().GPIName, x.GPIName);
        //            Assert.AreEqual(actualDrugListMed.FirstOrDefault().GenericName, x.GenericName);
        //            Assert.AreEqual(actualDrugListMed.FirstOrDefault().LabelName, x.LabelName);
        //            Assert.AreEqual(actualDrugListMed.FirstOrDefault().DrugType, x.DrugType);
        //            Assert.AreEqual(actualDrugListMed.FirstOrDefault().OTC, x.OTC);
        //            Assert.AreEqual(actualDrugListMed.FirstOrDefault().DrugStrength, x.DrugStrength);
        //            Assert.AreEqual(actualDrugListMed.FirstOrDefault().DosageForm, x.DosageForm);
        //            Assert.AreEqual(actualDrugListMed.FirstOrDefault().RouteAdministration, x.RouteAdministration);
        //            Assert.AreEqual(actualDrugListMed.FirstOrDefault().PackageSize, x.PackageSize);
        //            Assert.AreEqual(actualDrugListMed.FirstOrDefault().IsObsolete, x.IsObsolete);
        //            Assert.AreEqual(actualDrugListMed.FirstOrDefault().ObsoleteDate, x.ObsoleteDate);
        //            Assert.AreEqual(actualDrugListMed.FirstOrDefault().AHFS, x.AHFS);
        //            //Assert.AreEqual(actualDrugListMed.FirstOrDefault().IsCovered, x.IsCovered);
        //            //Assert.AreEqual(actualDrugListMed.FirstOrDefault().TierCode, x.TierCode);
        //            //Assert.AreEqual(actualDrugListMed.FirstOrDefault().IsSpecialtyDrug, x.IsSpecialtyDrug);
        //            //Assert.AreEqual(actualDrugListMed.FirstOrDefault().RowCount, x.RowCount);

        //        }
        //    }
        //}
    }
}
