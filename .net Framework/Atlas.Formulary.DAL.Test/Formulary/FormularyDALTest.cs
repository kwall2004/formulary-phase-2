using System;
using System.Data.Entity;
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
using System.Data.Entity.Validation;

namespace Atlas.Formulary.DAL.Test.Formulary
{
    [TestClass]
    public class FormularyDALTest
    {

        private IConfig _config;
        private FormularyEntities _formularyEntities;
        private IFormularyRepositoryFactory _formFactory;

        private IReferenceRepositoryFactory _refFactory;
        private ReferenceEntities _refEntities;

        private IFormularyRepository formRepo;

        private IDrugListRepository druglistRepo;
        private IFormularyTierRepository tierRepo;

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
            _formularyEntities = new FormularyEntities(_config);
            _formFactory = new FormularyRepositoryFactory(_config, _formularyEntities);

            _refEntities = new ReferenceEntities(_config);
            _refFactory = new ReferenceRepositoryFactory(_refEntities);
        }

        [TestMethod]
        public void ShouldGetAccess()
        {
            using (formRepo = _formFactory.Formulary())
            {
                //ARRANGE
                InitializeData();
                spFormulary_GetAccess_Result expFormResult = new spFormulary_GetAccess_Result()
                {
                    ParentUserGrpSK = null,
                    UserGrpSk = 3,
                    IsAccessible = 0

                };
                //ACT
                var getAccessResult = formRepo.GetAccess(formularySK1).ToList();
                var caidanRow = getAccessResult.First(a => a.UserGrpSk == 3);
                //ASSERT
                Assert.IsNotNull(getAccessResult);
                Assert.AreEqual(caidanRow.ParentUserGrpSK, expFormResult.ParentUserGrpSK);
                Assert.AreEqual(caidanRow.UserGrpSk, expFormResult.UserGrpSk);
                Assert.AreEqual(caidanRow.IsAccessible, expFormResult.IsAccessible);
                DeleteData();
            }
        }

        [TestMethod]
        public void ShouldGetHeader()
        {
            using (formRepo = _formFactory.Formulary())
            {
                //ARRANGE
                InitializeData();                       

                //ACT
                var actualGetHeader = formRepo.GetHeader(formularySK1);
                   
                //ASSERT
                Assert.AreEqual(actualGetHeader.FrmlrySK, formularySK1);
                Assert.AreEqual(actualGetHeader.LOBSK, formulary1.LOBSK);
                Assert.AreEqual(actualGetHeader.DrugThrputcClsTypeSK, formulary1.DrugThrputcClsTypeSK);
                Assert.AreEqual(actualGetHeader.DrugRefDbSK, formulary1.DrugRefDbSK);
                Assert.AreEqual(actualGetHeader.DrugPostObsltAlwdDays, formulary1.DrugPostObsltAlwdDays);
                Assert.AreEqual(actualGetHeader.FrmlryName, formulary1.FrmlryName);
                Assert.AreEqual(actualGetHeader.FrmlryVer, formulary1.FrmlryVer);
                Assert.AreEqual(actualGetHeader.AutomaticallyAssignNewNDCsInd, formulary1.AutomaticallyAssignNewNDCsInd);
                Assert.AreEqual(actualGetHeader.EfctvStartDt, formulary1.EfctvStartDt);
                Assert.AreEqual(actualGetHeader.EfctvEndDt, formulary1.EfctvEndDt);
                Assert.AreEqual(actualGetHeader.CreatedBy, formulary1.CreatedBy);
                Assert.AreEqual(actualGetHeader.LastModfdBy, formulary1.LastModfdBy);

                DeleteData();          
            }
        }

