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

namespace Atlas.Formulary.DAL.Test.UserGroup
{
    [TestClass]
    public class UserGroupDALTest
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
        public void ShouldGetUserGroups()
        {
            using (var Repo = _formFactory.UserGroup())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    //Arrange

                    Atlas.Formulary.DAL.Models.UserGrp usrGrpModel = new Atlas.Formulary.DAL.Models.UserGrp()
                    {
                        UserGrpSK=1,
                        UserGrpTypeSK=2,
                        ParentUserGrpSK=null,
                        UserGrpName="Meridian",
                        EfctvStartDt=new DateTime(1900,1,1,0,0,0),
                        EfctvEndDt=new DateTime(9999,12,31,00,00,00),
                        CreatedBy="s6393",
                        CreatedTs=new DateTime(2016,8,18,8,01,58),
                        LastModfdBy="s6393",
                        LastModfdTs=new DateTime(2016,8,18,8,01,58),
                        InctvTs=null,
                        DelTs=null,
                        UserGrp2=null,
                        
                    };

                    var result = new QueryResult<Atlas.Formulary.DAL.Models.UserGrp>();

                    //Act
                    var expectedUserGroups = Repo.GetUserGroups().ToList();
                    result.Count = expectedUserGroups.Count();
                    result.Rows = expectedUserGroups;

                    //Assert
                    
                    Assert.AreEqual(result.Rows.FirstOrDefault().UserGrpSK, usrGrpModel.UserGrpSK);
                    Assert.AreEqual(result.Rows.FirstOrDefault().UserGrpTypeSK, usrGrpModel.UserGrpTypeSK);
                    Assert.AreEqual(result.Rows.FirstOrDefault().ParentUserGrpSK, usrGrpModel.ParentUserGrpSK);
                    Assert.AreEqual(result.Rows.FirstOrDefault().UserGrpName, usrGrpModel.UserGrpName);
                    Assert.AreEqual(result.Rows.FirstOrDefault().EfctvStartDt, usrGrpModel.EfctvStartDt);
                    Assert.AreEqual(result.Rows.FirstOrDefault().EfctvEndDt, usrGrpModel.EfctvEndDt);
                    Assert.AreEqual(result.Rows.FirstOrDefault().CreatedBy, usrGrpModel.CreatedBy);
                    //Assert.AreEqual(result.Rows.FirstOrDefault().CreatedTs, x.CreatedTs);
                    Assert.AreEqual(result.Rows.FirstOrDefault().LastModfdBy, usrGrpModel.LastModfdBy);
                    //Assert.AreEqual(result.Rows.FirstOrDefault().LastModfdTs, x.LastModfdTs);
                    Assert.AreEqual(result.Rows.FirstOrDefault().InctvTs, usrGrpModel.InctvTs);
                    Assert.AreEqual(result.Rows.FirstOrDefault().DelTs, usrGrpModel.DelTs);
                    Assert.AreEqual(result.Rows.FirstOrDefault().UserGrp2, usrGrpModel.UserGrp2);
                   
                   
                }
            }
        }

        [TestMethod]
        public void ShouldGetUserGroupTypes()
        {
            using (var Repo = _formFactory.UserGroup())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    //Arrange

                    Atlas.Formulary.DAL.Models.UserGrpType expectedUsrGrpType = new Atlas.Formulary.DAL.Models.UserGrpType()
                    {
                        
                        UserGrpTypeSK=1,
                        UserGrpTypeCode="Tenant",
                        UserGrpTypeDesc="Tenant",
                        EfctvStartDt=new DateTime(1900,1,1),
                        EfctvEndDt=new DateTime(9999,12,31),
                        CreatedBy="jrush",
                        LastModfdBy="jrush",
                        InctvTs=null,
                        DelTs=null
                                               
                    };

                    var result = new QueryResult<Atlas.Formulary.DAL.Models.UserGrpType>();

                    //Act
                    var expectedUserGroupTypes = Repo.GetUserGroupTypes().ToList();
                    result.Count = expectedUserGroupTypes.Count();
                    result.Rows = expectedUserGroupTypes;

                    //Assert
                    Assert.AreEqual(result.Rows.FirstOrDefault().UserGrpTypeSK, expectedUsrGrpType.UserGrpTypeSK);
                    Assert.AreEqual(result.Rows.FirstOrDefault().UserGrpTypeCode, expectedUsrGrpType.UserGrpTypeCode);
                    Assert.AreEqual(result.Rows.FirstOrDefault().UserGrpTypeDesc, expectedUsrGrpType.UserGrpTypeDesc);
                    Assert.AreEqual(result.Rows.FirstOrDefault().EfctvStartDt, expectedUsrGrpType.EfctvStartDt);
                    Assert.AreEqual(result.Rows.FirstOrDefault().EfctvEndDt, expectedUsrGrpType.EfctvEndDt);
                    Assert.AreEqual(result.Rows.FirstOrDefault().CreatedBy, expectedUsrGrpType.CreatedBy);
                    Assert.AreEqual(result.Rows.FirstOrDefault().LastModfdBy, expectedUsrGrpType.LastModfdBy);
                    Assert.AreEqual(result.Rows.FirstOrDefault().InctvTs, expectedUsrGrpType.InctvTs);
                    Assert.AreEqual(result.Rows.FirstOrDefault().DelTs, expectedUsrGrpType.DelTs);
                }
            }
        }

        [TestMethod]
        public void ShouldGetUsers()
        {
            using (var Repo = _formFactory.UserGroup())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    //Arrange

                    Atlas.Formulary.DAL.Models.User expectedUsersReceived = new Atlas.Formulary.DAL.Models.User()
                    {
                        UserSK = 0,
                        UserName = "Default User",
                        EfctvStartDt = new DateTime(1900,1,1),
                        EfctvEndDt=new DateTime(9999,12,31),
                        CreatedBy="system",
                        LastModfdBy="system",
                        InctvTs=null,
                        DelTs=null

                    };

                    var result = new QueryResult<Atlas.Formulary.DAL.Models.User>();

                    //Act
                    var expectedUsers = Repo.GetUsers().ToList();
                    result.Count = expectedUsers.Count();
                    result.Rows = expectedUsers;

                    //Assert
                    Assert.AreEqual(result.Rows.FirstOrDefault().UserSK, expectedUsersReceived.UserSK);
                    Assert.AreEqual(result.Rows.FirstOrDefault().UserName, expectedUsersReceived.UserName);
                    Assert.AreEqual(result.Rows.FirstOrDefault().EfctvStartDt, expectedUsersReceived.EfctvStartDt);
                    Assert.AreEqual(result.Rows.FirstOrDefault().EfctvEndDt, expectedUsersReceived.EfctvEndDt);
                    Assert.AreEqual(result.Rows.FirstOrDefault().CreatedBy, expectedUsersReceived.CreatedBy);
                    Assert.AreEqual(result.Rows.FirstOrDefault().LastModfdBy, expectedUsersReceived.LastModfdBy);
                    Assert.AreEqual(result.Rows.FirstOrDefault().InctvTs, expectedUsersReceived.InctvTs);
                    Assert.AreEqual(result.Rows.FirstOrDefault().DelTs, expectedUsersReceived.DelTs);

                }
            }
        }
    }
}
