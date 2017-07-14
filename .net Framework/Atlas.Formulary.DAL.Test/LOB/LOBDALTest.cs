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

namespace Atlas.Formulary.DAL.Test.LOB
{
    [TestClass]
    public class LOBDALTest
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
        public void GetLOB()
        {
            using (var Repo = _formFactory.LOB())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    //Arrange
                    
                    Atlas.Formulary.DAL.Models.LOB aLOB = new Atlas.Formulary.DAL.Models.LOB()
                    {
                        LOBSK=1,
                        LOBName="Medicare",
                        EfctvStartDt=new DateTime(2016,1,1),
                        EfctvEndDt=new DateTime(9999,12,31),
                        CreatedBy="jwitt",
                        LastModfdBy="jwitt",
                        InctvTs=null,
                        DelTs=null
                    };

                    Atlas.Formulary.DAL.Models.LOB anotherLOB = new Atlas.Formulary.DAL.Models.LOB()
                    {
                        LOBSK = 2,
                        LOBName = "Medicare",
                        EfctvStartDt = new DateTime(2016, 1, 1),
                        EfctvEndDt = new DateTime(9999, 12, 31),
                        CreatedBy = "jwitt",
                        LastModfdBy = "jwitt",
                        InctvTs = null,
                        DelTs = null
                    };

                    Atlas.Formulary.DAL.Models.LOB aThirdLOB = new Atlas.Formulary.DAL.Models.LOB()
                    {
                        LOBSK = 4,
                        LOBName = "HIX",
                        EfctvStartDt = new DateTime(2016, 1, 1),
                        EfctvEndDt = new DateTime(9999, 12, 31),
                        CreatedBy = "system",
                        LastModfdBy = "system",
                        InctvTs = null,
                        DelTs = null
                    };

                   
                    //Act

                    var result = new QueryResult<Atlas.Formulary.DAL.Models.LOB>();

                    //Act
                    var expectedLOB = Repo.FindAll(x => x.LOBSK == 4).Where(y=>y.LOBName=="Hix").ToList();
                    result.Count = expectedLOB.Count();
                    result.Rows = expectedLOB;

                    //Assert
                    Assert.AreEqual(result.Count, 1);

                    Assert.AreEqual(result.Rows.FirstOrDefault().LOBSK, aThirdLOB.LOBSK);
                    Assert.AreEqual(result.Rows.FirstOrDefault().LOBName, aThirdLOB.LOBName);
                    Assert.AreEqual(result.Rows.FirstOrDefault().EfctvStartDt, aThirdLOB.EfctvStartDt);
                    Assert.AreEqual(result.Rows.FirstOrDefault().EfctvEndDt, aThirdLOB.EfctvEndDt);
                    Assert.AreEqual(result.Rows.FirstOrDefault().CreatedBy, aThirdLOB.CreatedBy);
                    Assert.AreEqual(result.Rows.FirstOrDefault().LastModfdBy, aThirdLOB.LastModfdBy);
                    Assert.AreEqual(result.Rows.FirstOrDefault().InctvTs, aThirdLOB.InctvTs);
                    Assert.AreEqual(result.Rows.FirstOrDefault().DelTs, aThirdLOB.DelTs);

                    //Act
                    var expectedLOB2 = Repo.FindAll(x => x.LOBSK == 4).Where(y => y.LOBName == "BurgerKing").ToList();
                    result.Count = expectedLOB2.Count();
                    result.Rows = expectedLOB2;

                    //Assert                   
                    Assert.AreEqual(result.Count, 0);
                    
                    
                }
            }
        }
    }
}
