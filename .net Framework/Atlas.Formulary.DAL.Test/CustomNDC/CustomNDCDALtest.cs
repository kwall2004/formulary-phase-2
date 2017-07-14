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
using System.Data;

namespace Atlas.Formulary.DAL.Test.CustomNDC
{

   

    [TestClass]
    public class CustomNDCDALTest
    {
        private IConfig _config;
        private IFormularyRepositoryFactory _formFactory;
        private FormularyEntities _formularyEntities;

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
        

        /// <summary>
        /// Creates this instance.
        /// </summary>
        /// <returns>The id of the new record.</returns>
        
        [TestMethod]
        public void shouldPutCustomNDCAndGetFormulariesByNDC()
        {
           
           
            using (var Repo = _formFactory.CustomNDC())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {

                    // Arrange
                    var listOfCustomNDCs = fdbRepo.FindAll(a => a.NDCTypeSK == 3);
                    var drugToDelete = listOfCustomNDCs.FirstOrDefault();
                    string NDC = drugToDelete.NDC;
                    Repo.DeleteCustomNDC(NDC);                           

                    // Act
                    int DrugListSK = 0;
                    //POST
                    var newFDBDrugListRow = new FDBDrugList
                    {
                        NDC = NDC,
                        LabelName = "be bopper sunday",
                        NDCTypeSK = 3,
                        UnitPrice = 4,
                        DateToMarket = new DateTime(2017, 1, 22),
                        EffectiveDate = DateTime.Now 
                            
                    };

                    fdbRepo.AddOrUpdate(newFDBDrugListRow);
                    fdbRepo.SaveChanges();
                    DrugListSK = newFDBDrugListRow.DrugListSK;
                       
                    //PUT
                    var request = new CustomNdc
                    {
                        DrugListSK = DrugListSK,
                        NDC = NDC,
                        LabelName = "be bopper monday",
                        UnitPrice = 10,
                        DateToMarket = new DateTime(2017, 1, 24)
                    };

                    Repo.PutCustomNDC(request);



                   

                    //doing this so it refreshes the cached object
                    var updatedDrug = _refEntities.FDBDrugList.FirstOrDefault(a => a.DrugListSK == DrugListSK);
                    _refEntities.Entry(updatedDrug).Reload();

                    //ASSERT   
                    Assert.AreEqual(request.NDC, updatedDrug.NDC);
                    //Assert.AreEqual(DrugListSK, result.DrugListSK);
                    Assert.AreEqual(request.LabelName, updatedDrug.LabelName);
                    Assert.AreEqual(request.UnitPrice, updatedDrug.UnitPrice);
                    Assert.AreEqual(request.DateToMarket, updatedDrug.DateToMarket);

                                  

                }
            }         
            
        }

