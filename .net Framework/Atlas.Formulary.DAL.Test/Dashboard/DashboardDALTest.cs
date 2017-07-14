//using System;
//using Microsoft.VisualStudio.TestTools.UnitTesting;

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
using Atlas.Reference.DAL.ViewModels;
using Atlas.Reference.DAL;
using Atlas.Reference.DAL.Models;
using Atlas.Formulary.DAL.ViewModels;
using Atlas.Formulary.DAL.Models.Containers;

namespace Atlas.Formulary.DAL.Test.Dashboard
{
    [TestClass]
    public class DashboardDALTest
    {
        private IConfig _config;
        private FormularyEntities _formularyEntities;
        private IFormularyRepositoryFactory _formFactory;
        
        private IReferenceRepositoryFactory _refFactory;
        private ReferenceEntities _refEntities;

        private IDashboardRepository dashRepo;
        private IFormularyRepository formRepo;
        private IDrugListRepository druglistRepo;

        private spFormulary_GetHeader_Result formulary1, formulary2;
        private DrugListHeaderVM druglist1;
        private long formularySK1, formularySK2, drugListSK, tierSK;

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
        public void shouldGetDashboardAlerts()
        {
            using (var formRepo = _formFactory.Formulary())
            {   
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    using (var frRepo = _formFactory.FormularyReview())
                    {
                        using (var dashRepo = _formFactory.Dashboard())
                        {

                            //Arrange

                            DateTime date= DateTime.Now;
                           
                            spFormulary_GetHeader_Result x = new spFormulary_GetHeader_Result()
                            {
                                FrmlrySK = null, //creating a new formulary
                                LOBSK = 3,
                                LOBName = "Commercial",
                                DrugThrputcClsTypeSK = 1,
                                DrugThrputcClsTypeCode = "AHFS",
                                DrugRefDbSK = 1,
                                DrugRefDbName = "FDB",
                                DrugPostObsltAlwdDays = 365,
                                FrmlryName = "Matt"+date,
                                FrmlryID = "41587",
                                FrmlryVer = 1,
                                AutomaticallyAssignNewNDCsInd = true,
                                EfctvStartDt = new DateTime(2017, 03, 01),
                                EfctvEndDt = new DateTime(2017, 03, 03),
                                PlanType = null,
                                DrugTypeFunction = "FDBStd",
                                IsExcludeOTC = false,
                                StatDesc = "Draft",
                                CreatedBy = "jsmith",
                                CreatedTs = new DateTime(2017, 03, 09),
                                LastModfdBy = "jsmith",
                                LastModfdTs = new DateTime(2017, 03, 09),
                                InctvTs = null,
                                DelTs = null,
                                SumRptCfgSK = 1
                            };

                            formularySK1 = formRepo.PutFormularyHeader(  //return long
                                  x.FrmlrySK,
                                  x.LOBSK,
                                  x.DrugThrputcClsTypeSK,
                                  x.DrugRefDbSK,
                                  x.DrugPostObsltAlwdDays,
                                  x.FrmlryName,
                                  (System.DateTime)x.EfctvStartDt,
                                  (System.DateTime)x.EfctvEndDt,
                                  x.PlanType,
                                  x.DrugTypeFunction,
                                  x.IsExcludeOTC,
                                  x.CreatedBy,
                                  "Drug List Name List",
                                  "tierName_List",
                                  1, //owner user group sk
                                  "access User GrpSk_List",
                                  x.InctvTs,
                                  x.DelTs,
                                  (bool)x.AutomaticallyAssignNewNDCsInd,
                                  x.SumRptCfgSK

                            );
                            var justAddedFormSK = formRepo.FindAll().Max(form => form.FrmlrySK);
                            var actualResult = formRepo.GetHeader(justAddedFormSK);

                            formRepo.DashboardFormularyApprove((int)justAddedFormSK, 0, "draft to ", x.CreatedBy);

                            //Assert
                            Assert.AreEqual(x.LOBName, actualResult.LOBName);
                            Assert.AreEqual(x.DrugThrputcClsTypeCode, actualResult.DrugThrputcClsTypeCode);
                            Assert.AreEqual(x.DrugRefDbName, actualResult.DrugRefDbName);
                            Assert.AreEqual(x.FrmlryName, actualResult.FrmlryName);
                            Assert.AreEqual(x.StatDesc, actualResult.StatDesc);   //draft

                            
                            formRepo.DashboardFormularyApprove((int)justAddedFormSK, 1, "draft to ", x.CreatedBy);

                            actualResult = formRepo.GetHeader(justAddedFormSK);
                            //Level 1 Assert
                            Assert.AreEqual("Pending Level 1 Approval", actualResult.StatDesc);

                            
                            formRepo.DashboardFormularyApprove((int)justAddedFormSK, 2, "draft to ", x.CreatedBy);

                            actualResult = formRepo.GetHeader(justAddedFormSK);
                            //Level 2 Assert
                            Assert.AreEqual("Pending Level 2 Approval", actualResult.StatDesc);
                                                    
                            var dashBoardAlertResults = dashRepo.GetDashboardAlerts(true);
                         
                            var expectedDashboardResult = new spDashboard_Get_Result
                            {
                                AlertTypeDesc = "Formulary Approval Required",
                                ActnVal = "FormularyApprovalRequired?FrmlrySK="+justAddedFormSK,
                                AlertDesc = "Formulary  Pending Level 2 Approval: Matt"+date
                                                             
                            };

                            //Assert DashboardAlert
                            Assert.AreEqual(dashBoardAlertResults.FirstOrDefault().AlertTypeDesc,expectedDashboardResult.AlertTypeDesc);
                            Assert.AreEqual(dashBoardAlertResults.FirstOrDefault().ActnVal, expectedDashboardResult.ActnVal);
                            Assert.AreEqual(dashBoardAlertResults.FirstOrDefault().AlertDesc, expectedDashboardResult.AlertDesc);

                            formRepo.DeleteFormulary(justAddedFormSK);


                        }
                    }
                }
            }
            
        }


        [TestMethod]
        public void shouldPutDashBoardAlerts()
        {
            
            using (var Repo = _formFactory.Dashboard())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    //Arrange

                    var maxAlertSK = _formularyEntities.Alert.Max(x=>x.AlertSK);
                    string userID = "mkern";
                    
                    //Act
                    Repo.PutDashBoardAlerts(maxAlertSK, userID);
                    var result = _formularyEntities.Alert.AsQueryable();

                    //Assert
                    Assert.IsNotNull(result.Where(x => x.AlertSK == maxAlertSK &&
                                                       x.AcknowledgedBy == userID &&
                                                       x.AcknowledgedDt == DateTime.Today
                                                  ));
                        
                    userID = "jsmith";
                    Repo.PutDashBoardAlerts(maxAlertSK, userID);
                                        
                }
            }

           
        }

    }
}
