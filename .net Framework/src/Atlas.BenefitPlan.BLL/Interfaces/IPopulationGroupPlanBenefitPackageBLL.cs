using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.ViewModels;
using System;
using System.Collections.Generic;

namespace Atlas.BenefitPlan.BLL.Interfaces
{
    /// <summary>
    /// The Interface for Population Group Plan Benefit Package BLL for Benefit Plan
    /// </summary>
    public interface IPopulationGroupPlanBenefitPackageBLL
    {
        /// <summary>
        /// Insert Status Note
        /// </summary>
        /// <param name="itemToInsert">The item to insert.</param>
        /// <returns>StatusNoteVM.</returns>
        StatusNoteVM InsertStatusNote(StatusNoteVM itemToInsert);

        /// <summary>
        /// Get All Notes
        /// </summary>
        /// <param name="popGrpPBPStatSK">The pop GRP PBP stat sk.</param>
        /// <returns>List&lt;StatusNoteVM&gt;.</returns>
        List<StatusNoteVM> GetAllNotes(long popGrpPBPStatSK);

        /// <summary>
        /// Get All Notes
        /// </summary>
        /// <param name="popGrpPBPSK">The pop GRP PBP sk.</param>
        /// <returns>List of StatusNoteVM;.</returns>
        List<StatusNoteVM> GetAllNotesByPopGrpPBPSK(long popGrpPBPSK);

        /// <summary>
        /// Get All Histories
        /// </summary>
        /// <param name="popGrpPBPSK">The pop GRP PBPSK.</param>
        /// <returns>List&lt;PopulationGroupBenefitWorkflowHistoryVM&gt;.</returns>
        List<PopulationGroupBenefitWorkflowHistoryVM> GetAllHistories(long popGrpPBPSK);

        /// <summary>
        /// Insert Workflow
        /// </summary>
        /// <param name="itemToInsert">The item to insert.</param>
        /// <returns>PopulationGroupBenefitWorkflowUpdateVM.</returns>
        PopulationGroupBenefitWorkflowUpdateVM InsertWorkflow(PopulationGroupBenefitWorkflowUpdateVM itemToInsert);

        /// <summary>
        /// Get All Workflows
        /// </summary>
        /// <param name="statusType">Type of the status.</param>
        /// <param name="startDate">The start date.</param>
        /// <param name="endDate">The end date.</param>
        /// <returns>List&lt;PopulationGroupBenefitWorkflowVM&gt;.</returns>
        List<PopulationGroupBenefitWorkflowVM> GetAllWorkflows(long statusType, Nullable<DateTime> startDate, Nullable<DateTime> endDate);

        /// <summary>
        /// Get the Plan Benefit Packages for a Population Group
        /// </summary>
        /// <param name="popGrpSK">the Population Group SK</param>
        /// <returns>List of Population Group Plan Benefit Packages</returns>
        List<PopulationGroupPlanBenefitPackageList> GetPlanBenefitPackages(long popGrpSK);

        /// <summary>
        /// Get population Group with PBP List by GrpSK
        /// </summary>
        /// <param name="grpSK">the group ID</param>
        /// <returns>List of Population Group with PBP</returns>
        List<GroupCopyContentsVM> GetPopulationGroupWithPlanBenefitPackage(long grpSK);

        /// <summary>
        /// Validate Group Copy Content
        /// </summary>
        /// <param name="itemToValidate">the Group Copy Content View Model to Validate</param>
        /// <returns>List&lt;Message&gt;.</returns>
        List<Message> ValidateGroupCopyContent(GroupCopyContentsVM groupCopyContentsVM);

        /// <summary>
        /// Return a list of messages for when a submit for approval action happens
        /// </summary>
        /// <param name="popGrpPBPSK"></param>
        /// <returns>List of Validation Messages</returns>
        List<Message> ValidatePopGrpPBPForSubmitForApproval(long popGrpPBPSK);

        /// <summary>
        /// Validate if there Service Area Contains MI or IL
        /// </summary>
        /// <param name="popGrpPBPSK"></param>
        /// <returns>List of Validation Messages</returns>
        List<Message> ValidatePopGrpPBPServiceArea(long popGrpPBPSK);

        #region " Population Group - Plan Benefit Package "

        /// <summary>
        /// Get a Benefit Configuration for a Population Group - New Skeleton
        /// </summary>
        /// <param name="popGrpSK">the Population Group SK</param>
        /// <param name="pbpSK">the Plan Benefit Package SK</param>
        /// <returns>Population Group Plan Benefit Packages</returns>
        PopulationGroupPlanBenefitPackageVM GetNewBenefitConfiguration(long popGrpSK, long pbpSK);

        /// <summary>
        /// Get a Benefit Configuration for a Population Group
        /// </summary>
        /// <param name="popGrpPBPSK">the Population Group Plan Benefit Package SK</param>
        /// <returns>Population Group Plan Benefit Packages</returns>
        PopulationGroupPlanBenefitPackageVM GetBenefitConfiguration(long popGrpPBPSK);

        /// <summary>
        /// Gets the plan benefit package assignment message.
        /// </summary>
        /// <param name="popGrpSK">The pop GRP sk.</param>
        /// <param name="pbpSK">The PBP sk.</param>
        /// <returns>Message.</returns>
        Message GetPlanBenefitPackageAssignmentMessage(long popGrpSK, long pbpSK);

        /// <summary>
        /// Add or Update a Benefit Configuration for a Population Group
        /// </summary>
        /// <param name="itemToAddOrUpdate">the PopulationGroup Plan Benefit Package Entry to Add or Update</param>
        /// <returns>PopulationGroupPlanBenefitPackageVM.</returns>
        PopulationGroupPlanBenefitPackageVM SetBenefitConfiguration(PopulationGroupPlanBenefitPackageVM itemToAddOrUpdate);

        /// <summary>
        /// Remove a Plan Benefit Package from a Population Group
        /// </summary>
        /// <param name="popGrpPBPSK">the Population Group Plan Benefit Package SK</param>
        /// <param name="currentUser">the Current Username</param>
        /// <returns>Message.</returns>
        Message UnassignPopulationGroupPlanBenefitPackage(long popGrpPBPSK, string currentUser);

        /// <summary>
        /// Validate if a Population Group and Plan Benefit Packages is a Valid Assignment
        /// </summary>
        /// <param name="popGrpSK">the Population Group SK</param>
        /// <param name="pbpSK">the Plan Benefit Package SK</param>
        /// <returns>Population Group Plan Benefit Packages</returns>
        bool ValidatePlanBenefitPackageAssignment(long popGrpSK, long pbpSK);

        /// <summary>
        /// Validate a Benefit Configuration for a Population Group
        /// </summary>
        /// <param name="itemToValidate">the PopulationGroup Plan Benefit Package Entry to Validate</param>
        /// <returns>List&lt;Message&gt;.</returns>
        List<Message> ValidateBenefitConfiguration(PopulationGroupPlanBenefitPackageVM itemToValidate);

        #endregion " Population Group - Plan Benefit Package "
    }
}