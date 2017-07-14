using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Atlas.Configuration;
using Atlas.Reference.DAL;
using Atlas.Reference.DAL.Models;
using Atlas.Core.WebApi.Services;
using Atlas.Core.DAL.Models.Containers;
using System.Collections.Generic;
using System.Linq;

namespace Atlas.Formulary.DAL.Test.DrugDetail
{
    [TestClass]
    public class DrugDetailDALTest
    {

        private IConfig _config;
        private IReferenceRepositoryFactory _refFactory;
        private ReferenceEntities _refEntities;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        /// <summary>
        /// Sets up.
        /// </summary>
        [TestInitialize]
        public void SetUp()
        {
            _config = new FormularyDevConfig();
            _refEntities = new ReferenceEntities(_config);
            _refFactory = new ReferenceRepositoryFactory(_refEntities);
            //_exceptionResponseGenerator = exceptionResponseGenerator;

        }

        [TestMethod]
        public void ShouldGetMissingNDCFdb()
        {

            using (var Repo = _refFactory.MedispanDrugList())
            {
                using (var ndcTypeRepo = _refFactory.NDCType())
                {
                    //Arrange               

                    MedispanDrugList result1 = new MedispanDrugList()
                    {
                        NDC = "17191003500",
                       // EffectiveDate = "",
                        GPI = "90920000003200",
                        GPIName =  null,                                           
                        GenericName = null,
                        LabelName = "0.2 MICRON FILTER ATTACHMNT",
                        OTC = null, 
                        IsObsolete = null,
                        RouteAdministration = null, 
                        DosageForm = null,
                        DrugType = null, 
                        AHFS = null,
                        DrugStrength = null,
                        PackageSize = null,
                        NDCTypeSK=1
                    };

                    MedispanDrugList result2 = new MedispanDrugList()
                    {
                        NDC = "00045012215",
                        // = "",
                        GPI = "43991002100317",
                        GPIName = null,
                        GenericName = null,
                        LabelName = "INFANT'S TYLENOL SUSP DROP",
                        OTC = null,
                        IsObsolete = null,
                        RouteAdministration = null,
                        DosageForm = null,
                        DrugType = null,
                        AHFS = null,
                        DrugStrength = null,
                        PackageSize = null,
                        NDCTypeSK=1
                    };


                    List<MedispanDrugList> list = new List<MedispanDrugList>();

                    list.Add(result2);
                    list.Add(result1);

                    var result = new QueryResult<MedispanDrugList>();

                    //Act
                    var actualNdcTypes = ndcTypeRepo.GetNdcType("FDB");
                    var matches = Repo.FindAll(types => types.NDCTypeSK == actualNdcTypes.NDCTypeSK).ToList();
                    if (matches.Count() > 0)
                    {
                        result.Count = matches.Count();
                        result.Rows = matches;
                    }

                    //Assert.AreEqual(result.Rows.FirstOrDefault().NDC, expectedMissingNDCMedispanSearch.NDC);
                    Assert.AreEqual(result.Rows.FirstOrDefault().NDC, list.FirstOrDefault().NDC);
                    //Assert.AreEqual(result.Rows.FirstOrDefault().EffectiveDate, list.FirstOrDefault().EffectiveDate);
                    Assert.AreEqual(result.Rows.FirstOrDefault().GPI, list.FirstOrDefault().GPI);
                    Assert.AreEqual(result.Rows.LastOrDefault().GPIName, list.LastOrDefault().GPIName);
                    Assert.AreEqual(result.Rows.LastOrDefault().GenericName, list.LastOrDefault().GenericName);
                    Assert.AreEqual(result.Rows.LastOrDefault().LabelName, list.LastOrDefault().LabelName);
                    Assert.AreEqual(result.Rows.LastOrDefault().OTC, list.LastOrDefault().OTC);
                    Assert.AreEqual(result.Rows.LastOrDefault().IsObsolete, list.LastOrDefault().IsObsolete);
                    Assert.AreEqual(result.Rows.LastOrDefault().RouteAdministration, list.LastOrDefault().RouteAdministration);
                    Assert.AreEqual(result.Rows.LastOrDefault().DosageForm, list.LastOrDefault().DosageForm);
                    Assert.AreEqual(result.Rows.LastOrDefault().DrugType, list.LastOrDefault().DrugType);
                    Assert.AreEqual(result.Rows.LastOrDefault().AHFS, list.LastOrDefault().AHFS);
                    Assert.AreEqual(result.Rows.LastOrDefault().DrugStrength, list.LastOrDefault().DrugStrength);
                    Assert.AreEqual(result.Rows.LastOrDefault().PackageSize, list.LastOrDefault().PackageSize);
                }
            }
        }
    }
}