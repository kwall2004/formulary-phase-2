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

namespace Atlas.Formulary.DAL.Test.DrugCategory
{
    [TestClass]
    public class DrugCategoryDALTest
    {

        private IConfig _config;
        private FormularyEntities _formularyEntities;
        private IFormularyRepositoryFactory _formFactory;
        private IReferenceRepositoryFactory _refFactory;
        private ReferenceEntities _refEntities;

        private IDrugCategoryRepository drugCategoryRepo;
        private IFormularyRepository formularyRepo;
        private IFormularyTierRepository tierRepo;
        private spCoverageProperties_Get_Result coverageProperties;
        private long formularySK;
        private long drugCategorySK;
        private long tierSK;



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
        public void ShouldGetCoverageProperties()
        {
            using (drugCategoryRepo = _formFactory.DrugCategory())
            using (formularyRepo = _formFactory.Formulary())
            using (tierRepo = _formFactory.DrugTier())
            {
                //Arrange
                InitializeData(true, true, true);

                //Act
                var drugCoverageResult = drugCategoryRepo.GetCoverageProperties(coverageProperties.DrugCatgSK).FirstOrDefault();

                //Assert
                Assert.IsNotNull(drugCoverageResult);
                Assert.AreEqual(coverageProperties.AgeLimitMax, drugCoverageResult.AgeLimitMax);
                Assert.AreEqual(coverageProperties.AgeLimitMin, drugCoverageResult.AgeLimitMin);
                Assert.AreEqual(coverageProperties.AgeLimitType, drugCoverageResult.AgeLimitType);
                Assert.AreEqual(coverageProperties.DaysSupplyFillPerPeriod, drugCoverageResult.DaysSupplyFillPerPeriod);
                Assert.AreEqual(coverageProperties.DaysSupplyFillQty, drugCoverageResult.DaysSupplyFillQty);
                Assert.AreEqual(coverageProperties.DaysSupplyPeriodType, drugCoverageResult.DaysSupplyPeriodType);
                Assert.AreEqual(coverageProperties.DrugCatgSK, drugCoverageResult.DrugCatgSK);
                Assert.AreEqual(coverageProperties.ExtendedDaysSupply, drugCoverageResult.ExtendedDaysSupply);
                Assert.AreEqual(coverageProperties.FemaleAgeLimitMax, drugCoverageResult.FemaleAgeLimitMax);
                Assert.AreEqual(coverageProperties.FemaleAgeLimitMin, drugCoverageResult.FemaleAgeLimitMin);
                Assert.AreEqual(coverageProperties.FemaleAgeLimitType, drugCoverageResult.FemaleAgeLimitType);
                Assert.AreEqual(coverageProperties.FrmlrySK, drugCoverageResult.FrmlrySK);
                Assert.AreEqual(coverageProperties.FrmlryTierSK, drugCoverageResult.FrmlryTierSK);
                Assert.AreEqual(coverageProperties.Gender, drugCoverageResult.Gender);
                Assert.AreEqual(coverageProperties.IsCovered, drugCoverageResult.IsCovered);
                Assert.AreEqual(coverageProperties.IsMaintenanceDrug, drugCoverageResult.IsMaintenanceDrug);
                Assert.AreEqual(coverageProperties.IsMedicaidCarveOut, drugCoverageResult.IsMedicaidCarveOut);
                Assert.AreEqual(coverageProperties.IsMedicaidFeeScreen, drugCoverageResult.IsMedicaidFeeScreen);
                Assert.AreEqual(coverageProperties.IsOverrideGenericCheck, drugCoverageResult.IsOverrideGenericCheck);
                Assert.AreEqual(coverageProperties.IsRestrictToPkgSize, drugCoverageResult.IsRestrictToPkgSize);
                Assert.AreEqual(coverageProperties.IsSpeciality, drugCoverageResult.IsSpeciality);
                Assert.AreEqual(coverageProperties.IsSTRequired, drugCoverageResult.IsSTRequired);
                Assert.AreEqual(coverageProperties.MaleAgeLimitMax, drugCoverageResult.MaleAgeLimitMax);
                Assert.AreEqual(coverageProperties.MaleAgeLimitMin, drugCoverageResult.MaleAgeLimitMin);
                Assert.AreEqual(coverageProperties.MaleAgeLimitType, drugCoverageResult.MaleAgeLimitType);
                Assert.AreEqual(coverageProperties.MaxFillPeriodType, drugCoverageResult.MaxFillPeriodType);
                Assert.AreEqual(coverageProperties.MaxFillPerPeriod, drugCoverageResult.MaxFillPerPeriod);
                Assert.AreEqual(coverageProperties.MaxFillQty, drugCoverageResult.MaxFillQty);
                Assert.AreEqual(coverageProperties.PAAgeLimitType, drugCoverageResult.PAAgeLimitType);
                Assert.AreEqual(coverageProperties.PAInd, drugCoverageResult.PAInd);
                Assert.AreEqual(coverageProperties.PAMaxAge, drugCoverageResult.PAMaxAge);
                Assert.AreEqual(coverageProperties.PAMinAge, drugCoverageResult.PAMinAge);
                Assert.AreEqual(coverageProperties.PAName, drugCoverageResult.PAName);
                Assert.AreEqual(coverageProperties.PDFMessage, drugCoverageResult.PDFMessage);
                Assert.AreEqual(coverageProperties.PDLStatus, drugCoverageResult.PDLStatus);
                Assert.AreEqual(coverageProperties.QLFillPeriodType, drugCoverageResult.QLFillPeriodType);
                Assert.AreEqual(coverageProperties.QLFillPerPeriod, drugCoverageResult.QLFillPerPeriod);
                Assert.AreEqual(coverageProperties.QLFillQty, drugCoverageResult.QLFillQty);
                Assert.AreEqual(coverageProperties.StepTherapyName, drugCoverageResult.StepTherapyName);
                Assert.AreEqual(coverageProperties.TierCode, drugCoverageResult.TierCode);
                Assert.AreEqual(coverageProperties.UserId, drugCoverageResult.UserId);
                Assert.AreEqual(coverageProperties.UserNotes, drugCoverageResult.UserNotes);

                DeleteData();

            }
        }

