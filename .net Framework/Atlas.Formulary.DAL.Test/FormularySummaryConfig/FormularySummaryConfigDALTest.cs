using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Atlas.Configuration;
using Atlas.Reference.DAL;
using Atlas.Reference.DAL.Models;
using Atlas.Formulary.DAL.Models;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity.Validation;
using Atlas.Formulary.DAL.Repositories.Interfaces;
using Atlas.Formulary.DAL.Repositories;

namespace Atlas.Formulary.DAL.Test.FormularySummary
{
    [TestClass]
    public class FormularySummaryConfigDALTest
    {

        private IConfig _config;
        private FormularyEntities _formularyEntities;
        private IFormularyRepositoryFactory _formFactory;

      
        private IReferenceRepositoryFactory _refFactory;
        private ReferenceEntities _refEntities;

       

        /// <summary>
        /// Sets up.s
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
        public void ShouldGetAllSummaryReportConfig()
        {
            using (var Repo = _formFactory.FormularySummary())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    List<spSumRptCfg_GetAll_Result> alist = new List<spSumRptCfg_GetAll_Result>() { };

                    spSumRptCfg_GetAll_Result s1 = new spSumRptCfg_GetAll_Result()
                    {
                        SumRptCfgDesc = "",
                        SumRptCfgName = "",
                        SumRptCfgSK =33
                    };

                    spSumRptCfg_GetAll_Result s2 = new spSumRptCfg_GetAll_Result()
                    {
                        SumRptCfgDesc = "mattdesc",
                        SumRptCfgName = "mattname",
                        SumRptCfgSK = 34
                    };

                    alist.Add(s1);
                    alist.Add(s2);

                    SumRptCfg aTestTuple = new SumRptCfg()
                    {                       
                        SumRptCfgName="mattname",
                        SumRptCfgDesc="mattdesc",
                        CreatedBy="jsmith",
                        LastModfdBy="jsmith"
                    };

                    _refEntities.SumRptCfg.Add(aTestTuple);                 
                    //_refEntities.Entry(itemToUpdate).State = itemToUpdate.NDC != null ? EntityState.Added : EntityState.Modified;
                    _refEntities.SaveChanges();

                    var actual = Repo.GetAllSummaryReportConfig();
                    var actualRpt = actual.LastOrDefault(s => s.SumRptCfgName == "mattname");
 
                    Assert.AreEqual(actualRpt.SumRptCfgName, alist.LastOrDefault().SumRptCfgName);
                    Assert.AreEqual(actualRpt.SumRptCfgDesc, alist.LastOrDefault().SumRptCfgDesc);
                    
                    _refEntities.SumRptCfg.Remove(aTestTuple);
                    _refEntities.SaveChanges();

                }
            }
        }

        //TODO:Phase II foreign Key Constraint
        [TestMethod]
        public void ShouldGetSummaryReportConfigTier()
        {

            using (var Repo = _formFactory.FormularySummary())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {

                    long summaryReportConfigSK = 1;
                    long formularySK = 4;

                    List<spSumRptCfgTier_Get_Result> alist = new List<spSumRptCfgTier_Get_Result>() { };

                    spSumRptCfgTier_Get_Result s1 = new spSumRptCfgTier_Get_Result()
                    {   
                        
                        SumRptCfgTierSK =33,
                        Checked = 3,
                        FrmlryTierName = "",
                        FrmlryTierNbr = null,
                        FrmlryTierSK = 4,      
                        DsplyTierDesc = ""
                    };

                    spSumRptCfgTier_Get_Result s2 = new spSumRptCfgTier_Get_Result()
                    {
                        SumRptCfgTierSK =22,
                        Checked = 2,
                        FrmlryTierName = "",
                        FrmlryTierNbr = 2,
                        FrmlryTierSK = 2,
                        DsplyTierDesc =""
                    };

                    alist.Add(s1);
                    alist.Add(s2);

                    FrmlryTier aFormTier = new FrmlryTier()
                    {

                        
                        FrmlrySK = 51964,
                        FrmlryTierName = "Spec",
                        FrmlryTierDesc = null,
                        FrmlryTierNbr = null,
                        EfctvStartDt = DateTime.Now,
                        EfctvEndDt=DateTime.Now,
                        CreatedBy = "jsmith",
                        CreatedTs =DateTime.Now,
                        LastModfdBy = "jsmith",
                        LastModfdTs=DateTime.Now,
                        InctvTs=null,
                        DelTs=null
                       
                        
                    };

                    try
                    {
                        //_formularyEntities.FrmlryTier.Add(aFormTier);                      
                        //_formularyEntities.SaveChanges();
                    }
                    catch (DbEntityValidationException ex)
                    {
                        // Retrieve the error messages as a list of strings.
                        var errorMessages = ex.EntityValidationErrors
                                .SelectMany(x => x.ValidationErrors)
                                .Select(x => x.ErrorMessage);

                        // Join the list to a single string.
                        var fullErrorMessage = string.Join("; ", errorMessages);

                        // Combine the original exception message with the new one.
                        var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                        // Throw a new DbEntityValidationException with the improved exception message.
                        throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
                    }

                    SumRptCfgTier aSumRptCfgTier = new SumRptCfgTier()
                    {                      
                        SumRptCfgSK=0,
                        FrmlryTierSK=71594,
                        DsplyTierDesc=""
                     
                    };

                   // _refEntities.SumRptCfgTier.Add(aSumRptCfgTier);
                   // _refEntities.SaveChanges();

                    var actual = Repo.GetSummaryReportConfigTier(summaryReportConfigSK, formularySK);
                    var actualRpt = actual.LastOrDefault(s => s.FrmlryTierSK == s1.FrmlryTierSK);

                   // Assert.AreEqual(actualRpt.FrmlryTierName, alist.LastOrDefault().FrmlryTierName);
                   // Assert.AreEqual(actualRpt.FrmlryTierNbr, alist.LastOrDefault().FrmlryTierNbr);

                    //_formularyEntities.FrmlryTier.Remove(aFormTier);
                    //_refEntities.Entry(itemToUpdate).State = itemToUpdate.NDC != null ? EntityState.Added : EntityState.Modified;
                   // _refEntities.SaveChanges();

                   // _refEntities.SumRptCfgTier.Remove(aSumRptCfgTier);
                   // _refEntities.SaveChanges();

                }
            }
        }

        [TestMethod]
        public void ShouldGetAllSummaryReportOrganizeBy()
        {
            using (var Repo = _formFactory.FormularySummary())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    List<spSumRptOrgBy_GetAll_Result> alist = new List<spSumRptOrgBy_GetAll_Result>() { };

                    spSumRptOrgBy_GetAll_Result s1 = new spSumRptOrgBy_GetAll_Result()
                    {
                        SumRptOrgByName = "",
                        SumRptOrgBySK =22
                    };

                    spSumRptOrgBy_GetAll_Result s2 = new spSumRptOrgBy_GetAll_Result()
                    {
                        SumRptOrgByName = "matt",
                        SumRptOrgBySK =22
                    };

                    alist.Add(s1);
                    alist.Add(s2);

                    SumRptOrgBy aSumRptBy = new SumRptOrgBy()
                    {
                        //SumRptOrgBySK=7,
                        SumRptOrgByName = "matt",
                        EfctvStartDt = DateTime.Now,
                        EfctvEndDt=DateTime.Now,
                        CreatedBy="System",
                        LastModfdBy="System",
                        InctvTs=null,
                        DelTs=null                
                    };

                    try
                    {
                        _refEntities.SumRptOrgBy.Add(aSumRptBy);
                        _refEntities.SaveChanges();
                    }
                    catch (DbEntityValidationException ex)
                    {
                        // Retrieve the error messages as a list of strings.
                        var errorMessages = ex.EntityValidationErrors
                                .SelectMany(x => x.ValidationErrors)
                                .Select(x => x.ErrorMessage);

                        // Join the list to a single string.
                        var fullErrorMessage = string.Join("; ", errorMessages);

                        // Combine the original exception message with the new one.
                        var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                        // Throw a new DbEntityValidationException with the improved exception message.
                        throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
                    }

                    var actual = Repo.GetAllSummaryReportOrganizeBy();
                    var actualRpt = actual.LastOrDefault(s => s.SumRptOrgByName == s2.SumRptOrgByName);

                    Assert.AreEqual(actualRpt.SumRptOrgByName, alist.LastOrDefault().SumRptOrgByName);

                    _refEntities.SumRptOrgBy.Remove(aSumRptBy);
                    _refEntities.SaveChanges();

                }
            }
        }

        [TestMethod]
        public void ShouldGetAllSummaryReportDrugSortBy()
        {
            using (var Repo = _formFactory.FormularySummary())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    List<spSumRptDrugSortBy_GetAll_Result> alist = new List<spSumRptDrugSortBy_GetAll_Result>() { };

                    spSumRptDrugSortBy_GetAll_Result s1 = new spSumRptDrugSortBy_GetAll_Result()
                    {
                        SumRptDrugSortByName = "",
                        SumRptDrugSortBySK =22
                    };

                    spSumRptDrugSortBy_GetAll_Result s2 = new spSumRptDrugSortBy_GetAll_Result()
                    {
                        SumRptDrugSortByName = "matt",
                        SumRptDrugSortBySK =22
                    };

                    alist.Add(s1);
                    alist.Add(s2);

                    SumRptDrugSortBy aSumRptDrugSort = new SumRptDrugSortBy()
                    {
                        SumRptDrugSortByName="matt",
                        EfctvStartDt=DateTime.Now,
                        EfctvEndDt=DateTime.Now,
                        CreatedBy="matt",
                        LastModfdBy="matt",
                        InctvTs=null,
                        DelTs=null                        
                    };

                    _refEntities.SumRptDrugSortBy.Add(aSumRptDrugSort);
                    _refEntities.SaveChanges();

                    var actual = Repo.GetAllSummaryReportDrugSortBy();                    
                    var actualRpt = actual.LastOrDefault(s => s.SumRptDrugSortByName == s2.SumRptDrugSortByName);

                    Assert.AreEqual(actualRpt.SumRptDrugSortByName, alist.LastOrDefault().SumRptDrugSortByName);

                    _refEntities.SumRptDrugSortBy.Remove(aSumRptDrugSort);
                    _refEntities.SaveChanges();

                }
            }

        }

        [TestMethod]
        public void ShouldGetAllSummaryReportRollUpBy()
        {
            using (var Repo = _formFactory.FormularySummary())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    List<spSumRptRollUp_GetAll_Result> alist = new List<spSumRptRollUp_GetAll_Result>() { };

                    spSumRptRollUp_GetAll_Result s1 = new spSumRptRollUp_GetAll_Result()
                    {
                        SumRptRollUpName = "",
                        SumRptRollUpSK =22
                    };

                    spSumRptRollUp_GetAll_Result s2 = new spSumRptRollUp_GetAll_Result()
                    {
                        SumRptRollUpName = "matt",
                        SumRptRollUpSK =22
                    };

                    alist.Add(s1);
                    alist.Add(s2);

                    SumRptRollUp aSumRptRollUp = new SumRptRollUp()
                    {
                        SumRptRollUpName="matt",
                        EfctvStartDt=DateTime.Now,
                        EfctvEndDt=DateTime.Now,
                        CreatedBy="system",
                        LastModfdBy="system",
                        InctvTs=null,
                        DelTs=null
                    };

                    _refEntities.SumRptRollUp.Add(aSumRptRollUp);
                    _refEntities.SaveChanges();

                    var actual = Repo.GetAllSummaryReportRollUpBy();
                    var actualRpt = actual.LastOrDefault(s => s.SumRptRollUpName == s2.SumRptRollUpName);

                    Assert.AreEqual(actualRpt.SumRptRollUpName, alist.LastOrDefault().SumRptRollUpName);

                    _refEntities.SumRptRollUp.Remove(aSumRptRollUp);
                    _refEntities.SaveChanges();
                }
            }
        }

        [TestMethod]
        public void ShouldGetAllSummaryReportOTC()
        {
            using (var Repo = _formFactory.FormularySummary())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    List<spSumRptOTC_GetAll_Result> alist = new List<spSumRptOTC_GetAll_Result>() { };

                    spSumRptOTC_GetAll_Result s1 = new spSumRptOTC_GetAll_Result()
                    {
                        SumRptOTCName = "",                     
                    };

                    spSumRptOTC_GetAll_Result s2 = new spSumRptOTC_GetAll_Result()
                    {
                        SumRptOTCName = "matt",                       
                    };

                    alist.Add(s1);
                    alist.Add(s2);

                    SumRptOTC aSumRptOTC = new SumRptOTC()
                    {
                        SumRptOTCName="matt",
                        EfctvStartDt=DateTime.Now,
                        EfctvEndDt=DateTime.Now,
                        CreatedBy="system",
                        LastModfdBy="system",
                        InctvTs=null,
                        DelTs=null
                    };

                    _refEntities.SumRptOTC.Add(aSumRptOTC);
                    _refEntities.SaveChanges();

                    var actual = Repo.GetAllSummaryReportOTC();
                    var actualRpt = actual.LastOrDefault(s => s.SumRptOTCName == s2.SumRptOTCName);

                    Assert.AreEqual(actualRpt.SumRptOTCName, alist.LastOrDefault().SumRptOTCName);

                    _refEntities.SumRptOTC.Remove(aSumRptOTC);
                    _refEntities.SaveChanges();

                }
            }

        }

        [TestMethod]
        public void ShouldGetSummaryReportConfigSection()
        {
            using (var Repo = _formFactory.FormularySummary())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {

                    List<spSumRptSctn_Get_Result> aList = new List<spSumRptSctn_Get_Result>();

                    spSumRptSctn_Get_Result result1 = new spSumRptSctn_Get_Result()
                    {
                        SctnCfgJSON = "",
                        SumRptSctnSK = 5
                    };

                    spSumRptSctn_Get_Result result2 = new spSumRptSctn_Get_Result()
                    {
                        SctnCfgJSON = "{blahblah}",
                        SumRptSctnSK = 5
                    };

                    SumRptCfgSctn aSumRptCfgSctn = new SumRptCfgSctn()
                    {
                        SumRptCfgSK=21,
                        SumRptSctnSK=5,
                        SctnCfgJSON = "{blahblah}",
                        SctnSortOrder=3,
                        SSRSTmplName=null,
                        EfctvStartDt=DateTime.Now,
                        EfctvEndDt=DateTime.Now,
                        CreatedBy = "matt",
                        LastModfdBy = "matt",
                        InctvTs=null,
                        DelTs=null                  
                    };

                    aList.Add(result1);
                    aList.Add(result2);

                    try
                    {
                        _refEntities.SumRptCfgSctn.Add(aSumRptCfgSctn);
                        _refEntities.SaveChanges();
                    }
                    catch (DbEntityValidationException ex)
                    {
                        // Retrieve the error messages as a list of strings.
                        var errorMessages = ex.EntityValidationErrors
                                .SelectMany(x => x.ValidationErrors)
                                .Select(x => x.ErrorMessage);

                        // Join the list to a single string.
                        var fullErrorMessage = string.Join("; ", errorMessages);

                        // Combine the original exception message with the new one.
                        var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                        // Throw a new DbEntityValidationException with the improved exception message.
                        throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
                    }

                    var summaryReportConfigSectionSK = _refEntities.SumRptCfgSctn.Max(s => s.SumRptCfgSctnSK);
                    
                    var actualRpt = Repo.GetSummaryReportConfigSection(summaryReportConfigSectionSK);
                    
                    Assert.AreEqual(actualRpt.SumRptSctnSK, aList.LastOrDefault().SumRptSctnSK);
                    Assert.AreEqual(actualRpt.SctnCfgJSON, aList.LastOrDefault().SctnCfgJSON);

                    _refEntities.SumRptCfgSctn.Remove(aSumRptCfgSctn);
                    _refEntities.SaveChanges();

                }
            }

        }

        [TestMethod]
        public void ShouldGetSelectedSummaryReportConfigSection()
        {
            using (var Repo = _formFactory.FormularySummary())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {

                    var min = _refEntities.SumRptCfgSctn.Min(s => s.SumRptCfgSK);
                    long summaryReportConfigSK = min;

                    SumRptCfgSctn aSumRptCfgSctn = new SumRptCfgSctn()
                    {                      
                        SumRptCfgSK= summaryReportConfigSK,
                        SumRptSctnSK=7,   //ST Section in AtlasFormulary_ReferenceData.dbo.SumRptScn
                        SctnCfgJSON = "{\"SumRptOrgBySK\":1}",
                        CreatedBy="matt",
                        LastModfdBy="matt"
                    };

                    _refEntities.SumRptCfgSctn.Add(aSumRptCfgSctn);
                    _refEntities.SaveChanges();
                  
                    var actual = Repo.GetSelectedSummaryReportConfigSection(summaryReportConfigSK);

                    var maxSumRptCfgSctnSK = actual.Max(s => s.SumRptCfgSctnSK);
                    var actualRpt = actual.FindAll(s => s.SumRptCfgSctnSK == maxSumRptCfgSctnSK);

                    List<spSumRptCfgSctn_GetSelected_Result> aList = new List<spSumRptCfgSctn_GetSelected_Result>() { };

                    spSumRptCfgSctn_GetSelected_Result s1 = new spSumRptCfgSctn_GetSelected_Result()
                    {
                        SumRptCfgSctnSK = 22,
                        SumRptSctnName = "",
                        SumRptSctnSK = 1
                    };

                    spSumRptCfgSctn_GetSelected_Result s2 = new spSumRptCfgSctn_GetSelected_Result()
                    {
                        SumRptCfgSctnSK = maxSumRptCfgSctnSK,
                        SumRptSctnName = "ST Section",
                        SumRptSctnSK = aSumRptCfgSctn.SumRptSctnSK

                    };

                    aList.Add(s1);
                    aList.Add(s2);

                    Assert.AreEqual(actualRpt.FirstOrDefault().SumRptSctnName, aList.LastOrDefault().SumRptSctnName);
                    Assert.AreEqual(actualRpt.FirstOrDefault().SumRptCfgSctnSK, aList.LastOrDefault().SumRptCfgSctnSK);
                    Assert.AreEqual(actualRpt.FirstOrDefault().SumRptSctnSK, aList.LastOrDefault().SumRptSctnSK);

                    _refEntities.SumRptCfgSctn.Remove(aSumRptCfgSctn);
                    _refEntities.SaveChanges();
                }
            }
        }

        [TestMethod]
        public void ShouldGetUnselectedSummaryReportConfigSection()
        {
            using (var Repo = _formFactory.FormularySummary())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    var m = _refEntities.SumRptCfg.Max(f => f.SumRptCfgSK);  //24
                    var maxSumRptCfgSK = m + 1;  //25

                    SumRptCfg aSumRptCfg = new SumRptCfg()
                    {
                        SumRptCfgSK = maxSumRptCfgSK,
                        CreatedBy="matt",
                        LastModfdBy="matt"                                        
                    };

                    _refEntities.SumRptCfg.Add(aSumRptCfg);

                    SumRptCfgSctn y1 = new SumRptCfgSctn()
                    {
                        SumRptCfgSK=maxSumRptCfgSK,
                        SumRptSctnSK=1,
                        CreatedBy="matt",
                        LastModfdBy="matt"
                    };

                    SumRptCfgSctn y2 = new SumRptCfgSctn()
                    {
                        SumRptCfgSK = maxSumRptCfgSK,
                        SumRptSctnSK = 2,
                        CreatedBy = "matt",
                        LastModfdBy = "matt"
                    };

                    SumRptCfgSctn y3 = new SumRptCfgSctn()
                    {
                        SumRptCfgSK = maxSumRptCfgSK,
                        SumRptSctnSK = 3,
                        CreatedBy = "matt",
                        LastModfdBy = "matt"
                    };

                    SumRptCfgSctn y4 = new SumRptCfgSctn()
                    {
                        SumRptCfgSK = maxSumRptCfgSK,
                        SumRptSctnSK = 4,
                        CreatedBy = "matt",
                        LastModfdBy = "matt"
                    };

                    SumRptCfgSctn y5 = new SumRptCfgSctn()
                    {
                        SumRptCfgSK = maxSumRptCfgSK,
                        SumRptSctnSK = 5,
                        CreatedBy = "matt",
                        LastModfdBy = "matt"
                    };

                    _refEntities.SumRptCfgSctn.Add(y1);
                    _refEntities.SumRptCfgSctn.Add(y2);
                    _refEntities.SumRptCfgSctn.Add(y3);
                    _refEntities.SumRptCfgSctn.Add(y4);
                    _refEntities.SumRptCfgSctn.Add(y5);
                    _refEntities.SaveChanges();

                    spSumRptCfgSctn_GetUnselected_Result s6 = new spSumRptCfgSctn_GetUnselected_Result()
                    {
                        SumRptSctnSK = 6,
                        SumRptSctnName = "PA Section"
                    };

                    spSumRptCfgSctn_GetUnselected_Result s7 = new spSumRptCfgSctn_GetUnselected_Result()
                    {
                        SumRptSctnSK = 7,
                        SumRptSctnName = "ST Section"
                    };

                    spSumRptCfgSctn_GetUnselected_Result s8 = new spSumRptCfgSctn_GetUnselected_Result()
                    {
                        SumRptSctnSK = 8,
                        SumRptSctnName = "Custom Back Text"
                    };

                    var maxCfgSK = _refEntities.SumRptCfgSctn.Max(s => s.SumRptCfgSK);
                    var result = Repo.GetUnselectedSummaryReportConfigSection(maxCfgSK); //SumRptSctnSK should be 6,7,8
                 
                    Assert.AreEqual(result[0].SumRptSctnSK, s6.SumRptSctnSK);
                    Assert.AreEqual(result[0].SumRptSctnName, s6.SumRptSctnName);

                    Assert.AreEqual(result[1].SumRptSctnSK, s7.SumRptSctnSK);
                    Assert.AreEqual(result[1].SumRptSctnName, s7.SumRptSctnName);

                    Assert.AreEqual(result[2].SumRptSctnSK, s8.SumRptSctnSK);
                    Assert.AreEqual(result[2].SumRptSctnName, s8.SumRptSctnName);

                    _refEntities.SumRptCfgSctn.Remove(y5);
                    _refEntities.SumRptCfgSctn.Remove(y4);
                    _refEntities.SumRptCfgSctn.Remove(y3);
                    _refEntities.SumRptCfgSctn.Remove(y2);
                    _refEntities.SumRptCfgSctn.Remove(y1);

                    _refEntities.SumRptCfg.Remove(aSumRptCfg);

                    _refEntities.SaveChanges();

                }
            }

        }

        [TestMethod]
        public void ShouldGetAllFileFormats()
        {
            using (var Repo = _formFactory.FormularySummary())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    FileFmt aFileFmt = new FileFmt()
                    {
                        FileFmtName="matt",
                        FileFmtExt=".matt",
                        CreatedBy="system",
                        LastModfdBy="system",
                        InctvTs=null,
                        DelTs=null,
                        EfctvStartDt=DateTime.Today.AddDays(-2),
                        EfctvEndDt=DateTime.Today.AddDays(+2)
                    };

                    _refEntities.FileFmt.Add(aFileFmt);
                    _refEntities.SaveChanges();

                    List<spFileFormat_GetAll_Result> alist = new List<spFileFormat_GetAll_Result>() { };

                    spFileFormat_GetAll_Result s1 = new spFileFormat_GetAll_Result()
                    {
                        FileFmtExt = ".PDF",
                        FileFmtName = "PDF",
                        FileFmtSK = 1
                    };

                    spFileFormat_GetAll_Result s2 = new spFileFormat_GetAll_Result()
                    {
                        FileFmtExt = ".matt",
                        FileFmtName = "matt",                      
                    };

                    alist.Add(s1);
                    alist.Add(s2);

                    var actual = Repo.GetAllFileFormats();
                    var actualRpt = actual.FindAll(s=>s.FileFmtExt == ".matt");
                   
                    Assert.AreEqual(actualRpt.FirstOrDefault().FileFmtExt, s2.FileFmtExt);
                    Assert.AreEqual(actualRpt.FirstOrDefault().FileFmtName, s2.FileFmtName);

                    _refEntities.FileFmt.Remove(aFileFmt);
                    _refEntities.SaveChanges();
                }
            }

        }

        [TestMethod]
        public void ShouldGetAllLanguages()
        {
            using (var Repo = _formFactory.FormularySummary())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    Lang aLang = new Lang()
                    {
                        LangName = "matt",                       
                        CreatedBy = "system",
                        LastModfdBy = "system",
                        InctvTs = null,
                        DelTs = null,
                        EfctvStartDt = DateTime.Today.AddDays(-2),
                        EfctvEndDt = DateTime.Today.AddDays(+2)
                    };

                    _refEntities.Lang.Add(aLang);
                    _refEntities.SaveChanges();

                    List<spLanguage_GetAll_Result> alist = new List<spLanguage_GetAll_Result>() { };

                    spLanguage_GetAll_Result s1 = new spLanguage_GetAll_Result()
                    {
                        LangSK = 1,
                        LangName = "sam",                       
                    };

                    spLanguage_GetAll_Result s2 = new spLanguage_GetAll_Result()
                    {
                        LangSK = 2,
                        LangName = "matt",
                    };

                    alist.Add(s1);
                    alist.Add(s2);

                    var actual = Repo.GetAllLanguages();
                    var actualRpt = actual.FindAll(s => s.LangName == "matt");

                    Assert.AreEqual(actualRpt.FirstOrDefault().LangName, s2.LangName);
                    
                    _refEntities.Lang.Remove(aLang);
                    _refEntities.SaveChanges();
                }
            }

        }

        [TestMethod]
        public void ShouldGetAllFontSizes()
        {
            using (var Repo = _formFactory.FormularySummary())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    FontSize aFS = new FontSize()
                    {
                        FontSizeName = "matt",
                        FontSizeValue=200,
                        CreatedBy = "system",
                        LastModfdBy = "system",
                        EfctvStartDt = DateTime.Today.AddDays(-2),
                        EfctvEndDt = DateTime.Today.AddDays(+2),
                        InctvTs = null,
                        DelTs = null,
                        
                    };

                    _refEntities.FontSize.Add(aFS);
                    _refEntities.SaveChanges();

                    List<spFontSize_GetAll_Result> alist = new List<spFontSize_GetAll_Result>() { };

                    spFontSize_GetAll_Result s1 = new spFontSize_GetAll_Result()
                    {
                        FontSizeSK = 1,
                        FontSizeName = "sam",
                        FontSizeValue=1
                    };

                    spFontSize_GetAll_Result s2 = new spFontSize_GetAll_Result()
                    {
                        FontSizeSK=4,
                        FontSizeName = "matt",
                        FontSizeValue = 200,
                    };

                    alist.Add(s1);
                    alist.Add(s2);

                    var actual = Repo.GetAllFontSizes();
                    var actualRpt = actual.FindAll(s => s.FontSizeName == "matt");

                    Assert.AreEqual(actualRpt.FirstOrDefault().FontSizeName, s2.FontSizeName);
                    Assert.AreEqual(actualRpt.FirstOrDefault().FontSizeValue, s2.FontSizeValue);

                    _refEntities.FontSize.Remove(aFS);
                    _refEntities.SaveChanges();
                }
            }
        }

        [TestMethod]
        public void ShouldGetAllTierDisplays()
        {
            using (var Repo = _formFactory.FormularySummary())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    TierDispl aTD = new TierDispl()
                    {
                        TierDisplName = "matt",
                        CreatedBy = "system",
                        LastModfdBy = "system",
                        EfctvStartDt = DateTime.Today.AddDays(-2),
                        EfctvEndDt = DateTime.Today.AddDays(+2),
                        InctvTs = null,
                        DelTs = null,

                    };

                    _refEntities.TierDispl.Add(aTD);
                    _refEntities.SaveChanges();

                    List<spTierDispl_GetAll_Result> alist = new List<spTierDispl_GetAll_Result>() { };

                    spTierDispl_GetAll_Result s1 = new spTierDispl_GetAll_Result()
                    {
                        TierDisplSK = 1,
                        TierDisplName = "sam",
                        
                    };

                    spTierDispl_GetAll_Result s2 = new spTierDispl_GetAll_Result()
                    {
                        TierDisplSK = 2,
                        TierDisplName = "matt",
                        
                    };

                    alist.Add(s1);
                    alist.Add(s2);

                    var actual = Repo.GetAllTierDisplays();
                    var actualRpt = actual.FindAll(s => s.TierDisplName == "matt");

                    Assert.AreEqual(actualRpt.FirstOrDefault().TierDisplName, s2.TierDisplName);
                    Assert.AreNotEqual(actualRpt.FirstOrDefault().TierDisplName, s1.TierDisplName);

                    _refEntities.TierDispl.Remove(aTD);
                    _refEntities.SaveChanges();
                }
            }
            
        }
        
        [TestMethod]
        public void ShouldGetSummaryReportCoverageProperty()
        {
            using (var Repo = _formFactory.FormularySummary())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    SumRptCfgCvrgPrptyType aSR = new SumRptCfgCvrgPrptyType()
                    {                      
                        SumRptCfgSK =24,
                        CvrgPrptyTypeSK =25,
                        CvrgPrptyTypeCode ="mattc",
                        CvrgPrptyTypeDesc = "mattd",                     
                        CreatedBy = "matt",
                        LastModfdBy = "matt",
                        EfctvStartDt = DateTime.Today.AddDays(-2),
                        EfctvEndDt = DateTime.Today.AddDays(+2),
                        InctvTs = null,
                        DelTs = null,
                    };

                    _refEntities.SumRptCfgCvrgPrptyType.Add(aSR);
                    _refEntities.SaveChanges();

                    List<spSumRptCfgCvrgPrptyType_Get_Result> alist = new List<spSumRptCfgCvrgPrptyType_Get_Result>() { };

                    spSumRptCfgCvrgPrptyType_Get_Result s1 = new spSumRptCfgCvrgPrptyType_Get_Result()
                    {
                        SumRptCfgCvrgPrptyTypeSK = 1,
                        SumRptCfgSK=23,
                        CvrgPrptyTypeSK=23,
                        Coverage_Code="sam",
                        Coverage_Description="sam",
                        Display_Code = null,
                        Display_Description = null
                    };

                    spSumRptCfgCvrgPrptyType_Get_Result s2 = new spSumRptCfgCvrgPrptyType_Get_Result()
                    {
                        SumRptCfgCvrgPrptyTypeSK = 2,
                        SumRptCfgSK = 24,
                        CvrgPrptyTypeSK = 25,
                        Coverage_Code = "",
                        Coverage_Description = "",
                        Display_Code = "mattc",
                        Display_Description = "mattd"
                    };

                    alist.Add(s1);
                    alist.Add(s2);

                    var actual = Repo.GetSummaryReportCoverageProperty(aSR.SumRptCfgSK);
                    var actualRpt = actual.FindAll(s => s.Display_Code == "mattc");

                    Assert.AreEqual(actualRpt.FirstOrDefault().SumRptCfgSK, s2.SumRptCfgSK);
                    Assert.AreNotEqual(actualRpt.FirstOrDefault().Coverage_Code, s1.Coverage_Code);

                    Assert.AreEqual(actualRpt.FirstOrDefault().Display_Code, s2.Display_Code);
                    Assert.AreEqual(actualRpt.FirstOrDefault().Display_Description, s2.Display_Description);

                    _refEntities.SumRptCfgCvrgPrptyType.Remove(aSR);
                    _refEntities.SaveChanges();
                }
            }
        }



    }
}
