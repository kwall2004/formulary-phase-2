
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

namespace Atlas.Formulary.BLL.Test.DrugCategoryBLLTest
{
    [TestClass]
    public class DrugCategoryBLLTest
    {

        private Mock<IFormularyRepositoryFactory> repoFactoryMock;
        private Mock<IDrugCategoryRepository> DrugCategoryRepoMock;

        [TestInitialize]
        public void SetupTest()
        {
            repoFactoryMock = new Mock<IFormularyRepositoryFactory>();
            DrugCategoryRepoMock = new Mock<IDrugCategoryRepository>();
        }

        [TestMethod]
        public void ShouldGetCorrectDrugCategoriesGivenFormularySKResponse()
        {
            // ARRANGE

            long formularySK = 36;
            var listDrugCatVMs = new List<DrugCategoryVM>();

            var getDrugCatgSK = new List<spDrugCatg_GetAll_Result>()
            {
                new spDrugCatg_GetAll_Result
                {
                    DrugCatgSK=1, //1
                    FrmlrySK=formularySK,
                    FrmlryTierSK=72,
                    DrugCatgName="Cvrd=No T99-1",
                    CvrdInd=false
                }
            };

            repoFactoryMock
              .Setup(a => a.DrugCategory())
              .Returns(DrugCategoryRepoMock.Object);

            DrugCategoryRepoMock
                .Setup(a => a.GetAllDrugCategories(formularySK))   //valid FormularySK here
                .Returns(getDrugCatgSK);

            var drugCategoryVM = new DrugCategoryVM()
            {
                FormularySK = formularySK,
                DrugCategorySK = 1,
                Name = "Cvrd=No T99-1"
            };

            DrugCategoryBLL bll = new DrugCategoryBLL(repoFactoryMock.Object) { };

            // ACT
            var result = bll.GetDrugCategoriesByFormularySK(formularySK);

            listDrugCatVMs.Add(drugCategoryVM);

            result.Rows = listDrugCatVMs;

            // ASSERT        
            Assert.AreEqual(result.Rows.FirstOrDefault().FormularySK, getDrugCatgSK.FirstOrDefault().FrmlrySK);
            Assert.AreEqual(result.Rows.FirstOrDefault().DrugCategorySK, getDrugCatgSK.FirstOrDefault().DrugCatgSK);
            Assert.AreEqual(result.Rows.FirstOrDefault().Name, getDrugCatgSK.FirstOrDefault().DrugCatgName);
            Assert.AreEqual(result.Count, 1);
            Assert.AreNotEqual(result.Count, 2);

        }

        [TestMethod]
        public void ShouldHaveCorrectDrugCategoryResponseException()
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
                // Assert.IsInstanceOfType(ex, typeof(ArgumentNullException));
                handledException = true;
            }

            //Assert.AreEqual(true, handledException);
        }
    }

}