        [TestMethod]
        public void ShouldSetCoverageProperties()
        {
            using (drugCategoryRepo = _formFactory.DrugCategory())
            using (tierRepo = _formFactory.DrugTier())
            using (formularyRepo = _formFactory.Formulary())
            {
                //ARRANGE
                InitializeData(true, true, false);
                coverageProperties = new spCoverageProperties_Get_Result
                {
                    DrugCatgSK = drugCategorySK,
                    FrmlrySK = formularySK,
                    FrmlryTierSK = tierSK,
                    DrugCatgName = "",
                    TierCode = 1,
                    IsCovered = false,
                    IsOverrideGenericCheck = true,
                    IsSpeciality = false,
                    IsRestrictToPkgSize = false,
                    Gender = "MALE",
                    AgeLimitMin = 10,
                    AgeLimitMax = 100,
                    AgeLimitType = "AGE",
                    UserNotes = "This is my Integration Test note!!",
                    UserId = "TheBatman",
                    DaysSupplyFillPerPeriod = 10,
                    DaysSupplyFillQty = 10,
                    DaysSupplyPeriodType = "GEN",
                    ExtendedDaysSupply = 100,
                    FemaleAgeLimitMax = 20,
                    FemaleAgeLimitMin = 10,
                    FemaleAgeLimitType = "AGELIMIT",
                    IsMaintenanceDrug = true,
                    IsMedicaidCarveOut = false,
                    IsMedicaidFeeScreen = true,
                    IsSTRequired = true,
                    MaleAgeLimitMax = 123,
                    MaleAgeLimitMin = 5,
                    MaleAgeLimitType = "AGELIMIT",
                    MaxFillPeriodType = "NOT",
                    MaxFillPerPeriod = 100,
                    MaxFillQty = 100,
                    PAAgeLimitType = "PALIMIT",
                    PAInd = true,
                    PAMaxAge = 100,
                    PAMinAge = 10,
                    PAName = "NAME",
                    PDFMessage = "MESSAGE",
                    PDLStatus = "STATUS",
                    QLFillPeriodType = "GEN",
                    QLFillPerPeriod = 10,
                    QLFillQty = 10,
                    StepTherapyName = "ST"
                };

                //ACT
                int sk = drugCategoryRepo.SetCoverageProperties(coverageProperties);
                var dbCoverageProperties = drugCategoryRepo.GetCoverageProperties(coverageProperties.DrugCatgSK).ToList().FirstOrDefault();

                //ASSERT
                Assert.IsNotNull(dbCoverageProperties);
                Assert.AreEqual(dbCoverageProperties.AgeLimitMax, coverageProperties.AgeLimitMax);
                Assert.AreEqual(dbCoverageProperties.AgeLimitMin, coverageProperties.AgeLimitMin);
                Assert.AreEqual(dbCoverageProperties.AgeLimitType, coverageProperties.AgeLimitType);
                Assert.AreEqual(dbCoverageProperties.DaysSupplyFillPerPeriod, coverageProperties.DaysSupplyFillPerPeriod);
                Assert.AreEqual(dbCoverageProperties.DaysSupplyFillQty, coverageProperties.DaysSupplyFillQty);
                Assert.AreEqual(dbCoverageProperties.DaysSupplyPeriodType, coverageProperties.DaysSupplyPeriodType);
                Assert.AreEqual(dbCoverageProperties.DrugCatgSK, coverageProperties.DrugCatgSK);
                Assert.AreEqual(dbCoverageProperties.ExtendedDaysSupply, coverageProperties.ExtendedDaysSupply);
                Assert.AreEqual(dbCoverageProperties.FemaleAgeLimitMax, coverageProperties.FemaleAgeLimitMax);
                Assert.AreEqual(dbCoverageProperties.FemaleAgeLimitMin, coverageProperties.FemaleAgeLimitMin);
                Assert.AreEqual(dbCoverageProperties.FemaleAgeLimitType, coverageProperties.FemaleAgeLimitType);
                Assert.AreEqual(dbCoverageProperties.FrmlrySK, coverageProperties.FrmlrySK);
                Assert.AreEqual(dbCoverageProperties.FrmlryTierSK, coverageProperties.FrmlryTierSK);
                Assert.AreEqual(dbCoverageProperties.Gender, coverageProperties.Gender);
                Assert.AreEqual(dbCoverageProperties.IsCovered, coverageProperties.IsCovered);
                Assert.AreEqual(dbCoverageProperties.IsMaintenanceDrug, coverageProperties.IsMaintenanceDrug);
                Assert.AreEqual(dbCoverageProperties.IsMedicaidCarveOut, coverageProperties.IsMedicaidCarveOut);
                Assert.AreEqual(dbCoverageProperties.IsMedicaidFeeScreen, coverageProperties.IsMedicaidFeeScreen);
                Assert.AreEqual(dbCoverageProperties.IsOverrideGenericCheck, coverageProperties.IsOverrideGenericCheck);
                Assert.AreEqual(dbCoverageProperties.IsRestrictToPkgSize, coverageProperties.IsRestrictToPkgSize);
                Assert.AreEqual(dbCoverageProperties.IsSpeciality, coverageProperties.IsSpeciality);
                Assert.AreEqual(dbCoverageProperties.IsSTRequired, coverageProperties.IsSTRequired);
                Assert.AreEqual(dbCoverageProperties.MaleAgeLimitMax, coverageProperties.MaleAgeLimitMax);
                Assert.AreEqual(dbCoverageProperties.MaleAgeLimitMin, coverageProperties.MaleAgeLimitMin);
                Assert.AreEqual(dbCoverageProperties.MaleAgeLimitType, coverageProperties.MaleAgeLimitType);
                Assert.AreEqual(dbCoverageProperties.MaxFillPeriodType, coverageProperties.MaxFillPeriodType);
                Assert.AreEqual(dbCoverageProperties.MaxFillPerPeriod, coverageProperties.MaxFillPerPeriod);
                Assert.AreEqual(dbCoverageProperties.MaxFillQty, coverageProperties.MaxFillQty);
                Assert.AreEqual(dbCoverageProperties.PAAgeLimitType, coverageProperties.PAAgeLimitType);
                Assert.AreEqual(dbCoverageProperties.PAInd, coverageProperties.PAInd);
                Assert.AreEqual(dbCoverageProperties.PAMaxAge, coverageProperties.PAMaxAge);
                Assert.AreEqual(dbCoverageProperties.PAMinAge, coverageProperties.PAMinAge);
                Assert.AreEqual(dbCoverageProperties.PAName, coverageProperties.PAName);
                Assert.AreEqual(dbCoverageProperties.PDFMessage, coverageProperties.PDFMessage);
                Assert.AreEqual(dbCoverageProperties.PDLStatus, coverageProperties.PDLStatus);
                Assert.AreEqual(dbCoverageProperties.QLFillPeriodType, coverageProperties.QLFillPeriodType);
                Assert.AreEqual(dbCoverageProperties.QLFillPerPeriod, coverageProperties.QLFillPerPeriod);
                Assert.AreEqual(dbCoverageProperties.QLFillQty, coverageProperties.QLFillQty);
                Assert.AreEqual(dbCoverageProperties.StepTherapyName, coverageProperties.StepTherapyName);
                Assert.AreEqual(dbCoverageProperties.TierCode, coverageProperties.TierCode);
                Assert.AreEqual(dbCoverageProperties.UserId, coverageProperties.UserId);
                Assert.AreEqual(dbCoverageProperties.UserNotes, coverageProperties.UserNotes);


                DeleteData();
                    
                
            }
        }

