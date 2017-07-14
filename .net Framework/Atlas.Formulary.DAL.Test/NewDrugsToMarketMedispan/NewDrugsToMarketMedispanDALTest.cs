using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Atlas.Core.WebApi.Services;
using Atlas.Configuration;
using Atlas.Formulary.DAL.Models;
using Atlas.Reference.DAL.Models;
using Atlas.Reference.DAL;
using System.Collections.Generic;
using System.Linq;

namespace Atlas.Formulary.DAL.Test.NewDrugsToMarketMedispan
{
    [TestClass]
    public class NewDrugstoMarketDALTest

    {
        private IConfig _config;
        private FormularyEntities _formularyEntities;
        private IFormularyRepositoryFactory _FormulryRepoFactory;
       

        /// <summary>
        /// Sets up.
        /// </summary>
        [TestInitialize]
        public void SetUp()
        {

            _config = new FormularyDevConfig();
            _formularyEntities = new FormularyEntities(_config);
            _FormulryRepoFactory = new FormularyRepositoryFactory(_config, _formularyEntities);

        }

        [TestMethod]
        public void GetnewDrugstoMarketMedispan()
        {
            using (var repo = _FormulryRepoFactory.NewDrugsToMarket())
            {
                //Arrange
                System.DateTime fromDate = new DateTime (2017,02,24);
                System.DateTime thruDate = new DateTime (2017, 05, 24);
                string drugType = null;  //MSB or SSB
                string gpiId = null;

                spNewDrugsToMarket_Medispan_Get_Result result1 = new spNewDrugsToMarket_Medispan_Get_Result
                {
                    NDC = "00310828060",
                    GPI = "59153070107505",
                    LabelName = "QUETIAPINE FUMARATE ER                                      ",                                                      
                    MedId = null,
                    BrandName = null,
                    GenericName = "Quetiapine Fumarate Tab SR 24HR 50 MG                       ",
                    DrugStrength = "50.00000 MG         ",
                    DateToMarket = new DateTime(2017,5,4,0,0,0),
                    LinkToFormularies = "Associated Formularies"
                };


                spNewDrugsToMarket_Medispan_Get_Result result2 = new spNewDrugsToMarket_Medispan_Get_Result
                {
                    NDC = "00310828060",
                    GPI = "59153070107505",
                    LabelName = "sdsdsdd", 
                    MedId = null,
                    BrandName = null,
                    GenericName ="sdsds",
                    DrugStrength ="wddddd",
                    DateToMarket = new DateTime(2017,5,4,0,0,0),
                    LinkToFormularies = "Associated Formularies" 
                };

                List<spNewDrugsToMarket_Medispan_Get_Result> list = new List<spNewDrugsToMarket_Medispan_Get_Result>();
                list.Add(result1);
                list.Add(result2);
                
                //Act
                var actualResult = repo.GetNewDrugsToMarketMedispan(fromDate, thruDate, drugType, gpiId);

                //Assert
               
                Assert.AreEqual(actualResult.FirstOrDefault().NDC, list.FirstOrDefault().NDC);
                Assert.AreEqual(actualResult.FirstOrDefault().GPI, list.FirstOrDefault().GPI);
                Assert.AreEqual(actualResult.FirstOrDefault().LabelName, list.FirstOrDefault().LabelName);
                Assert.AreEqual(actualResult.FirstOrDefault().MedId, list.FirstOrDefault().MedId);
                Assert.AreEqual(actualResult.FirstOrDefault().BrandName, list.FirstOrDefault().BrandName);
                Assert.AreEqual(actualResult.FirstOrDefault().GenericName, list.FirstOrDefault().GenericName);
                Assert.AreEqual(actualResult.FirstOrDefault().DrugStrength, list.FirstOrDefault().DrugStrength);
                Assert.AreEqual(actualResult.FirstOrDefault().DateToMarket, list.FirstOrDefault().DateToMarket);
                Assert.AreEqual(actualResult.FirstOrDefault().LinkToFormularies, list.FirstOrDefault().LinkToFormularies);

            }


        }
    }
}
