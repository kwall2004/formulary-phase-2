using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq;
using Atlas.Configuration;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.ViewModels;

using Atlas.Reference.DAL;
using Atlas.Reference.DAL.Models;



namespace Atlas.Formulary.DAL.Test.FormularyExport
{
    [TestClass]
    public class FormularyExportDALTest
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

        [TestMethod]
        public void ShouldFormularyImportStart()
        {
            using (var Repo = _formFactory.FormularyExport())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    //Arrange

                    FormularyImportVM fiVM = new FormularyImportVM()
                    {
                        ImportFilePath="",
                        BatchID=6,
                        FormularySK=4,
                        userID="jrush"
                    
                    };
                    /*
                    spFileImportStart_Result x = new spFileImportStart_Result()
                    {
                        ImportFilePath="",
                        BatchID="",
                        FormularySK="",
                        userID="jrush"
                    };
                    */
                    //Act
                    Repo.FormularyImportStart(fiVM);
                    

                    //Assert

                   
                    


                }
            }
        }

        //TODO: Phase II
        [TestMethod]
        public void ShouldJobExportNDC()
        {
            using (var Repo = _formFactory.FormularyExport())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    //Arrange

                    int expected = 2;

                    long formularySK = 22;
                    string userId = "jrush";  //system
                    long jobTypeSK = 4; //1-5

                    //Act
                    var actualResult = Repo.JobExportNDC(formularySK,userId,jobTypeSK);

                    //Assert
                    Assert.AreEqual(expected, actualResult);
                  

                }
            }
        }
    }
}

   