        /*
        [TestMethod]
        public void ShouldGetDrugCategoryCriteria()
        {
            using (drugCategoryRepo = _formFactory.DrugCategory())
            using (tierRepo = _formFactory.DrugTier())
            using (formularyRepo = _formFactory.Formulary())
            {
                //ARRANGE
                InitializeData(true, true, true);
                var expectedDrugCategoryCriteria = new spDrugCatgCrtriaGrp_Get_Result { CrtriaPrity = 0, CrtriaVal = "ADENOVIRUS LIVE TYPE-4 AND ADENOVIRUS LIVE TYPE-7 VACCINE", OperTypeCode = "=", ValQulfrCode = "GENERICNAME" };
                
                //ACT
                var drugCatgCritResults = drugCategoryRepo.GetDrugCategoryCriteria(drugCategorySK);

                //ASSERT
                Assert.AreEqual(drugCatgCritResults.FirstOrDefault().ValQulfrCode, expectedDrugCategoryCriteria.ValQulfrCode);
                Assert.AreEqual(drugCatgCritResults.FirstOrDefault().OperTypeCode, expectedDrugCategoryCriteria.OperTypeCode);
                Assert.AreEqual(drugCatgCritResults.FirstOrDefault().CrtriaPrity, expectedDrugCategoryCriteria.CrtriaPrity);
                Assert.AreEqual(drugCatgCritResults.FirstOrDefault().CrtriaVal, expectedDrugCategoryCriteria.CrtriaVal);

                DeleteData();              
            }
        }*/

