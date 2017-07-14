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
using System.Data.Entity;

namespace Atlas.Formulary.DAL.Test.DrugThrputClsType
{
    [TestClass]
    public class DrugThrputClsTypeDALTest
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
        public void ShouldGetDrugThroughputClassType()
        {
            using (var Repo = _formFactory.DrugThrputcClsType())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {


                    //Arrange
                    Atlas.Formulary.DAL.Models.DrugThrputcClsType drugThruClsTypeRow = new Atlas.Formulary.DAL.Models.DrugThrputcClsType()
                    {
                        DrugThrputcClsTypeCode = "AHFS2",
                        DrugThrputcClsTypeDesc = "American Hospital Formulary Service2",
                        EfctvStartDt =new DateTime(2016,8,18,00,00,00),
                        EfctvEndDt=new DateTime(2016, 8,18, 00,00,00),
                        CreatedBy="jrush",
                        CreatedTs=new DateTime(2016,8,18,15,25,20),
                        LastModfdBy="jrush",
                        LastModfdTs=new DateTime(2016,8,18,15,25,20),
                        InctvTs=null,
                        DelTs=null
                        
                    };
                    
                    _formularyEntities.DrugThrputcClsType.Attach(drugThruClsTypeRow);
                    _formularyEntities.Entry(drugThruClsTypeRow).State = drugThruClsTypeRow.DrugThrputcClsTypeSK == 0 ? EntityState.Added : EntityState.Modified;
                    _formularyEntities.SaveChanges();

                    var result = new QueryResult<Atlas.Formulary.DAL.Models.DrugThrputcClsType>();

                    //Act
                    var expectedDrugRefDb = Repo.GetDrugThrputcClsType().ToList();
                    result.Count = expectedDrugRefDb.Count();
                    result.Rows = expectedDrugRefDb;

                    //Assert
                    Assert.AreEqual(result.Rows.LastOrDefault().DrugThrputcClsTypeCode, drugThruClsTypeRow.DrugThrputcClsTypeCode);
                    Assert.AreEqual(result.Rows.LastOrDefault().DrugThrputcClsTypeDesc, drugThruClsTypeRow.DrugThrputcClsTypeDesc);
                    Assert.AreEqual(result.Rows.LastOrDefault().EfctvStartDt, drugThruClsTypeRow.EfctvStartDt);
                    Assert.AreEqual(result.Rows.LastOrDefault().EfctvEndDt, drugThruClsTypeRow.EfctvStartDt);
                    Assert.AreEqual(result.Rows.LastOrDefault().CreatedBy, drugThruClsTypeRow.CreatedBy);                   
                    Assert.AreEqual(result.Rows.LastOrDefault().LastModfdBy, drugThruClsTypeRow.LastModfdBy);
                    Assert.AreEqual(result.Rows.LastOrDefault().InctvTs, drugThruClsTypeRow.InctvTs);
                    Assert.AreEqual(result.Rows.LastOrDefault().DelTs, drugThruClsTypeRow.DelTs);

                    _formularyEntities.DrugThrputcClsType.Remove(drugThruClsTypeRow);
                    _formularyEntities.SaveChanges();
                }
            }


        }
    }
}
