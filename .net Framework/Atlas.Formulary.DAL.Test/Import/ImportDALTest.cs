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
namespace Atlas.Formulary.DAL.Test.Import
{
    [TestClass]
    public class ImportDALTest

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

        //TODO: Phase II
        [TestMethod]
        public void ShouldPerformJobImport()
        {

            using (var Repo = _formFactory.Import())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    //Arrange
                    long JobTypeSK = 1;
                    ImportVM dL = new ImportVM()
                    {                       
                        FilePath="",
                        FrmlrySK=4,
                        DrugListSK=1,
                        UserId="jsmith"
                    };
                    int expectedResult = 2;
                  
                    //Act
                    int actualResult = Repo.JobImport(dL,JobTypeSK);
                    

                    //Assert

                    Assert.AreEqual(actualResult, expectedResult );
                    


                }
            }
        }
    }
}
