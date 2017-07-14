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

namespace Atlas.Formulary.DAL.Integration.Test.FormularyExport
{
    [TestClass]
    public class FormularyExportIT
    {
        private IConfig _config;
        private FormularyEntities _formularyEntities;
        private IFormularyRepositoryFactory _formFactory;

        private IReferenceRepositoryFactory _refFactory;
        private ReferenceEntities _refEntities;


        private long drugCategoryID;
        private spCoverageProperties_Get_Result drugCoverage;
        private DrugCatgCrtriaGrp drugCategoryCriteria;
        private long formularySK;
        private long drugCategorySk;
        private long formularyTierSK;

        private PagedRequestVM pagedRequest;
        private string userID;
        private Guid x;
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

            InitializeParemeters();
        }

        public void InitializeParemeters()
        {
            drugCategoryID = 33;
            drugCoverage = new spCoverageProperties_Get_Result(





                                                                );
            drugCategoryCriteria = new DrugCatgCrtriaGrp();
            formularySK = 222;
            drugCategorySk = 44;
            formularyTierSK = 33;

            pagedRequest = new PagedRequestVM();
            userID = "mkern";
            x = new Guid();


        }




        [TestMethod]
        public void Create()
        {

            using (var Repo = _formFactory.FormularyExport())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {


                    Assert.AreEqual(1, 1);
                }
            }
        }

        [TestMethod]
        public void GetByID()
        {

            using (var Repo = _formFactory.FormularyExport())
            using (var fdbRepo = _refFactory.FDBDrugList())
            {

                Assert.AreEqual(1, 1);

            }

        }


        [TestMethod]
        public void GetAll()
        {
            using (var Repo = _formFactory.FormularyExport())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {

                    Assert.AreEqual(1, 1);

                }
            }
        }

        [TestMethod]
        public void Update()
        {
            using (var Repo = _formFactory.FormularyExport())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {

                    Assert.AreEqual(1, 1);

                }
            }
        }

        [TestMethod]
        public void Delete()
        {
            using (var Repo = _formFactory.FormularyExport())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {

                    Assert.AreEqual(1, 1);

                }
            }

        }
    }
}
