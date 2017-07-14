using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Atlas.Formulary.BLL.CustomNDC;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.Repositories.Interfaces;
using System.Linq;
using Atlas.Formulary.DAL.Models;
using System.Collections.Generic;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Formulary.DAL.ViewModels;

namespace Atlas.Formulary.BLL.Test.CustomNDCBLLTest
{
    [TestClass]
    public class CustomNDCBLLTest
    {
        
        private Mock<IFormularyRepositoryFactory> _repoFactoryMock;

        private Mock<ICustomNdcRepository> _CustomNDCRepoMock;

        [TestInitialize]
        public void SetupTest()
        {
            _repoFactoryMock = new Mock<IFormularyRepositoryFactory>();
            _CustomNDCRepoMock = new Mock<ICustomNdcRepository>();           
        }

        [TestMethod]
        public void ShouldHaveCorrectFormulariesByCustomNDCResponse()
        {
            // ARRANGE
            
            string ndc = "66647413511";
            var getFormulariesByNDCresponse = new List<spCustomNDC_GetFormularies_Result>()
            {
                new spCustomNDC_GetFormularies_Result()
                {
                    TenantOwner="CharlieBrown",
                    FormularySK = 122334432333333,
                    FormularyId = "122334455667",
                    FormularyVersion = 112,
                    FrmlryName = "SSB",
                    EfctvStartDt = new DateTime(2011,1,1)

                },
                new spCustomNDC_GetFormularies_Result()
                {
                    TenantOwner="JoeBrown",
                    FormularySK = 121,
                    FormularyId = "150",
                    FormularyVersion = 3,
                    FrmlryName = "Joe's Formulary",
                    EfctvStartDt = new DateTime(2015,1,1)

                }
            };

            _repoFactoryMock
              .Setup(a => a.CustomNDC())
              .Returns(_CustomNDCRepoMock.Object);

            _CustomNDCRepoMock
                .Setup(a => a.GetFormulariesByNDC(ndc))
                .Returns(getFormulariesByNDCresponse);

            CustomNDCBLL bll = new CustomNDCBLL(_repoFactoryMock.Object);
            // ACT
            var result = bll.GetFormulariesForNDC(ndc);

            // ASSERT
            var record = result.FirstOrDefault();

            Assert.AreEqual(2, result.Count);
            Assert.AreNotEqual(null, record);

            Assert.AreEqual(record.TenantOwner, getFormulariesByNDCresponse[0].TenantOwner);
            Assert.AreEqual(record.Formularies.FirstOrDefault().FormularySK, 122334432333333);
            Assert.AreEqual(record.Formularies.FirstOrDefault().FormularyId, "122334455667");
            Assert.AreEqual(record.Formularies.FirstOrDefault().FormularyVersion, 112);
            Assert.AreEqual(record.Formularies.FirstOrDefault().FrmlryName, "SSB");
            Assert.AreEqual(record.Formularies.FirstOrDefault().EfctvStartDt, new DateTime(2011, 1, 1));
           
        }

        [TestMethod]
        public void ShouldHaveCorrectCustomNDCResponseException()
        {
            // Arrange
            
            bool handledException = false;
            string ndc = "11111111111";
            try
            {
                // Act
               // var result = bll.Object.GetFormulariesForNDC(ndc);
            }
            catch (Exception ex)
            {
                // Assert
                Assert.IsInstanceOfType(ex, typeof(NullReferenceException));
                handledException = true;
            }

           // Assert.AreEqual(true, handledException);
        }
    }
}
