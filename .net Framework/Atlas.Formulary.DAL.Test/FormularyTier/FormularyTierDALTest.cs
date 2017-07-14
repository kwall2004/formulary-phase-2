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


namespace Atlas.Formulary.DAL.Test.FormularyTier
{
    [TestClass]
    public class FormularyTierDALTest
    {

        private IConfig _config;
        private FormularyEntities _formularyEntities;
        private IFormularyRepositoryFactory _formFactory;

        private IReferenceRepositoryFactory _refFactory;
        private ReferenceEntities _refEntities;

        private IFormularyRepository formularyRepo;
        private IFormularyTierRepository tierRepo;
        private spFormulary_GetHeader_Result formulary;
        private TierNamesVM tierVM;
        private long formularySK;

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
        public void ShouldPutFormularyTierNames()
        {
            using (tierRepo = _formFactory.DrugTier())
            {
                using (formularyRepo = _formFactory.Formulary())
                {
                    //ARRANGE
                    var originalTimeout = _formularyEntities.Database.CommandTimeout;
                    _formularyEntities.Database.CommandTimeout = 180; //added this because this stored proc kept hitting timeoutexception 
                    InitializeData();
                    _formularyEntities.Database.CommandTimeout = originalTimeout;

                    //ACT
                    var tierNames = tierRepo.GetFormularyTierNames(formularySK);
                    var record = tierNames.Find(a => a.FrmlryTierName == "Generic");

                    //ASSERT
                    Assert.IsNotNull(tierNames);
                    Assert.IsNotNull(record);
                    Assert.AreEqual(record.FrmlrySK, formularySK);
                    Assert.AreEqual(record.FrmlryTierName, "Generic");
                    Assert.AreEqual(record.FrmlryTierNbr, 1);
                    Assert.AreEqual(record.EfctvStartDt, tierVM.EffectiveStartDate);
                    Assert.AreEqual(record.EfctvEndDt, tierVM.EffectiveEndDate);
                    Assert.AreEqual(record.CreatedBy, tierVM.UserID);
                    Assert.AreEqual(record.LastModfdBy, tierVM.UserID);
                    DeleteData();
                }
            }           
        }
       
        [TestMethod]
        public void ShouldGetFormularyTierNames()
        {
            using (tierRepo = _formFactory.DrugTier())
            {
                using (formularyRepo = _formFactory.Formulary())
                {
                                                           
                    FrmlryTier aFrmlryTier = new FrmlryTier()
                    {
                                             
                        FrmlrySK =41717,
                        FrmlryTierName="Brand3_28_1227pm", 
                        FrmlryTierDesc ="Brand3_28_1227pm",
                        FrmlryTierNbr =1,
                        EfctvStartDt =new DateTime(2017,03,28),
                        EfctvEndDt =new DateTime(2017,03,28),
                        CreatedBy ="jsmith",
                        //CreatedTs ="",
                        LastModfdBy ="jsmith",
                        //LastModfdTs ="",
                        InctvTs =null,
                        DelTs =null

                    };

                    _formularyEntities.FrmlryTier.Add(aFrmlryTier);
                    _formularyEntities.SaveChanges();

                    var maxFrmlryTierSK = _formularyEntities.FrmlryTier.Max(x => x.FrmlryTierSK);                    
                    var tierNames = tierRepo.GetFormularyTierNames(aFrmlryTier.FrmlrySK).Where(x => x.FrmlryTierSK == maxFrmlryTierSK);
                                                   
                    Assert.IsNotNull(tierNames);
                    Assert.AreEqual(tierNames.LastOrDefault().FrmlryTierSK, aFrmlryTier.FrmlryTierSK);
                    Assert.AreEqual(tierNames.LastOrDefault().FrmlrySK, aFrmlryTier.FrmlrySK);
                    Assert.AreEqual(tierNames.LastOrDefault().FrmlryTierName, aFrmlryTier.FrmlryTierName);
                    Assert.AreEqual(tierNames.LastOrDefault().FrmlryTierDesc, aFrmlryTier.FrmlryTierDesc);
                    Assert.AreEqual(tierNames.LastOrDefault().FrmlryTierNbr, aFrmlryTier.FrmlryTierNbr);
                    Assert.AreEqual(tierNames.LastOrDefault().EfctvStartDt, aFrmlryTier.EfctvStartDt);
                    Assert.AreEqual(tierNames.LastOrDefault().EfctvEndDt, aFrmlryTier.EfctvEndDt);
                    Assert.AreEqual(tierNames.LastOrDefault().CreatedBy, aFrmlryTier.CreatedBy);
                    Assert.AreEqual(tierNames.LastOrDefault().LastModfdBy, aFrmlryTier.LastModfdBy);
                    Assert.AreEqual(tierNames.LastOrDefault().InctvTs, aFrmlryTier.InctvTs);
                    Assert.AreEqual(tierNames.LastOrDefault().DelTs, aFrmlryTier.DelTs);

                    _formularyEntities.FrmlryTier.Remove(aFrmlryTier);
                    _formularyEntities.SaveChanges();

                }
            }
        }

        private void InitializeData()
        {
            formulary = new spFormulary_GetHeader_Result { AutomaticallyAssignNewNDCsInd = true, CreatedBy = "TheBatman", CreatedTs = DateTime.Today, DrugPostObsltAlwdDays = 365, DrugRefDbSK = 1, DrugThrputcClsTypeSK = 1, LastModfdBy = "TheBatman", LastModfdTs = DateTime.Today, EfctvStartDt = DateTime.Today, EfctvEndDt = DateTime.Parse("12/30/2017"), FrmlryName = "My General Integration Test Formulary", FrmlrySK = 0, FrmlryID = "0", FrmlryVer = 1, IsExcludeOTC = true, LOBSK = 1, PlanType = "PDP", DrugTypeFunction = "FDBStd", SumRptCfgSK=1 };
            formularySK = formularyRepo.PutFormularyHeader(null, formulary.LOBSK, formulary.DrugThrputcClsTypeSK, formulary.DrugRefDbSK, formulary.DrugPostObsltAlwdDays, formulary.FrmlryName, formulary.EfctvStartDt.Value, formulary.EfctvEndDt.Value, formulary.PlanType, formulary.DrugTypeFunction, formulary.IsExcludeOTC, "TheBatman", null, "1,2,3,4,5", 1, "1", null, null, true, formulary.SumRptCfgSK);    
            tierVM = new TierNamesVM { EffectiveEndDate = DateTime.Parse("12/30/2017"), EffectiveStartDate = DateTime.Today, FormularySK = formularySK, TierName_List = "Non-Formulary,Generic,Brand", TierNumber_List = "99,1,2", UserID = "TheBatman" };
            tierRepo.PutFormularyTierNames(tierVM); 
        }

        private void DeleteData()
        {
            if (formularySK != 0)
            {
                formularyRepo.DeleteFormulary(formularySK);
                formularySK = 0;
                formulary.FrmlrySK = 0;
            }             
        }
    }
}