        [TestMethod]
        public void ShouldGetAllDrugCategories()
        {
            using (drugCategoryRepo = _formFactory.DrugCategory())
            using (tierRepo = _formFactory.DrugTier())
            using (formularyRepo = _formFactory.Formulary())
            {
                //ARRANGE
                InitializeData(true, true, true);
                
                //ACT
                var drugCategoryResults = drugCategoryRepo.GetAllDrugCategories(formularySK);
                
                //ASSERT
                Assert.AreEqual(drugCategoryResults.FirstOrDefault().DrugCatgSK, coverageProperties.DrugCatgSK);
                Assert.AreEqual(drugCategoryResults.FirstOrDefault().FrmlrySK, coverageProperties.FrmlrySK);
                Assert.AreEqual(drugCategoryResults.FirstOrDefault().FrmlryTierSK, coverageProperties.FrmlryTierSK);
                Assert.AreEqual(drugCategoryResults.FirstOrDefault().CvrdInd, coverageProperties.IsCovered);
                DeleteData();                
            }
        }

        [TestMethod]
        public void ShouldGetDrugCategoryPaged()
        {

            using (drugCategoryRepo = _formFactory.DrugCategory())
            using (tierRepo = _formFactory.DrugTier())
            using (formularyRepo = _formFactory.Formulary())
            {
                //ARRANGE
                InitializeData(true, true, true);
                PagedRequestVM pagedRequest = new PagedRequestVM
                {
                    FormularySK= formularySK,
                    IsNewRequest=true,
                    StartIndex=0,
                    Count=25
                };
                string userID = "TheBatman";
                Guid sessionID = Guid.NewGuid();
                    
                //Act
                var drugCatgPagedResult = drugCategoryRepo.DrugCategoryPaged(pagedRequest,userID,sessionID);

                //Assert
                Assert.IsNotNull(drugCatgPagedResult);
                Assert.AreEqual(drugCatgPagedResult.FirstOrDefault().DrugCatgSK, coverageProperties.DrugCatgSK);
                Assert.AreEqual(drugCatgPagedResult.FirstOrDefault().CvrdInd, coverageProperties.IsCovered);
                Assert.AreEqual(drugCatgPagedResult.FirstOrDefault().FrmlryTierSK, coverageProperties.FrmlryTierSK);
                Assert.AreEqual(drugCatgPagedResult.FirstOrDefault().FrmlrySK, coverageProperties.FrmlrySK);
                Assert.AreEqual(drugCatgPagedResult.FirstOrDefault().TotalCount, 1);

                DeleteData();
                
            }
        }
        