        [TestMethod]
        public void ShouldGetHeaderMedispan()
        {
            using (formRepo = _formFactory.Formulary())
            {
                //ARRANGE
                var itemToUpdate = new Frmlry()
                {                   
                    LOBSK=2,                   
                    DrugThrputcClsTypeSK=1,
                    DrugRefDbSK =2, //Medispan
                    DrugPostObsltAlwdDays=365,
                    FrmlryName ="blah",
                    CreatedBy="jsmith",
                    LastModfdBy="jsmith"
                   

                };
                             
                _formularyEntities.Frmlry.Attach(itemToUpdate);
                _formularyEntities.Entry(itemToUpdate).State = EntityState.Added;
                _formularyEntities.SaveChanges();
                
                //ACT
              
                var itu = _formularyEntities.Frmlry.FirstOrDefault(frm => frm.FrmlryName == itemToUpdate.FrmlryName);

                //ASSERT
                
                Assert.AreEqual(itu.LOBSK, itemToUpdate.LOBSK);
                Assert.AreEqual(itu.DrugThrputcClsTypeSK, itemToUpdate.DrugThrputcClsTypeSK);
                Assert.AreEqual(itu.DrugRefDbSK, itemToUpdate.DrugRefDbSK);
                Assert.AreEqual(itu.DrugPostObsltAlwdDays, itemToUpdate.DrugPostObsltAlwdDays);
                Assert.AreEqual(itu.FrmlryName, itemToUpdate.FrmlryName);
                
                _formularyEntities.Frmlry.Remove(itu);
                _formularyEntities.SaveChanges();

            }
        }

        [TestMethod]
        public void ShouldGetAll()
        {
            using (formRepo = _formFactory.Formulary())
            {
                //ARRANGE
                InitializeData();

                //ACT
                var actualFormularyGetAll = formRepo.GetAll().ToList();
                var result = actualFormularyGetAll.Find(a => a.FrmlrySK == formularySK1);

                //ASSERT
                Assert.IsTrue(actualFormularyGetAll.Count > 1);
                Assert.AreEqual(result.FrmlrySK, formularySK1);
                Assert.AreEqual(result.FrmlryName, formulary1.FrmlryName);
                Assert.AreEqual(result.FrmlryVer, formulary1.FrmlryVer);
                Assert.AreEqual(result.EfctvStartDt, formulary1.EfctvStartDt);
                DeleteData();                  
            }
        }
        
        [TestMethod]
        public void ShouldFormularyFullSearch()
        {
            using (formRepo = _formFactory.Formulary())
            {

                //Arrange
                InitializeData();
                string searchString = "My General Unique Formulary";                
                   
                //Act
                var actualFormularySearchResult = formRepo.FormularyFullSearch(searchString).ToList();
                var result = actualFormularySearchResult.Find(a => a.FrmlrySK == formularySK1);
                //Assert
                Assert.IsTrue(actualFormularySearchResult.Count > 1);
                Assert.AreEqual(result.FrmlrySK, formularySK1);
                Assert.AreEqual(result.FrmlryName, formulary1.FrmlryName);
                Assert.AreEqual(result.FrmlryVer, formulary1.FrmlryVer);
                Assert.AreEqual(result.EfctvStartDt, formulary1.EfctvStartDt);

                DeleteData();      
            }
        }

