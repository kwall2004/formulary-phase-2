using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Atlas.Configuration;
using Atlas.Formulary.DAL.Models;
using Atlas.Reference.DAL;
using Atlas.Reference.DAL.Models;
using Atlas.Reference.DAL.Repositories.Interfaces;
using System.Collections.Generic;
using Atlas.Formulary.DAL.Repositories.Interfaces;
using Atlas.Formulary.DAL.ViewModels;

namespace Atlas.Formulary.DAL.Test.NDC
{
    [TestClass]
    public class NDCDALTest
    {
        private IConfig _config;
        private FormularyEntities _formularyEntities;
        private IFormularyRepositoryFactory _repoFactory;
        private IReferenceRepositoryFactory _refFactory;
        private ReferenceEntities _refEntities;

        private IFDBDrugListRepository fdbRepo;
        private INDCRepository ndcRepo;
        private FDBDrugList drug;
        private NDCNote note1, note2;


        /// <summary>
        /// Sets up.
        /// </summary>
        [TestInitialize]
        public void SetUp()
        {
            _config = new FormularyDevConfig();
            _formularyEntities = new FormularyEntities();
            _repoFactory = new FormularyRepositoryFactory(_config, _formularyEntities);

            _refEntities = new ReferenceEntities(_config);
            _refFactory = new ReferenceRepositoryFactory(_refEntities);
        }

        [TestMethod]
        public void ShouldHaveCorrectGetAllNDCNotesResponse()
        {
            
            using (fdbRepo = _refFactory.FDBDrugList())
            using (_refEntities)
            using(ndcRepo = _repoFactory.NDCNotes())
            {
                //ARRANGE
                ResetData();
                DeleteData();
                InitializeData();
                List<spNDCNotes_GetAll_Result> ndcNotes;

                //ACT
                _refEntities.NDCNote.Add(note1);
                _refEntities.NDCNote.Add(note2);
                int numOfRows = _refEntities.SaveChanges();
                if (numOfRows < 2)
                {
                    throw new Exception("Failed to add the notes");
                }
                ndcNotes = ndcRepo.GetAll(drug.NDC);
                var dbNote1 = ndcNotes.Find(a => a.NDCNoteSK == note1.NDCNoteSK);
                var dbNote2 = ndcNotes.Find(a => a.NDCNoteSK == note2.NDCNoteSK);

                //ASSERT
                Assert.IsNotNull(ndcNotes);
                Assert.IsTrue(ndcNotes.Count >= 2);
                Assert.IsNotNull(dbNote1);
                Assert.IsNotNull(dbNote2);
                Assert.AreEqual(dbNote1.NDCNotes, note1.NDCNotes);
                Assert.AreEqual(dbNote2.NDCNotes, note2.NDCNotes);
                DeleteData();
            }

            
        }

        [TestMethod]
        public void ShouldHaveCorrectPutNDCNotesResponse()
        {
            NDCNoteVM ndcNote;
            NDCNote queriedObj;
            using (fdbRepo = _refFactory.FDBDrugList())
            using (ndcRepo = _repoFactory.NDCNotes())
            using (_refEntities)
            {
                //ARRANGE
                ResetData();
                DeleteData();
                InitializeData();
                ndcNote = new NDCNoteVM { NDC = note1.NDC, NDCNotes = note1.NDCNotes, NDCNoteSK = null, UserId = note1.CreatedBy };

                //ACT          
                note1.NDCNoteSK = ndcRepo.PutNDCNotes(ndcNote);
                queriedObj = _refEntities.NDCNote.Find(note1.NDCNoteSK);

                //ASSERT
                Assert.IsNotNull(queriedObj);
                Assert.AreEqual(queriedObj.NDCNotes, note1.NDCNotes);
                Assert.AreEqual(queriedObj.NDC, note1.NDC);
                Assert.AreEqual(queriedObj.CreatedBy, note1.CreatedBy);

                DeleteData();
            }           

        }

        [TestMethod]
        public void PutNDCNotesResponse()
        {
            using (var Repo = _repoFactory.NDCNotes())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    //Arrange
                    long r = 1;
                    NDCNoteVM ndc = new NDCNoteVM()
                    {
                        NDCNoteSK = 1,
                        NDCNotes = "test",
                        NDC = "49260504808",
                        UserId = "jsmith"
                    };

                    spNDCNotes_Put_Result result = new spNDCNotes_Put_Result()
                    {
                        ErrorNumber = 0,
                        ErrorSeverity = 1,
                        ErrorState = null,
                        ErrorProcedure = null,
                        ErrorLine = null,
                        ErrorMessage = null
                    };

                    //Act
                    var expectedNdcNotes = Repo.PutNDCNotes(ndc);

                    //Assert

                    Assert.AreEqual(expectedNdcNotes, result.ErrorSeverity.Value);

                }
            }

        }


        private void InitializeData()
        {
            var ndcCheck = fdbRepo.FindOne(a => a.NDC == drug.NDC);
            if (ndcCheck == null)
            {
                fdbRepo.AddOrUpdate(drug);
                fdbRepo.SaveChanges();

                ndcCheck = fdbRepo.FindOne(a => a.NDC == drug.NDC);

                //confirm our drug got added
                if (ndcCheck == null || ndcCheck.LabelName != drug.LabelName)
                {
                    throw new Exception("Data could not be added to the database.");
                }            
            }
            else
            {
                throw new Exception("Data could not be added to the database.");
            }

            
        }

        private void DeleteData()
        {
            var drugToDelete = fdbRepo.FindOne(a => a.NDC == drug.NDC);
            NDCNote noteToDelete1 = note1.NDCNoteSK == 0 ? null : _refEntities.NDCNote.Find(note1.NDCNoteSK);
            NDCNote noteToDelete2 = note2.NDCNoteSK == 0 ? null : _refEntities.NDCNote.Find(note2.NDCNoteSK);

            if (drugToDelete != null && drugToDelete.LabelName == drug.LabelName)
            {
                _refEntities.FDBDrugList.Remove(drugToDelete);
                _refEntities.SaveChanges();
            }

            if(noteToDelete1 != null && noteToDelete1.NDCNotes == note1.NDCNotes)
            {
                _refEntities.NDCNote.Remove(noteToDelete1);
                _refEntities.SaveChanges();
            }

            if (noteToDelete2 != null && noteToDelete2.NDCNotes == note2.NDCNotes)
            {
                _refEntities.NDCNote.Remove(noteToDelete2);
                _refEntities.SaveChanges();
            }
        }

        private void ResetData()
        {
            drug = new FDBDrugList { DrugListSK = 0, NDC = "12332112312", NDCTypeSK = 1, DateToMarket = new DateTime(2017, 1, 1), IsNewDrug = true, LabelName = "NewDrug", ETC_ID = 1, EffectiveDate = DateTime.Now };
            note1 = new NDCNote { NDC = drug.NDC, NDCNotes = "This drug is great!", CreatedBy = "TheBatman", CreatedTs = DateTime.Now, LastModfdBy = "TheBatman", LastModfdTs = DateTime.Now, NDCNoteSK = 0 };
            note2 = new NDCNote { NDC = drug.NDC, NDCNotes = "This drug is exceptional!", CreatedBy = "TheBatman", CreatedTs = DateTime.Now, LastModfdBy = "TheBatman", LastModfdTs = DateTime.Now, NDCNoteSK = 0 };
        }
    }
}