        /// <summary>
        /// Updates the specified id.
        /// </summary>
        /// <param name="id">The id.</param>
        /// 
        //TODO: Iqbal and Matt looked into this, seem to be a database issue so cannot test correctly
        [TestMethod]
        public void shouldGetFormulariesByNDC()
        {

            using (var Repo = _formFactory.DrugCategory())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {

                    string newStringNDC = "00000000000";//"00000000001";
                    int newIntNDC = 0;

                    var t = _refEntities.FormularyCache.Where(x => x.NDC == newStringNDC).ToList().Count();
                    while (t > 0)
                    {
                        newIntNDC += 1;
                        newStringNDC = GetIntBinaryString(newIntNDC);
                        
                        t = _refEntities.FormularyCache.Where(x => x.NDC == newStringNDC).ToList().Count();
                    }


                    CustomNdc aCustomNDC = new CustomNdc()
                    {
                        DrugListSK = 33,
                        NDC =newStringNDC ,
                        LabelName = "bayou",
                        UnitPrice = 23,
                        DateToMarket = DateTime.Today
                    };


                    List<CriteriaDetailTableType> listOfTableRules = new List<CriteriaDetailTableType>();
                    CriteriaDetailTableType tblRules = new CriteriaDetailTableType()
                    {
                        ValQulfrCode="NDC",
                        OperTypeCode="=",
                        CrtriaPrity=1,
                        CrtriaVal="6331"
                 
                    };

                    listOfTableRules.Add(tblRules);
               
                    DrugCatgCrtriaGrpSP udtt = new DrugCatgCrtriaGrpSP()
                    {
                        DrugCatgSK=1,
                        FrmlrySK=36,
                        FrmlryTierSK=72,
                        CriteriaName= "Cvrd=No T99-1ffff",
                        UserId="jsmith",
                        tblRules=listOfTableRules,
                        CvrdInd=false,
                        DrugCatgSK_Upd=1
                       
                    };               

                    // Act
                    Repo.SetDrugCategoryCriteria(udtt);
                    Repo.SaveChanges();

                    List<spDrugCatgCrtriaGrp_Get_Result> listSP = new List<spDrugCatgCrtriaGrp_Get_Result>();
                    spDrugCatgCrtriaGrp_Get_Result expected = new spDrugCatgCrtriaGrp_Get_Result(){
                            ValQulfrCode="NDC",
                            OperTypeCode="IN",
                            CrtriaPrity=1,
                            CrtriaVal="6331"
                    };
                    listSP.Add(expected);

                    //List<spDrugCatgCrtriaGrp_Get_Result> GetDrugCategoryCriteria(long DrugCategoryID);
                    var c = Repo.GetAllDrugCategories(udtt.DrugCatgSK);
                    // Assert
                
                    //Assert.IsNotNull(result);
                    //Assert.AreEqual(fc.LabelName, result[0].FrmlryName);
                    //Assert.AreEqual(fc.FormularyId, result[0].FormularyId);
                    //Assert.AreEqual(fc.FormularySK, result[0].FormularySK);
                    //Assert.AreEqual(fc.FormularyVersion, result[0].FormularyVersion);

                }
            }
        }


        private static string GetIntBinaryString(int n)
        {
            int length = 11;
            char[] b = new char[length];
            int pos = 10;
            int i = 0;

            while (i < length)
            {
                if ((n & (1 << i)) != 0)
                {
                    b[pos] = '1';
                }
                else
                {
                    b[pos] = '0';
                }
                pos--;
                i++;
            }
            return new string(b);
        }

        private static CustomNdc convertFC(FDBDrugList fdb)
        {
            CustomNdc aCustomNDC = new CustomNdc()
            {
                DrugListSK = fdb.DrugListSK,
                NDC = fdb.NDC,
                LabelName = fdb.LabelName,
                UnitPrice = (decimal)fdb.UnitPrice,
                DateToMarket = (DateTime)fdb.DateToMarket

            };

            return aCustomNDC;
        }


        /// <summary>
        /// Gets all NDCChangeHistory
        /// </summary>
        [TestMethod]
        public void shouldGetAllNDCChangeHistory()
        {

            using (var Repo = _formFactory.CustomNDC())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {

                    var listOfCustomNDCs = fdbRepo.FindAll(a => a.NDCTypeSK == 3);
                    var drugToDelete = listOfCustomNDCs.FirstOrDefault();
                    string NDC = drugToDelete.NDC;
                    Repo.DeleteCustomNDC(NDC);    //delete         


                    var FDB = Repo.GetAllNDCChangeHistory(NDC).FirstOrDefault();
                    Assert.IsNull(FDB);
                    
                    // Act
                    int DrugListSK = 0;
                    //POST
                    var newFDBDrugListRow = new FDBDrugList
                    {
                        NDC = NDC,
                        LabelName = "be bopper sunday",
                        NDCTypeSK = 3,
                        UnitPrice = 4,
                        DateToMarket = new DateTime(2017, 1, 22),
                        EffectiveDate = DateTime.Now

                    };


                    fdbRepo.AddOrUpdate(newFDBDrugListRow);   //Add or update
                    fdbRepo.SaveChanges();
                    DrugListSK = newFDBDrugListRow.DrugListSK;

                    //PUT
                    var request = new CustomNdc
                    {
                        DrugListSK = DrugListSK,
                        NDC = NDC,
                        LabelName = "be bopper monday",
                        UnitPrice = 4,
                        DateToMarket = new DateTime(2017, 1, 22)
                    };

                    Repo.PutCustomNDC(request);

                    //doing this so it refreshes the cached object
                    var updatedDrug = _refEntities.FDBDrugList.FirstOrDefault(a => a.DrugListSK == DrugListSK);
                    _refEntities.Entry(updatedDrug).Reload();

                    //Assert  
                    Assert.AreEqual(request.NDC, updatedDrug.NDC);
                    //Assert.AreEqual(DrugListSK, result.DrugListSK);
                    Assert.AreEqual(request.LabelName, updatedDrug.LabelName);
                    Assert.AreEqual(request.UnitPrice, updatedDrug.UnitPrice);
                    Assert.AreEqual(request.DateToMarket, updatedDrug.DateToMarket);

                    // Act
                    var FDB2 = Repo.GetAllNDCChangeHistory(updatedDrug.NDC).FirstOrDefault();

                    //Assert
                    Assert.AreEqual(FDB2.ChangeSummary, "Label Name From be bopper sunday To be bopper monday;");
                    
                   
                  
                }
            }
        }
        /// <summary>
        /// Gets the by ID.
        /// </summary>
        /// <param name="id">The id of the competition.</param>
        [TestMethod]
        
        public void ShouldDeleteMissingNDC()
        {
            using (var Repo = _formFactory.CustomNDC())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    CustomNdc request;
                    FDBDrugList aCustomNDC;
                    CreateData(out request, out aCustomNDC);

                    var res = fdbRepo.FindAll(x => x.NDCTypeSK == 3).Where(y => y.NDC == request.NDC);
                    if (res != null)
                    {
                        Repo.DeleteCustomNDC(request.NDC);
                        Repo.SaveChanges();
                    }

                    fdbRepo.AddOrUpdate(aCustomNDC);
                    fdbRepo.SaveChanges();
                    var result = fdbRepo.FindOne(fdb => fdb.NDC == request.NDC);

                    //Assert
                    Assert.IsNotNull(result);
                    Assert.AreEqual(result.NDC, aCustomNDC.NDC);
                    Assert.AreEqual(result.LabelName, aCustomNDC.LabelName);
                    Assert.AreEqual(result.UnitPrice, aCustomNDC.UnitPrice);
                    Assert.AreEqual(result.EffectiveDate, aCustomNDC.EffectiveDate);
                    Assert.AreEqual(result.NDCTypeSK, aCustomNDC.NDCTypeSK);


                    Repo.DeleteCustomNDC(result.NDC);
                    Repo.SaveChanges();

                    var result2 = fdbRepo.FindOne(fdb => fdb.NDC == request.NDC);
                    Assert.IsNull(result2);

                }
            }
        }       

        /// <summary>
        /// Deletes the specified CustomNdc.
        /// </summary>
        /// <param name="Ndc">The CustomerNdc.</param>
        [TestMethod]
        public void ShouldDeleteCustomNDC()
        {
            
            using (var Repo = _formFactory.CustomNDC())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    // Arrange
                    CustomNdc request;
                    FDBDrugList aCustomNDC;
                    CreateData(out request, out aCustomNDC);

                    //Act
                    var FDB2 = fdbRepo.FindOne(fdb => fdb.NDC == request.NDC);
                    if (FDB2 != null)
                    {
                        Repo.DeleteCustomNDC(FDB2.NDC);
                        Repo.SaveChanges();

                        //Assert
                        var FDB3 = fdbRepo.FindOne(fdb => fdb.NDC == request.NDC);
                        Assert.IsNull(FDB3);
                    }
                    else
                    {

                        fdbRepo.AddOrUpdate(aCustomNDC);
                        fdbRepo.SaveChanges();
                        var result = fdbRepo.FindOne(fdb => fdb.NDC == request.NDC);

                        //Assert
                        Assert.IsNotNull(result);
                        Assert.AreEqual(result.NDC, aCustomNDC.NDC);
                        Assert.AreEqual(result.LabelName, aCustomNDC.LabelName);
                        Assert.AreEqual(result.UnitPrice, aCustomNDC.UnitPrice);
                        Assert.AreEqual(result.EffectiveDate, aCustomNDC.EffectiveDate);
                        Assert.AreEqual(result.NDCTypeSK, aCustomNDC.NDCTypeSK);


                        Repo.DeleteCustomNDC(result.NDC);
                        Repo.SaveChanges();

                        var result2 = fdbRepo.FindOne(fdb => fdb.NDC == request.NDC);
                        Assert.IsNull(result2);
                    }



                }
            }

        }

        private static void CreateData(out CustomNdc request, out FDBDrugList aCustomNDC)
        {
            request = new CustomNdc
            {
                DrugListSK = 0,
                NDC = "11111211111",
                LabelName = "be bopper sunday",
                UnitPrice = 4,
                DateToMarket = new DateTime(2017, 1, 22)
            };
            aCustomNDC = new FDBDrugList()
            {
                DrugListSK = 0,
                NDC = "11111211111",
                LabelName = "be bopper sunday",
                UnitPrice = 4,
                EffectiveDate = new DateTime(2017, 1, 22),
                NDCTypeSK = 3
            };
        }


    }
}