        [TestMethod]
        public void ShouldGetDrugLists()
        {
            using (var Repo = _formFactory.Formulary())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {   
                    
                    //Arrange                    
                    FrmlryDrugList aFrmlryDrugList = new FrmlryDrugList()
                    {
                        
                        FrmlrySK=41717,
                        DrugListSK=46, 
                        FrmlryDrugListName="Igor3", 
                        EfctvStartDt =DateTime.Now,
                        EfctvEndDt =DateTime.Now,
                        CreatedBy ="jsmith",
                        CreatedTs =DateTime.Now,
                        LastModfdBy ="jsmith",
                        LastModfdTs =DateTime.Now,
                        InctvTs =null,
                        DelTs =null
                     };

                    _formularyEntities.FrmlryDrugList.Add(aFrmlryDrugList);
                    _formularyEntities.SaveChanges();

                    var maxFrmlryDrugListSK = _formularyEntities.FrmlryDrugList.Max(x => x.FrmlryDrugListSK);
                    var FrmlryDrugList = _formularyEntities.FrmlryDrugList.Where(y => y.FrmlryDrugListSK == maxFrmlryDrugListSK).ToList();

                    //Act
                    var actualFrmlryDrugList = Repo.GetDrugLists(FrmlryDrugList[0].FrmlrySK).ToList();
                    
                    //Assert
                    Assert.AreEqual(aFrmlryDrugList.FrmlryDrugListSK, actualFrmlryDrugList.LastOrDefault().FrmlryDrugListSK);
                    Assert.AreEqual(aFrmlryDrugList.FrmlrySK, actualFrmlryDrugList.LastOrDefault().FrmlrySK);
                    Assert.AreEqual(aFrmlryDrugList.DrugListSK, actualFrmlryDrugList.LastOrDefault().DrugListSK);
                    Assert.AreEqual(aFrmlryDrugList.FrmlryDrugListName, actualFrmlryDrugList.LastOrDefault().FrmlryDrugListName);
                  
                    Assert.AreEqual(aFrmlryDrugList.CreatedBy, actualFrmlryDrugList.LastOrDefault().CreatedBy);
                   
                    Assert.AreEqual(aFrmlryDrugList.LastModfdBy, actualFrmlryDrugList.LastOrDefault().LastModfdBy);                   
                    Assert.AreEqual(aFrmlryDrugList.InctvTs, actualFrmlryDrugList.LastOrDefault().InctvTs);
                    Assert.AreEqual(aFrmlryDrugList.DelTs, actualFrmlryDrugList.LastOrDefault().DelTs);


                    _formularyEntities.FrmlryDrugList.Remove(aFrmlryDrugList);
                    _formularyEntities.SaveChanges();
                }
            }
        }


        [TestMethod]
        public void ShouldGetTierNames()
        {
            using (var Repo = _formFactory.DrugTier())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    //Arrange                                  
                    FrmlryTier newFormTier = new FrmlryTier()
                    {
                    
                        FrmlrySK =41717,
                        FrmlryTierName ="Brand3_23_1023am", 
                        FrmlryTierDesc = "Brand3_23_1023am",
                        FrmlryTierNbr =1,
                        EfctvStartDt =DateTime.Now,
                        EfctvEndDt=DateTime.Now,
                        
                        CreatedBy ="jsmith",
                        CreatedTs = new DateTimeOffset(),
                        LastModfdBy ="jsmith",
                        LastModfdTs =new DateTimeOffset()
       
                    };
                    
                    _formularyEntities.FrmlryTier.Attach(newFormTier);
                    _formularyEntities.Entry(newFormTier).State = newFormTier.FrmlryTierSK == 0 ? EntityState.Added : EntityState.Modified;
                    _formularyEntities.SaveChanges();

                    var maxFrmlryTierSK = _formularyEntities.FrmlryTier.Max(x => x.FrmlryTierSK);
                    var expectedMaxResult = _formularyEntities.FrmlryTier.FirstOrDefault(x => x.FrmlryTierSK == maxFrmlryTierSK);

                    //Act
                    var actualResult = Repo.GetFormularyTierNames(expectedMaxResult.FrmlrySK);
                    var acutalResultMaxFrmlryTierSK = actualResult.Max(x => x.FrmlryTierSK);
                    var acutalResult = actualResult.Where(x => x.FrmlryTierSK == acutalResultMaxFrmlryTierSK).ToList();
                    
                    //Assert
                    Assert.AreEqual(expectedMaxResult.FrmlryTierSK, acutalResult[0].FrmlryTierSK );
                    Assert.AreEqual(expectedMaxResult.FrmlrySK, acutalResult[0].FrmlrySK);
                    Assert.AreEqual(expectedMaxResult.FrmlryTierName, acutalResult[0].FrmlryTierName);
                    Assert.AreEqual(expectedMaxResult.FrmlryTierDesc, acutalResult[0].FrmlryTierDesc);
                    Assert.AreEqual(expectedMaxResult.FrmlryTierNbr, acutalResult[0].FrmlryTierNbr);
                    
                    Assert.AreEqual(expectedMaxResult.CreatedBy, acutalResult[0].CreatedBy);
                    Assert.AreEqual(expectedMaxResult.LastModfdBy, acutalResult[0].LastModfdBy);
                    Assert.AreEqual(expectedMaxResult.InctvTs, acutalResult[0].InctvTs);
                    Assert.AreEqual(expectedMaxResult.DelTs, acutalResult[0].DelTs);
                   
                    _formularyEntities.FrmlryTier.Remove(newFormTier);
                    _formularyEntities.SaveChanges();

                }
            }
        }



        //TODO: CC there, not PUT behavior 
        [TestMethod]
        public void ShouldPutDrugLists()
        {
            using (var Repo = _formFactory.Formulary())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {

                    long formularySK = 33;
                    string DrugListNames = "33";
                    string UserId = "jsmith";

                    List<spFormulary_PutDrugLists_Result> listOfDrugListPutResults = new List<spFormulary_PutDrugLists_Result>();
                    spFormulary_PutDrugLists_Result expdlresult = new spFormulary_PutDrugLists_Result()
                    {
                        ErrorLine=null,
                        ErrorMessage=null,
                        ErrorNumber=0,
                        ErrorProcedure=null,
                        ErrorSeverity=33,
                        ErrorState=null
                    };
                   
                    listOfDrugListPutResults.Add(expdlresult);
                   
                    var actResult = Repo.PutDrugLists(formularySK, DrugListNames,UserId).ToList();

                    Assert.AreEqual(actResult.Count, 1);
                    Assert.AreEqual(actResult.First().ErrorLine, expdlresult.ErrorLine);
                    Assert.AreEqual(actResult.First().ErrorMessage, expdlresult.ErrorMessage);
                    Assert.AreEqual(actResult.First().ErrorNumber, expdlresult.ErrorNumber);
                    Assert.AreEqual(actResult.First().ErrorProcedure, expdlresult.ErrorProcedure);
                    Assert.AreEqual(actResult.First().ErrorSeverity, expdlresult.ErrorSeverity);
                    Assert.AreEqual(actResult.First().ErrorState, expdlresult.ErrorState);
                }
            }
        }

        [TestMethod]
        public void ShouldGetFormularyNotes()
        {
            using (var Repo = _formFactory.Formulary())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    List<FrmlryNotes> fnList = new List<FrmlryNotes>();
 
                    FrmlryNotes fn = new FrmlryNotes()
                    {                       
                        FrmlrySK =7,
                        AprvlTypeSK =1,
                        Notes = "Matt note 3_22_2017_331pm",
                        CreatedBy ="jsmith",                      
                        LastModfdBy ="jsmith",                       
                        Subject = "Jeff"
                    };

                    FrmlryNotes fn2 = new FrmlryNotes()
                    {                      
                        FrmlrySK = 8,
                        AprvlTypeSK = 2,
                        Notes = "Matt note 3_22_2017_331pm2",
                        CreatedBy = "jsmith2",
                        LastModfdBy = "jsmith2",
                        Subject = "Jeff2"
                    };
                    fnList.Add(fn);
                    fnList.Add(fn2);

                    _formularyEntities.FrmlryNotes.Attach(fnList[1]);
                    _formularyEntities.Entry(fnList[1]).State = fnList[1].FrmlryNoteSK == 0 ? EntityState.Added : EntityState.Modified;
                    _formularyEntities.SaveChanges();


                    var maxSK = _formularyEntities.FrmlryNotes.Max(theSK => theSK.FrmlryNoteSK);
                    var theMaxNote = _formularyEntities.FrmlryNotes.FirstOrDefault(x => x.FrmlryNoteSK == maxSK);

                    Assert.AreEqual(fnList[1].FrmlryNoteSK, theMaxNote.FrmlryNoteSK);
                    Assert.AreEqual(fnList[1].FrmlrySK, theMaxNote.FrmlrySK);
                    Assert.AreEqual(fnList[1].AprvlTypeSK, theMaxNote.AprvlTypeSK);
                    Assert.AreEqual(fnList[1].Notes, theMaxNote.Notes);
                    Assert.AreEqual(fnList[1].CreatedBy, theMaxNote.CreatedBy);
                    Assert.AreEqual(fnList[1].LastModfdBy, theMaxNote.LastModfdBy);
                    Assert.AreEqual(fnList[1].Subject, theMaxNote.Subject);
                    
                    _formularyEntities.FrmlryNotes.Remove(fnList[1]);
                    _formularyEntities.SaveChanges();

                }
            }
        }

        [TestMethod]
        public void ShouldPutFormularyNotes()
        {
            using (formRepo = _formFactory.Formulary())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    //ARRANGE
                    InitializeData();
                    string userID = "jsmith";

                    FormularyNotesVM fnvm = new FormularyNotesVM()
                    {
                        FrmlryNoteSK = null,
                        FrmlrySK = formularySK1,
                        AprvlTypeSK = 1,
                        Notes = "You suck at formulary. ",
                        Subject = "Rejection"

                    };

                    //ACT
                    long newFormularyNoteSK = formRepo.PutFormularyNotes(fnvm, userID);
                    fnvm.FrmlryNoteSK = newFormularyNoteSK;                   

                    var createResult = _formularyEntities.FrmlryNotes.Where(fn => fn.FrmlryNoteSK == fnvm.FrmlryNoteSK &&
                                                                     fn.FrmlrySK == fnvm.FrmlrySK &&
                                                                     fn.AprvlTypeSK == fnvm.AprvlTypeSK &&
                                                                     fn.Notes == fnvm.Notes &&
                                                                     fn.Subject == fnvm.Subject).ToList();
                    long updateFormularyNoteSK = 0;
                    fnvm.Notes = "You are good at Formulary. ";
                    updateFormularyNoteSK = formRepo.PutFormularyNotes(fnvm, userID);

                    //ASSERT
                    Assert.IsNotNull(createResult);
                    Assert.AreEqual(createResult.First().Notes, fnvm.Notes);
                    Assert.AreEqual(createResult.First().FrmlryNoteSK, updateFormularyNoteSK);
                    Assert.AreEqual(createResult.First().Subject, fnvm.Subject);
                    DeleteData();
                }
            }
        }

        //TODO: FormularySK goes 34-->38
        [TestMethod]
        public void ShouldDeleteFormularyNotes()
        {
            using (var Repo = _formFactory.Formulary())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    long formularyNoteSK = _formularyEntities.FrmlryNotes.Max(x=>x.FrmlryNoteSK);
                                        
                    FrmlryNotes fnote = new FrmlryNotes()
                    {
                        FrmlryNoteSK=formularyNoteSK+1, 
                        FrmlrySK =20345,
                        AprvlTypeSK =1,
                        Notes = "You suck at Formulary.  ",
                        CreatedBy ="jsmith",
                        //CreatedTs ="",
                        LastModfdBy ="jsmith",
                        //LastModfdTs ="",
                        Subject = "Rejection"
                    };

                    _formularyEntities.FrmlryNotes.Add(fnote);
                    _formularyEntities.SaveChanges();
                    FrmlryNotes fn=_formularyEntities.FrmlryNotes.Find(fnote.FrmlryNoteSK);
                    Assert.IsNotNull(fn);

                    Repo.DeleteFormularyNotes(fn.FrmlryNoteSK);
                    fn = _formularyEntities.FrmlryNotes.Find(fnote.FrmlryNoteSK);
                    Assert.IsNull(fn);
                   
                }
            }
        }

        //TODO: touches Cache table, so dont Inegration test 
        [TestMethod]
        public void ShouldGetFormulariesByNDC()
        {
            using (var Repo = _formFactory.Formulary())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    
                    
                }
            }
        }

        [TestMethod]
        public void ShouldPostPutFormulary()
        {
            using (formRepo = _formFactory.Formulary())
            {
                //ARRANGE
                InitializeData();
                bool isExcludeOTC = formulary1.IsExcludeOTC.Value ? false : true;
                bool isAutoAdd = formulary1.AutomaticallyAssignNewNDCsInd.Value ? false : true;
                int drugPostObselete = 100;
                long summaryReportConfigSK = 1;

                //ACT
                formRepo.PutFormularyHeader(formularySK1, 
                                           formulary1.LOBSK,
                                            formulary1.DrugThrputcClsTypeSK, 
                                            formulary1.DrugRefDbSK, 
                                            drugPostObselete, 
                                            formulary1.FrmlryName, 
                                            formulary1.EfctvStartDt.Value, 
                                            formulary1.EfctvEndDt.Value, 
                                            formulary1.PlanType, 
                                            formulary1.DrugTypeFunction, 
                                            isExcludeOTC, 
                                            formulary1.CreatedBy, 
                                            null, 
                                            "1,2,3,4,5", 
                                            1, 
                                            "1", 
                                            null, 
                                            null, 
                                            isAutoAdd, 
                                            summaryReportConfigSK);
                var result = formRepo.GetHeader(formularySK1);

                //ASSERT
                Assert.AreEqual(result.FrmlrySK, formularySK1);
                Assert.AreEqual(result.LOBSK, formulary1.LOBSK);
                Assert.AreEqual(result.DrugThrputcClsTypeSK, formulary1.DrugThrputcClsTypeSK);
                Assert.AreEqual(result.DrugRefDbSK, formulary1.DrugRefDbSK);
                Assert.AreEqual(result.DrugPostObsltAlwdDays, drugPostObselete);
                Assert.AreEqual(result.FrmlryName, formulary1.FrmlryName);
                Assert.AreEqual(result.FrmlryVer, formulary1.FrmlryVer);
                Assert.AreEqual(result.AutomaticallyAssignNewNDCsInd, isAutoAdd);
                Assert.AreEqual(result.EfctvStartDt, formulary1.EfctvStartDt);
                Assert.AreEqual(result.EfctvEndDt, formulary1.EfctvEndDt);
                Assert.AreEqual(result.CreatedBy, formulary1.CreatedBy);
                Assert.AreEqual(result.LastModfdBy, formulary1.LastModfdBy);
                Assert.AreEqual(result.IsExcludeOTC, isExcludeOTC);
                DeleteData();
            }
        }

        //TODO: this works properly
        [TestMethod]
        public void ShouldDeleteFormulary()
        {
            using (var Repo = _formFactory.Formulary())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {

                    Frmlry toDelete = new Frmlry()
                    {
                        FrmlrySK =20911,
                        LOBSK=1, 
                        DrugThrputcClsTypeSK=1, 
                        DrugRefDbSK =1,
                        DrugPostObsltAlwdDays=365, 
                        FrmlryName = "JoeTest PDF Message #1",
                        FrmlryID="20911", 
                        FrmlryVer=1,
                        CreatedBy="jsmith",
                        LastModfdBy="jsmith"
                    };

                    Repo.Delete(toDelete);

                    toDelete.DelTs = new DateTime(2015, 2, 22, 11, 2, 3, 4);
                    _formularyEntities.Frmlry.Attach(toDelete);
                    _formularyEntities.Entry(toDelete).Property(x => x.DelTs).IsModified = true;                  
                    _formularyEntities.SaveChanges();
                   
                    var delForm =_formularyEntities.Frmlry.Where(f => f.DelTs == toDelete.DelTs).ToList();
                    Assert.AreEqual(delForm.Count, 1);
                    Assert.AreEqual(delForm.First().FrmlrySK, toDelete.FrmlrySK);
                    Assert.AreEqual(delForm.First().LOBSK, toDelete.LOBSK);
                    Assert.AreEqual(delForm.First().DrugThrputcClsTypeSK, toDelete.DrugThrputcClsTypeSK);
                    Assert.AreEqual(delForm.First().DrugRefDbSK, toDelete.DrugRefDbSK);
                    Assert.AreEqual(delForm.First().DrugPostObsltAlwdDays, toDelete.DrugPostObsltAlwdDays);
                    Assert.AreEqual(delForm.First().FrmlryName, toDelete.FrmlryName);
                    Assert.AreEqual(delForm.First().FrmlryID, toDelete.FrmlryID);
                    Assert.AreEqual(delForm.First().FrmlryVer, toDelete.FrmlryVer);

                    var delForm2 = _formularyEntities.Frmlry.Where(f => f.FrmlrySK == toDelete.FrmlrySK &&
                                                                      f.LOBSK == toDelete.LOBSK &&
                                                                      f.DrugThrputcClsTypeSK == toDelete.DrugThrputcClsTypeSK &&
                                                                      f.DrugRefDbSK == toDelete.DrugRefDbSK &&
                                                                      f.DrugPostObsltAlwdDays == toDelete.DrugPostObsltAlwdDays &&
                                                                      f.FrmlryName == toDelete.FrmlryName &&
                                                                      f.FrmlryID == toDelete.FrmlryID &&
                                                                      f.FrmlryVer == toDelete.FrmlryVer &&
                                                                      f.DelTs == toDelete.DelTs).ToList();
                                                                               
                    delForm2.First().DelTs = null;
                    _formularyEntities.Frmlry.Attach(delForm2.First());
                    _formularyEntities.Entry(delForm2.First()).Property(x => x.DelTs).IsModified = true;
                    _formularyEntities.SaveChanges();

                }
            }
        }

        private void InitializeData()

        {
            formulary1 = new spFormulary_GetHeader_Result
            {
                FrmlrySK = 2,
                LOBSK = 1,
                LOBName = "Meridian",
                DrugThrputcClsTypeSK = 1,
                DrugThrputcClsTypeCode = "",
                DrugRefDbSK = 1,
                DrugRefDbName = "",
                DrugPostObsltAlwdDays = 365,
                FrmlryName = "My General Unique Formulary 1.0",
                FrmlryID = "",
                FrmlryVer = 1,
                AutomaticallyAssignNewNDCsInd = true,
                EfctvStartDt = DateTime.Today,
                EfctvEndDt = DateTime.Parse("12/30/2017"),
                PlanType = "PDP",
                DrugTypeFunction = "FDBStd",
                IsExcludeOTC = true,
                StatDesc = "",
                CreatedBy = "TheBatman",
                CreatedTs = DateTime.Today,
                LastModfdBy = "",
                LastModfdTs = DateTime.Today,
                // InctvTs ="",
                // DelTs ="",
                SumRptCfgSK = 1
            };



            formulary2 = new spFormulary_GetHeader_Result
            {
                FrmlrySK = 0,
                LOBSK = 1,
                LOBName = "Ford",
                DrugThrputcClsTypeSK = 1,
                DrugThrputcClsTypeCode = "",
                DrugRefDbSK = 1,
                DrugRefDbName = "",
                DrugPostObsltAlwdDays = 365,
                FrmlryName = "My General Unique Formulary 2.0",
                FrmlryID = "",
                FrmlryVer = 1,
                AutomaticallyAssignNewNDCsInd = false,
                EfctvStartDt = DateTime.Today,
                EfctvEndDt = DateTime.Parse("12/30/2017"),
                PlanType = "PDP",
                DrugTypeFunction = "FDBStd",
                IsExcludeOTC = true,
                StatDesc = "",
                CreatedBy = "TheBatman",
                CreatedTs = DateTime.Today,
                LastModfdBy = "",
                LastModfdTs = DateTime.Today,
                // InctvTs ="",
                // DelTs ="" ,
                SumRptCfgSK = 2
            };



            formularySK1 = formRepo.PutFormularyHeader(formulary1.FrmlrySK,
                                                        formulary1.LOBSK,
                                                        formulary1.DrugThrputcClsTypeSK,
                                                        formulary1.DrugRefDbSK,
                                                        formulary1.DrugPostObsltAlwdDays,
                                                        formulary1.FrmlryName,
                                                        //formulary1.AutomaticallyAssignNewNDCsInd,
                                                       
                                                        formulary1.EfctvStartDt.Value,
                                                        formulary1.EfctvEndDt.Value,
                                                        formulary1.PlanType,
                                                        formulary1.DrugTypeFunction,
                                                        formulary1.IsExcludeOTC,
                                                        formulary1.CreatedBy, //userID in repo header 
                                                        "",//druglist
                                                        "",//tiername
                                                        null,//ownerusergrpsk
                                                        "",//accessusergrpsk                                                  
                                                        DateTimeOffset.Now,//inctvts
                                                        DateTimeOffset.Now,//delts
                                                        true,//autoadd
                                                        formulary2.SumRptCfgSK //summaryReportConfigSK
                                                        );
 
            formularySK2 = formRepo.PutFormularyHeader(formulary2.FrmlrySK,
                                                               formulary2.LOBSK,
                                                               formulary2.DrugThrputcClsTypeSK,
                                                               formulary2.DrugRefDbSK,
                                                               formulary2.DrugPostObsltAlwdDays,
                                                               formulary2.FrmlryName,
                                                               //formulary2.AutomaticallyAssignNewNDCsInd,
                                                              
                                                               formulary2.EfctvStartDt.Value,
                                                               formulary2.EfctvEndDt.Value,
                                                               formulary2.PlanType,
                                                               formulary2.DrugTypeFunction,
                                                               formulary2.IsExcludeOTC,
                                                               formulary2.CreatedBy, //UserID
                                                               "",//drulistname
                                                               "",//tiernamelist
                                                               null,//ownerusergrpsk
                                                               "",//accessusergrpsk
                                                               DateTimeOffset.Now,//inctvts
                                                               DateTimeOffset.Now,//delts
                                                               true, //autoaddNewDrugs
                                                               formulary2.SumRptCfgSK //summaryReportConfigSK
                                                               );



            
                                                               
                                                               
                                                               
        }
                                            
        private void DeleteData()
        {
            if (formularySK1 != 0)
            {
                formRepo.DeleteFormulary(formularySK1);
                formularySK1 = 0;
                formulary1.FrmlrySK = 0;
            }
            if (formularySK2 != 0)
            {
                formRepo.DeleteFormulary(formularySK2);
                formularySK2 = 0;
                formulary2.FrmlrySK = 0;
            }
            if (drugListSK != 0)
            {
                druglistRepo.DeleteDrugList(drugListSK);
                drugListSK = 0;
            }
        }        
    }
}