        private void InitializeData(bool addFormulary, bool addDrugCategory, bool addCoverageProperties)
        {
            if(addFormulary)
            {
                formularySK = formularyRepo.PutFormularyHeader(null, 1, 1, 1, 100, "My General Unique Formulary", DateTime.Today, DateTime.Parse("12-30-2017"), "PDP", "FDBStd", false, "TheBatman", null, "1,2", 1, "1", null, null, true,1);
                tierRepo.PutFormularyTierNames(new TierNamesVM { EffectiveEndDate = DateTime.Today, EffectiveStartDate = DateTime.Parse("12-30-2017"), FormularySK = formularySK, TierName_List = "Tier1,Tier2", TierNumber_List = "1,99", UserID = "TheBatman" });
                List<spFormulary_GetTierNames_Result> tiers = formularyRepo.GetTierNames(formularySK).ToList();
                tierSK = tiers.FirstOrDefault().FrmlryTierSK;

                if(addDrugCategory)
                {
                    drugCategoryRepo.SetDrugCategoryCriteria(new DrugCatgCrtriaGrpSP { CriteriaName = "not-covered212907853.027724633567", CvrdInd = false, DrugCatgSK = 0, DrugCatgSK_Upd = 0, FrmlrySK = formularySK, FrmlryTierSK = tiers.FirstOrDefault().FrmlryTierSK, UserId = "TheBatman", tblRules = new List<CriteriaDetailTableType> { new CriteriaDetailTableType { CrtriaPrity = 0, CrtriaVal = "ADENOVIRUS LIVE TYPE-4 AND ADENOVIRUS LIVE TYPE-7 VACCINE", OperTypeCode = "=", ValQulfrCode = "GENERICNAME" } } });
                    drugCategorySK = drugCategoryRepo.GetAllDrugCategories(formularySK).ToList().FirstOrDefault().DrugCatgSK;

                    if(addCoverageProperties)
                    {
                        coverageProperties = new spCoverageProperties_Get_Result
                        {
                            DrugCatgSK = drugCategorySK,
                            FrmlrySK = formularySK,
                            FrmlryTierSK = tierSK,
                            DrugCatgName = "",
                            TierCode = 1,
                            IsCovered = false,
                            IsOverrideGenericCheck = true,
                            IsSpeciality = false,
                            IsRestrictToPkgSize = true,
                            Gender = "GENDER",
                            AgeLimitMin = 10,
                            AgeLimitMax = 1000,
                            AgeLimitType = "AGELIMIT",
                            UserNotes = "This is my Integration Test note.",
                            UserId = "TheBatman",
                            DaysSupplyFillPerPeriod = 10,
                            DaysSupplyFillQty = 10,
                            DaysSupplyPeriodType = "GEN",
                            ExtendedDaysSupply = 100,
                            FemaleAgeLimitMax = 20,
                            FemaleAgeLimitMin = 10,
                            FemaleAgeLimitType = "AGELIMIT",
                            IsMaintenanceDrug = true,
                            IsMedicaidCarveOut = false,
                            IsMedicaidFeeScreen = true,
                            IsSTRequired = true,
                            MaleAgeLimitMax = 123,
                            MaleAgeLimitMin = 5,
                            MaleAgeLimitType = "AGELIMIT",
                            MaxFillPeriodType = "NOT",
                            MaxFillPerPeriod = 100,
                            MaxFillQty = 100,
                            PAAgeLimitType = "AGELIMIT",
                            PAInd = true,
                            PAMaxAge = 100,
                            PAMinAge = 10,
                            PAName = "PANAME",
                            PDFMessage = "MESSAGE",
                            PDLStatus = "STATUS",
                            QLFillPeriodType = "GEN",
                            QLFillPerPeriod = 10,
                            QLFillQty = 10,
                            StepTherapyName = "StepTherapy"
                        };

                        drugCategoryRepo.SetCoverageProperties(coverageProperties);
                    }
                }
            }
        }

        private void DeleteData()
        {
            if (drugCategorySK != 0)
            {
                drugCategoryRepo.DeleteDrugCategory(drugCategorySK);
                drugCategorySK = 0;
                coverageProperties.DrugCatgSK = 0;
            }
            if(formularySK != 0)
            {
                formularyRepo.DeleteFormulary(formularySK);
                formularySK = 0;
                coverageProperties.FrmlrySK = 0;
            }            
        }

    }
}
