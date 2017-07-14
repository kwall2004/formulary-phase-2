
using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Atlas.Formulary.BLL.DrugCategory;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.Repositories.Interfaces;
using System.Linq;
using Atlas.Formulary.DAL.Models;
using System.Collections.Generic;
using Atlas.Core.DAL.Models.Containers;
using Atlas.Formulary.DAL.ViewModels;
using Atlas.Formulary.BLL.DrugSearch;
using Atlas.Formulary.BLL.DrugCriteria;

namespace Atlas.Formulary.BLL.Test.DrugCriteriaBLLTest
{
    [TestClass]
    public class DrugCriteriaBLLTest
    {
        
        private Mock<IFormularyRepositoryFactory> repoFactoryMock;
        private Mock<IDrugCategoryRepository> DrugCriteriaRepoMock;

        [TestInitialize]
        public void SetupTest()
        {
            repoFactoryMock = new Mock<IFormularyRepositoryFactory>();
            DrugCriteriaRepoMock = new Mock<IDrugCategoryRepository>();
            
        }

        [TestMethod]
        public void ShouldGetDrugCategoryCriteriaResponse()
        {
            // ARRANGE
            //var criterias = new List<Criteria>();

            int drugCategorySK = 1;
            var getDrugCritSK = new List<spDrugCatgCrtriaGrp_Get_Result>()
            {
                new spDrugCatgCrtriaGrp_Get_Result
                {
                    ValQulfrCode="NDC",
                    OperTypeCode="AND",
                    CrtriaPrity=0,
                    CrtriaVal="6331"
                }
            };

            repoFactoryMock
               .Setup(a => a.DrugCategory())
               .Returns(DrugCriteriaRepoMock.Object);

            DrugCriteriaRepoMock
                .Setup(a => a.GetDrugCategoryCriteria(drugCategorySK))   //valid drugCategorySK here
                .Returns(getDrugCritSK);

           
            DrugCriteriaBLL bll = new DrugCriteriaBLL(repoFactoryMock.Object) { };

            // ACT
            var result = bll.GetCriteriaForDrugCategorySK(drugCategorySK);
                  
            // ASSERT        
            Assert.AreEqual(result.Rows.FirstOrDefault().Operator, getDrugCritSK.FirstOrDefault().OperTypeCode);
            Assert.AreEqual(result.Rows.FirstOrDefault().Property, getDrugCritSK.FirstOrDefault().ValQulfrCode);
            Assert.AreEqual(result.Rows.FirstOrDefault().Value, getDrugCritSK.FirstOrDefault().CrtriaVal);
            Assert.AreEqual(result.Count, 1);
            Assert.AreNotEqual(result.Count, 2);

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
                //TODO test exception handling
                //var result = bll.Object.GetFormulariesForNDC(ndc);
            }
            catch (Exception ex)
            {
                // Assert
                Assert.IsInstanceOfType(ex, typeof(ArgumentNullException));
                handledException = true;
            }

            Assert.AreEqual(true, handledException);
        }
    }
}
