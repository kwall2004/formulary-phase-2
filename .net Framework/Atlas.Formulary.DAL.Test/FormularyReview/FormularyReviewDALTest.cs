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

namespace Atlas.Formulary.DAL.Test.FormularyReview
{
    [TestClass]
    public class FormularyReviewDALTest
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
        public void ShouldInitiateFormularyReview()
        {
            using (var Repo = _formFactory.FormularyReview())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    //Dont need
                }
            }
        }

        //TODO: hard to test READ functionality
        [TestMethod]
        public void ShouldGetFormularyReview()
        {
            using (var Repo = _formFactory.FormularyReview())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {



                    //Arrange
                    var originalTimeout = _formularyEntities.Database.CommandTimeout;
                    _formularyEntities.Database.CommandTimeout = 2880; //added this because this stored proc kept hitting timeoutexception


                    FrmlryReview aFrmlryReview = new FrmlryReview()
                    {             
                        FrmlrySK=34,
                        NDC="00910000000", //tmpuserdrugsearch, mdl
                        FrmlrySK_From=null
                    };

                    _refEntities.FrmlryReview.Add(aFrmlryReview);
                    _refEntities.SaveChanges();

                
                    long formularySK = 34;
                    long DrugCatgSK = 42410; //tmpuserdrugsearch
                    long ETC_ID = 6355;   //tmp userDrugSearch, mdl
                    string AHFS_Id ="78000000"; //mdl
                    long FrmlryTierSK = 105; //tmpuserdrugsearch

                    string where = null;

                    //Act
                    //var result = Repo.GetFormularyReview(formularySK, DrugCatgSK, ETC_ID, AHFS_Id, FrmlryTierSK, where);

                    var maxFormReviewSK = _refEntities.FrmlryReview.Max(x => x.FrmlryReviewSK);
                    var formReview = _refEntities.FrmlryReview.Where(x => x.FrmlryReviewSK == maxFormReviewSK).ToList();
                    var actualAprvlPriorityResult = Repo.GetFormularyReview(formReview[0].FrmlrySK, null, null, null, null, null, where);//.Where(x => x.NDC == formReview[0].NDC);
                    _formularyEntities.Database.CommandTimeout = originalTimeout;
                    //Assert

                    //.AreEqual(actualAprvlPriorityResult.FirstOrDefault().FrmlrySK, expectedGetFormularyReview.FrmlrySK);
                    //Assert.AreEqual(actualAprvlPriorityResult.FirstOrDefault().NDC, expectedGetFormularyReview.AprvlTypePrity);
                    //Assert.AreEqual(actualAprvlPriorityResult.FirstOrDefault().F, expectedGetFormularyReview.RejectTypePrity);

                    _refEntities.FrmlryReview.Remove(aFrmlryReview);
                    _refEntities.SaveChanges();

                }
            }
        }
      
        //Dont Need
        [TestMethod]
        public void ShouldGetFormularyReviewRules()
        {
            using (var Repo = _formFactory.FormularyReview())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                   

                }
            }
        }



        [TestMethod]
        public void ShouldGetFormularyReviewTiers()
        {
            using (var Repo = _formFactory.FormularyReview())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    //Dont need
                }
            }
        }


        [TestMethod]
        public void ShouldGetFormularyApprovalPriority()
        {
            using (var Repo = _formFactory.FormularyReview())
            {
                using (var fdbRepo = _refFactory.FDBDrugList())
                {
                    //Arrange
                    long formularySK = 23;
                    spFmrlry_GetAprvlPrity_Result expectedFormularyApprovalPriority = new spFmrlry_GetAprvlPrity_Result
                    {
                       FrmlrySK=23,
                       AprvlTypePrity=1,
                       RejectTypePrity=2

                    };
                   
                    //Act
                    var actualAprvlPriorityResult = Repo.GetFormularyApprovalPriority(formularySK);
                    
                    //Assert

                    Assert.AreEqual(actualAprvlPriorityResult.FirstOrDefault().FrmlrySK, expectedFormularyApprovalPriority.FrmlrySK);
                    Assert.AreEqual(actualAprvlPriorityResult.FirstOrDefault().AprvlTypePrity, expectedFormularyApprovalPriority.AprvlTypePrity);
                    Assert.AreEqual(actualAprvlPriorityResult.FirstOrDefault().RejectTypePrity, expectedFormularyApprovalPriority.RejectTypePrity);
                    


                }
            }
        }
    }
}
