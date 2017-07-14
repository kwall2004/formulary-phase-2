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

namespace Atlas.Formulary.DAL.Test.DrugRefDb
{
    
    [TestClass]
    public class DrugRefDbDALTest
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
        public void ShouldGetDrugRefDB()
        {
            using (var Repo = _formFactory.DrugRefDb())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    //Arrange

                    Atlas.Formulary.DAL.Models.DrugRefDb drugRefDb = new Atlas.Formulary.DAL.Models.DrugRefDb()
                    {
                        DrugRefDbName = "FDB",
                        DrugRefDbSK = 1
                        
                    };

                    var result = new QueryResult<Atlas.Formulary.DAL.Models.DrugRefDb>();
                                
                    //Act
                    var expectedDrugRefDb=Repo.GetDrugRefDb().ToList();
                    result.Count = expectedDrugRefDb.Count();
                    result.Rows = expectedDrugRefDb;

                    //Assert
                    Assert.AreEqual(result.Rows.FirstOrDefault().DrugRefDbName, drugRefDb.DrugRefDbName);
                    Assert.AreEqual(result.Rows.FirstOrDefault().DrugRefDbSK, drugRefDb.DrugRefDbSK);
                    

                }
            }

        }
    }
}
