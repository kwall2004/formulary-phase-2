using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Repositories.Interfaces;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Models.Containers;
using System.Linq;
using System.Linq.Expressions;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.BenefitPlan.BLL.Interfaces;
using System.Collections.Generic;

namespace Atlas.BenefitPlan.BLL.Test.Entity
{
    [TestClass]
    public class BenefitPlanBLLTest
    {
        private Mock<IBenefitPlanRepositoryFactory> _mockIBenefitPlanRepositoryFactory;
        private BenefitPlanBLL _benefitPlanBLL;
        private long _benefitPlanSK = 1;
        private BenefitPlanVM _benefitPlanVM = new BenefitPlanVM();

        [TestInitialize]
        public void SetupTest()
        {
            _mockIBenefitPlanRepositoryFactory = TestHelpers.CreateMockIBPRepositoryFactoryForBenefitPlan(_benefitPlanSK);
            _benefitPlanBLL = new BenefitPlanBLL(_mockIBenefitPlanRepositoryFactory.Object);
        }

        /// <summary>
        /// Test the GetBenefitPlanVM method
        /// </summary>
        [TestMethod]
        public void TestGetBenefitPlanVM()
        {
            //test when a benefit plan is found
            // Arrange

            // Act
            BenefitPlanVM result = _benefitPlanBLL.GetBenefitPlanVM(_benefitPlanSK);

            // Assert
            Assert.AreNotEqual(result.BnftPlanSK, 0);
            Assert.AreEqual(result.BenefitPlanWaiverRiders.Count(), 5);

            //test when a benefit plan is not found
            //Arrange
            _mockIBenefitPlanRepositoryFactory = TestHelpers.CreateMockIBPRepositoryFactoryForBenefitPlan(0);
            _benefitPlanBLL = new BenefitPlanBLL(_mockIBenefitPlanRepositoryFactory.Object);
            // Act
            result = _benefitPlanBLL.GetBenefitPlanVM(0);

            // Assert
            Assert.AreEqual(result.BnftPlanSK, 0);
            Assert.AreEqual(result.BenefitPlanWaiverRiders.Count(), 0);
        }

        ///// <summary>
        ///// Test Set Benefit Plan And Detail
        ///// </summary>
        //[TestMethod]
        //public void TestSetBenefitPlanAndDetail()
        //{
        //    //test when a benefit plan is being added
        //    //Arrange
        //    _benefitPlanVM = LoadBnftPlan(0);

        //    // Act
        //    BenefitPlanVM result = _benefitPlanBLL.SetBenefitPlanAndDetail(_benefitPlanVM);

        //    // Assert
        //    Assert.AreEqual(result.BnftPlanSK, 0);


        //    //test when a benefit plan is being updated
        //    //Arrange
        //    _benefitPlanVM = LoadBnftPlan(_benefitPlanSK);

        //    // Act
        //    result = _benefitPlanBLL.SetBenefitPlanAndDetail(_benefitPlanVM);

        //    // Assert
        //    Assert.AreEqual(result.BnftPlanSK, _benefitPlanSK);
        //}

        /// <summary>
        /// Test the GetAllCoveragePhase method
        /// </summary>
        [TestMethod]
        public void TestGetAllCoveragePhase()
        {
            //test when a Coverage phase is found
            // Arrange

            // Act
            List<CoveragePhaseVM> result = _benefitPlanBLL.GetAllCoveragePhase(_benefitPlanSK).ToList();

            // Assert
            Assert.AreNotEqual(result.Count, 0);

            //test when a Coverage phase is not found
            // Act
            result = _benefitPlanBLL.GetAllCoveragePhase(0).ToList();

            // Assert
            Assert.AreNotEqual(result.Count, 0);
        }

        //AddOrUpdateCoveragePhase
        //BenefitPlanSearch - no test needed. pass through
        //GetAllCostShareMaximum
        //GetAllCopayDistribution
        //SetAllCopayDistribution
        //GetAllDAWCopay
        //AddorUpdateDAWCopay

        private BenefitPlanVM LoadBnftPlan(long bnftPlanSK)
        {
           
            BenefitPlanVM benefitPlanVM = new BenefitPlanVM();
            benefitPlanVM.BnftPlanName = "Glen Test";
            benefitPlanVM.BnftPlanSK = bnftPlanSK;

            return benefitPlanVM;
        }
    }
}
