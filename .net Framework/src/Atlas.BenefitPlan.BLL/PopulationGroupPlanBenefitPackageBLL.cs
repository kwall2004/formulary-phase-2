using Atlas.BenefitPlan.BLL.Interfaces;
using Atlas.BenefitPlan.BLL.Utility;
using Atlas.BenefitPlan.DAL;
using Atlas.BenefitPlan.DAL.Models;
using Atlas.BenefitPlan.DAL.Models.Containers;
using Atlas.BenefitPlan.DAL.Models.Containers.JSON;
using Atlas.BenefitPlan.DAL.Models.Enums;
using Atlas.BenefitPlan.DAL.Models.Enums.JSON;
using Atlas.BenefitPlan.DAL.Repositories.Interfaces;
using Atlas.BenefitPlan.DAL.Utility;
using Atlas.BenefitPlan.DAL.ViewModels;
using Atlas.Core.BLL.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Atlas.BenefitPlan.BLL
{
    /// <summary>
    /// The Population Group Plan Benefit Package BLL for Benefit Plan
    /// </summary>
    /// <seealso cref="Atlas.BenefitPlan.BLL.Interfaces.IPopulationGroupPlanBenefitPackageBLL" />
    public class PopulationGroupPlanBenefitPackageBLL : IPopulationGroupPlanBenefitPackageBLL
    {
        /// <summary>
        /// Out of Network Tier String
        /// </summary>
        private const string OutOfNetworkTier = "Out of Network Tier";

        /// <summary>
        /// the Draft Work Flow Status
        /// </summary>
        private const string DraftWorkFlowStatus = "Draft";

        /// <summary>
        /// Plan Benefit Package to Population Group Validation Failure
        /// </summary>
        private const string ValidationFalureFMT = "Plan Benefit Package: {0} assignment to Population Group {1}: is invalid.  Plan Benefit Package effective dates, must be within Population Groups effective dates.";

        /// <summary>
        /// Plan Benefit Package to Population Group Validation Success
        /// </summary>
        private const string ValidationSussessFMT = "Are you sure you want to assign Plan Benefit Package: {0} to Population Group: {1}?";

        /// <summary>
        /// The Work Flow Status that users can make structural changes
        /// </summary>
        private const string UnlockedWorkFlowStatus = "Draft,Rejected";

        /// <summary>
        /// Population Group PlanBenefit Package Work-flow Status
        /// </summary>
        private string CurrentWorkFlowStatus;

        /// <summary>
        /// Entity BLL
        /// </summary>
        private IEntityBLL _entityBLL;

        /// <summary>
        /// the Benefit Plan Repository Factory
        /// </summary>
        private IBenefitPlanRepositoryFactory _repoFactory;

        /// <summary>
        /// The Constructor for the Plan Benefit Package BLL for Benefit Plan
        /// </summary>
        /// <param name="entityBLL">The entity BLL.</param>
        /// <param name="repoFactory">the Benefit Plan Repository Factory</param>
        public PopulationGroupPlanBenefitPackageBLL(IEntityBLL entityBLL, IBenefitPlanRepositoryFactory repoFactory)
        {
            _entityBLL = entityBLL;
            _repoFactory = repoFactory;
            CurrentWorkFlowStatus = DraftWorkFlowStatus;
        }

        #region "Workflow"

        /// <summary>
        /// Get All Notes
        /// </summary>
        /// <param name="popGrpPBPStatSK">The pop GRP PBP stat sk.</param>
        /// <returns>List&lt;StatusNoteVM&gt;.</returns>
        public List<StatusNoteVM> GetAllNotes(long popGrpPBPStatSK)
        {
            List<StatusNoteVM> statusNoteList = new List<StatusNoteVM>();

            using (var repoNote = _repoFactory.StatusNote())
            {
                statusNoteList = repoNote.FindAll(p => p.PopGrpPBPStatSK == popGrpPBPStatSK)
                    .OrderByDescending(o => o.CreatedTs)
                    .Select(n => new StatusNoteVM()
                    {
                        StatNoteSK = n.StatNoteSK,
                        PopGrpPBPStatSK = n.PopGrpPBPStatSK,
                        NoteSubject = n.NoteSubject,
                        NoteDtl = n.NoteDtl,
                        User = n.CreatedBy,
                        DateCreated = n.CreatedTs.ToString()
                    }).ToList();
            }

            return statusNoteList;
        }

        /// <summary>
        /// Get All Notes
        /// </summary>
        /// <param name="popGrpPBPSK">The pop GRP PBP sk.</param>
        /// <returns>List of StatusNoteVM;.</returns>
        public List<StatusNoteVM> GetAllNotesByPopGrpPBPSK(long popGrpPBPSK)
        {
            List<StatusNoteVM> statusNoteList = new List<StatusNoteVM>();

            using (var repoNote = _repoFactory.StatusNote())
            {
                statusNoteList = repoNote.FindAll(p => p.PopGrpPBPStat.PopGrpPBPSK == popGrpPBPSK)
                    .OrderByDescending(o => o.CreatedTs)
                    .Select(n => new StatusNoteVM()
                    {
                        StatNoteSK = n.StatNoteSK,
                        PopGrpPBPStatSK = n.PopGrpPBPStatSK,
                        NoteSubject = n.NoteSubject,
                        NoteDtl = n.NoteDtl,
                        User = n.CreatedBy,
                        DateCreated = n.CreatedTs.ToString()
                    }).ToList();
            }

            return statusNoteList;
        }

        /// <summary>
        /// Insert Status Note
        /// </summary>
        /// <param name="itemToInsert">The item to insert.</param>
        /// <returns>StatusNoteVM</returns>
        public StatusNoteVM InsertStatusNote(StatusNoteVM itemToInsert)
        {
            using (var repository = _repoFactory.StatusNote())
            {
                StatNote statusNote = new StatNote();

                statusNote.PopGrpPBPStatSK = itemToInsert.PopGrpPBPStatSK;
                statusNote.NoteSubject = itemToInsert.NoteSubject;
                statusNote.NoteDtl = itemToInsert.NoteDtl;
                statusNote.CreatedBy = itemToInsert.CurrentUser;
                statusNote.CreatedTs = UtilityFunctions.GetTimeStamp();
                statusNote.LastModfdBy = itemToInsert.CurrentUser;
                statusNote.LastModfdTs = UtilityFunctions.GetTimeStamp();
                statusNote.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
                statusNote.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();

                repository.AddOrUpdate(statusNote);
                repository.SaveChanges();

                itemToInsert.StatNoteSK = statusNote.StatNoteSK;

                return itemToInsert;
            }
        }

        /// <summary>
        /// Get All Histories
        /// </summary>
        /// <param name="popGrpPBPSK">The pop GRP PBPSK.</param>
        /// <returns>List&lt;PopulationGroupBenefitWorkflowHistoryVM&gt;.</returns>
        public List<PopulationGroupBenefitWorkflowHistoryVM> GetAllHistories(long popGrpPBPSK)
        {
            // This is for the Workflow HISTORY screen
            List<PopulationGroupBenefitWorkflowHistoryVM> historyList = new List<PopulationGroupBenefitWorkflowHistoryVM>();

            using (var repoHistory = _repoFactory.PopulationGroupPlanBenefitPackageStatus())
            using (var repoNotes = _repoFactory.StatusNote())
            {
                historyList = repoHistory.FindAll(p => p.PopGrpPBPSK == popGrpPBPSK)
                    .Select(n => new PopulationGroupBenefitWorkflowHistoryVM()
                    {
                        PopGrpPBPStatSK = n.PopGrpPBPStatSK,
                        PopGrpPBPSK = n.PopGrpPBPSK,
                        StatTypeSK = n.StatTypeSK,
                        Action = n.StatType.StatDesc,
                        ActionDate = n.CreatedTs.ToString(),
                        ActionTime = n.CreatedTs.ToString(),
                        SubmittingUser = n.CreatedBy,
                        AdministrativeUser = string.Empty
                    }).OrderByDescending(o => o.ActionDate).ToList();

                foreach (PopulationGroupBenefitWorkflowHistoryVM item in historyList)
                {
                    IQueryable<StatNote> statnotes = repoNotes.FindAll(a => a.PopGrpPBPStatSK == item.PopGrpPBPStatSK)
                        .OrderByDescending(o => o.CreatedTs);
                    List<StatusNoteVM> statNoteVMList = statnotes.Select(b => new StatusNoteVM()
                    {
                        StatNoteSK = b.StatNoteSK,
                        PopGrpPBPStatSK = b.PopGrpPBPStatSK,
                        NoteSubject = b.NoteSubject,
                        NoteDtl = b.NoteDtl,
                        User = b.CreatedBy,
                        DateCreated = b.CreatedTs.ToString()
                    }).ToList();

                    item.StatusNotes = statNoteVMList;
                }
            }

            return historyList;
        }

        /// <summary>
        /// Update Workflow status
        /// </summary>
        /// <param name="itemToInsert">The item to insert.</param>
        /// <returns>PopulationGroupBenefitWorkflowUpdateVM.</returns>
        public PopulationGroupBenefitWorkflowUpdateVM InsertWorkflow(PopulationGroupBenefitWorkflowUpdateVM itemToInsert)
        {
            using (var repository = _repoFactory.PopulationGroupPlanBenefitPackageStatus())
            {
                PopGrpPBPStat popGrpPBPStat = new PopGrpPBPStat();

                popGrpPBPStat.PopGrpPBPSK = itemToInsert.PopGrpPBPSK;
                popGrpPBPStat.StatTypeSK = itemToInsert.StatTypeSK;
                popGrpPBPStat.CreatedBy = itemToInsert.CurrentUser; ;
                popGrpPBPStat.CreatedTs = UtilityFunctions.GetTimeStamp();
                popGrpPBPStat.LastModfdBy = itemToInsert.CurrentUser;
                popGrpPBPStat.LastModfdTs = UtilityFunctions.GetTimeStamp();
                popGrpPBPStat.EfctvStartDt = UtilityFunctions.GetEffectiveStartDate();
                popGrpPBPStat.EfctvEndDt = UtilityFunctions.GetEffectiveEndDate();

                repository.AddOrUpdate(popGrpPBPStat);
                repository.SaveChanges();

                itemToInsert.PopGrpPBPStatSK = popGrpPBPStat.PopGrpPBPStatSK;

                return itemToInsert;
            }
        }

        /// <summary>
        /// Get All Workflows
        /// </summary>
        /// <param name="statusType">Type of the status.</param>
        /// <param name="startDate">The start date.</param>
        /// <param name="endDate">The end date.</param>
        /// <returns>List&lt;PopulationGroupBenefitWorkflowVM&gt;.</returns>
        public List<PopulationGroupBenefitWorkflowVM> GetAllWorkflows(long statusType, Nullable<DateTime> startDate, Nullable<DateTime> endDate)
        {
            // This is for the Workflow PENDING, APPROVAL, APPROVED, REJECTED screen
            List<PopulationGroupBenefitWorkflowVM> workflowList = new List<PopulationGroupBenefitWorkflowVM>();

            DateTime _startDate = startDate != null ? (DateTime)startDate : DateTime.MinValue;
            DateTime _endDate = endDate != null ? (DateTime)endDate : DateTime.MaxValue;

            using (var spRepository = _repoFactory.AtlasBenefitPlanStoredProcs())
            using (var repoStatus = _repoFactory.PopulationGroupPlanBenefitPackageStatus())
            using (var repoNotes = _repoFactory.StatusNote())
            {
                workflowList = spRepository.GetPopGrpBnftPkgWorkflows(statusType, _startDate, _endDate)
                    .Select(s => new PopulationGroupBenefitWorkflowVM()
                    {
                        PopGrpPBPSK = s.PopGrpPBPSK,
                        PBPName = s.PBP_Name,
                        PBPID = s.PBP_ID,
                        EffectiveStartDate = s.Effective_Start_Date,
                        EffectiveEndDate = s.Effective_End_Date,
                        Tenant = s.Tenant,
                        Account = s.Account,
                        Group = s.Group,
                        PopGrp = s.Pop_Group,
                        LastUser = s.Last_Action_User,
                        LastDate = s.Last_Action_Date,
                        LastTime = s.Last_Action_Time,
                        PopGrpPBPStatSK = s.PopGrpPBPStatSK
                    }).OrderByDescending(o => o.LastDate).ToList();

                foreach (PopulationGroupBenefitWorkflowVM workflowItem in workflowList)
                {
                    List<PopulationGroupBenefitWorkflowHistoryVM> popGrpPBPStatSKList = new List<PopulationGroupBenefitWorkflowHistoryVM>();

                    popGrpPBPStatSKList = repoStatus.FindAll(p => p.PopGrpPBPSK == workflowItem.PopGrpPBPSK)
                        .Select(n => new PopulationGroupBenefitWorkflowHistoryVM()
                        {
                            PopGrpPBPStatSK = n.PopGrpPBPStatSK
                        }).ToList();

                    foreach (PopulationGroupBenefitWorkflowHistoryVM statItem in popGrpPBPStatSKList)
                    {
                        IQueryable<StatNote> statNotes = repoNotes.FindAll(a => a.PopGrpPBPStatSK == statItem.PopGrpPBPStatSK)
                            .OrderByDescending(o => o.CreatedTs);
                        List<StatusNoteVM> statNoteVMList = statNotes.Select(b => new StatusNoteVM()
                        {
                            StatNoteSK = b.StatNoteSK,
                            PopGrpPBPStatSK = b.PopGrpPBPStatSK,
                            NoteSubject = b.NoteSubject,
                            NoteDtl = b.NoteDtl,
                            User = b.CreatedBy,
                            DateCreated = b.CreatedTs.ToString()
                        }).ToList();

                        workflowItem.StatusNotes = statNoteVMList;
                    }
                }

                return workflowList;
            }
        }

        #endregion "Workflow"

        /// <summary>
        /// Get the Plan Benefit Packages for a Population Group
        /// </summary>
        /// <param name="popGrpSK">the Population Group SK</param>
        /// <returns>List of Population Group Plan Benefit Packages</returns>
        public List<PopulationGroupPlanBenefitPackageList> GetPlanBenefitPackages(long popGrpSK)
        {
            return PopulatePlanBenefitPackages(popGrpSK);
        }

        /// <summary>
        /// Get population Group with PBP List by GrpSK
        /// </summary>
        /// <param name="grpSK">the group ID</param>
        /// <returns>List of Population Group with PBP</returns>
        public List<GroupCopyContentsVM> GetPopulationGroupWithPlanBenefitPackage(long grpSK)
        {
            List<GroupCopyContentsVM> groupCopyContents = new List<GroupCopyContentsVM>();
            groupCopyContents.AddRange(PopulatePopulationGroup(grpSK));
            return groupCopyContents;
        }

        /// <summary>
        /// Validate Group Copy Content
        /// </summary>
        /// <param name="itemToValidate">the Group Copy Content View Model to Validate</param>
        /// <returns>the Validation Message</returns>
        public List<Message> ValidateGroupCopyContent(GroupCopyContentsVM itemToValidate)
        {
            List<Message> messages = new List<Message>();

            if (itemToValidate != null)
            {
                itemToValidate = CleanseGroupCopyRecord(itemToValidate);

                if (itemToValidate.ToGrpSK == null)
                {
                    messages.Add(new Message() { MessageText = string.Format("ToGrpSK: field is required.", itemToValidate.ToGrpSK), Fieldname = "ToGrpSK" });
                }

                if (itemToValidate.NewPlanPgmCode == null)
                {
                    messages.Add(new Message() { MessageText = string.Format("NewPlanPgmCode: field is required.", itemToValidate.NewPlanPgmCode), Fieldname = "NewPlanPgmCode" });
                }

                List<PopGrpPBP> planBenefitPackages = _repoFactory.PopulationGroupPlanBenefitPackage()
                    .FindAll(p => p.PlanPgmCode.ToLower() == itemToValidate.NewPlanPgmCode.ToLower())
                    .ToList();

                if (planBenefitPackages.Count() > 0)
                {
                    foreach (PopGrpPBP item in planBenefitPackages)
                    {
                        DateTimeRange validationDateRange = new DateTimeRange() { Start = planBenefitPackages.FirstOrDefault().EfctvStartDt, End = planBenefitPackages.FirstOrDefault().EfctvEndDt };

                        if (validationDateRange.Intersects(new DateTimeRange(item.EfctvStartDt, item.EfctvEndDt)))
                        {
                            messages.Add(new Message() { MessageText = string.Format("Plan Program Code: ({0}) already exists within this timeframe.", itemToValidate.NewPlanPgmCode), Fieldname = "PlanPgmCode" });
                            break;
                        }
                    }
                }
            }
            return messages;
        }

        /// <summary>
        /// Cleanse the CopyContents VM Record
        /// </summary>
        /// <param name="itemToValidate">Record to Cleanse</param>
        /// <returns>Cleansed Record</returns>
        private GroupCopyContentsVM CleanseGroupCopyRecord(GroupCopyContentsVM itemToValidate)
        {
            PropertyInfo[] properties = typeof(GroupCopyContentsVM).GetProperties();
            foreach (PropertyInfo property in properties)
            {
                switch (property.PropertyType.Name)
                {
                    case "String":
                        property.SetValue(itemToValidate, property.GetValue(itemToValidate).ToString().Trim());
                        break;
                    default:
                        break;
                }
            }

            return itemToValidate;
        }

        #region " Population Group - Plan Benefit Package "

        /// <summary>
        /// Get a Benefit Configuration for a Population Group - New Skeleton
        /// </summary>
        /// <param name="popGrpSK">the Population Group SK</param>
        /// <param name="pbpSK">the Plan Benefit Package SK</param>
        /// <returns>Population Group Plan Benefit Packages</returns>
        public PopulationGroupPlanBenefitPackageVM GetNewBenefitConfiguration(long popGrpSK, long pbpSK)
        {
            return PopulateNewPlanBenefitPackage(popGrpSK, pbpSK);
        }

        /// <summary>
        /// Get a Benefit Configuration for a Population Group
        /// </summary>
        /// <param name="popGrpPBPSK">the Population Group Plan Benefit Package SK</param>
        /// <returns>Population Group Plan Benefit Packages</returns>
        public PopulationGroupPlanBenefitPackageVM GetBenefitConfiguration(long popGrpPBPSK)
        {
            SetWorkFlowStatus(popGrpPBPSK);
            return PopulatePlanBenefitPackage(popGrpPBPSK);
        }

        /// <summary>
        /// Gets the plan benefit package assignment message.
        /// </summary>
        /// <param name="popGrpSK">The pop GRP sk.</param>
        /// <param name="pbpSK">The PBP sk.</param>
        /// <returns>Message.</returns>
        public Message GetPlanBenefitPackageAssignmentMessage(long popGrpSK, long pbpSK)
        {
            // Get Parent Entities
            PBP pbp = _repoFactory.PlanBenefitPackage().FindOne(w => w.PBPSK == pbpSK);
            PopGrp popGrp = _repoFactory.PopulationGroup().FindOne(w => w.PopGrpSK == popGrpSK);

            // Check to see if it is a Valid combination
            bool success = ValidatePlanBenefitPackageAssignment(pbp, popGrp);

            // Create Message to send back
            Message validationMessage = new Message();
            validationMessage.Code = success ? "SUCCESS" : "FAILURE";
            validationMessage.Type = success ? JSONMessageType.Info.ToString() : JSONMessageType.Error.ToString();
            validationMessage.MessageText = string.Format(success ? ValidationSussessFMT : ValidationFalureFMT, pbp.PBPName, popGrp.PopGrpName);

            return validationMessage;
        }

        /// <summary>
        /// Add or Update a Benefit Configuration for a Population Group
        /// </summary>
        /// <param name="itemToAddOrUpdate">the PopulationGroup Plan Benefit Package Entry to Add or Update</param>
        /// <returns>PopulationGroupPlanBenefitPackageVM.</returns>
        public PopulationGroupPlanBenefitPackageVM SetBenefitConfiguration(PopulationGroupPlanBenefitPackageVM itemToAddOrUpdate)
        {
            return SetPlanBenefitPackage(itemToAddOrUpdate);
        }

        /// <summary>
        /// Remove a Plan Benefit Package from a Population Group
        /// </summary>
        /// <param name="popGrpPBPSK">the Population Group Plan Benefit Package SK</param>
        /// <param name="currentUser">the Current Username</param>
        /// <returns>Message.</returns>
        public Message UnassignPopulationGroupPlanBenefitPackage(long popGrpPBPSK, string currentUser)
        {
            DateTime timestmp = UtilityFunctions.GetTimeStamp();
            using (var repository = _repoFactory.PopulationGroupPlanBenefitPackage())
            {
                Message validationMessage = new Message() { Type = JSONMessageType.Info.ToString(), MessageText = "Operation was completed successfully." };
                try
                {
                    PopGrpPBP populationGroupPlanBenefitPackage = repository.FindOne(p => p.PopGrpPBPSK == popGrpPBPSK);
                    if (populationGroupPlanBenefitPackage != null)
                    {
                        populationGroupPlanBenefitPackage.LastModfdBy = currentUser;
                        populationGroupPlanBenefitPackage.LastModfdTs = timestmp;
                        populationGroupPlanBenefitPackage.DelTs = timestmp;

                        repository.AddOrUpdate(populationGroupPlanBenefitPackage);
                        repository.SaveChanges();
                    }
                }
                catch (Exception)
                {
                    validationMessage.Type = JSONMessageType.Error.ToString();
                    validationMessage.MessageText = string.Format("Error in completing operation.");
                }
                return validationMessage;
            }
        }

        /// <summary>
        /// Validate a Benefit Configuration for a Population Group
        /// </summary>
        /// <param name="itemToValidate">the PopulationGroup Plan Benefit Package Entry to Validate</param>
        /// <returns>a List of Validate Error Messages</returns>
        public List<Message> ValidateBenefitConfiguration(PopulationGroupPlanBenefitPackageVM itemToValidate)
        {
            return ValidatePlanBenefitPackage(itemToValidate);
        }

        /// <summary>
        /// Validate if a Population Group and Plan Benefit Packages is a Valid Assignment
        /// </summary>
        /// <param name="popGrpSK">the Population Group SK</param>
        /// <param name="pbpSK">the Plan Benefit Package SK</param>
        /// <returns>Population Group Plan Benefit Packages</returns>
        public bool ValidatePlanBenefitPackageAssignment(long popGrpSK, long pbpSK)
        {
            PBP pbp = _repoFactory.PlanBenefitPackage().FindOne(w => w.PBPSK == pbpSK);
            PopGrp popGrp = _repoFactory.PopulationGroup().FindOne(w => w.PopGrpSK == popGrpSK);
            return ValidatePlanBenefitPackageAssignment(pbp, popGrp);
        }

        /// <summary>
        /// Return a list of messages for when a submit for approval action happens
        /// </summary>
        /// <param name="popGrpPBPSK"></param>
        /// <returns>List of Validation Messages</returns>
        public List<Message> ValidatePopGrpPBPForSubmitForApproval(long popGrpPBPSK)
        {
            List<Message> messages = new List<Message>();
            PopGrpPBP popGrpPBP = _repoFactory.PopulationGroupPlanBenefitPackage().FindOne(q => q.PopGrpPBPSK == popGrpPBPSK);
            PBP pbp = _repoFactory.PlanBenefitPackage().FindOne(a => a.PBPSK == popGrpPBP.PBPSK);
            IQueryable<BnftPlan> bnftPlans = _repoFactory.PlanBenefitPackageBenefitPlan().FindAll(a => a.PBPSK == popGrpPBP.PBPSK).Select(s=>s.BnftPlan);

            if (popGrpPBP.PlanPgmCode ==null || popGrpPBP.PlanPgmCode.Trim() == "")
            {
                messages.Add(new Message() { MessageText = string.Format("Plan Program Code must contain a value.", ""), Fieldname = "PlanPgmCode" });
            }

            // for each benefit plan check that the required fields are filled out
            foreach (BnftPlan bnftPlan in bnftPlans)
            {
                string benefitPlanNameSuffix = " for " + bnftPlan.BnftPlanName;
                if (bnftPlan.BnftPlanName.Trim() == "")
                {
                    messages.Add(new Message() { MessageText = string.Format("Benefit Plan must have a value" + benefitPlanNameSuffix, bnftPlan.BnftPlanName), Fieldname = "BnftPlanName" });
                }

                if (bnftPlan.BnftPlanID.Trim() == "")
                {
                    messages.Add(new Message() { MessageText = string.Format("Benefit Plan ID must have a value"+ benefitPlanNameSuffix, bnftPlan.BnftPlanID), Fieldname = "BnftPlanID" });
                }

                string benefitPlanType = _repoFactory.BenefitPlan().FindAll(w => w.BnftPlanSK == bnftPlan.BnftPlanSK)
                     .Select(s => s.BnftPlanType.BnftPlanTypeCode).FirstOrDefault();
                switch (benefitPlanType)
                {
                    case "Pharmacy":

                        PopGrpBnftPlan popGrpBnftPlan = _repoFactory.PopulationGroupBenefitPlan().FindOne(q => q.PopGrpPBPSK == popGrpPBPSK && q.PBPBnftPlan.BnftPlanSK==bnftPlan.BnftPlanSK);

                        if (popGrpBnftPlan == null || popGrpBnftPlan.AcctPCNSK == null)
                        {
                            messages.Add(new Message() { MessageText = string.Format("A PCN must be picked" + benefitPlanNameSuffix, ""), Fieldname = "AcctPCNSK" });
                        }

                        if (popGrpBnftPlan == null || popGrpBnftPlan.ElctrncProcsngDayLim == null)
                        {
                            messages.Add(new Message() { MessageText = string.Format("An Electronic Submission Window must be picked" + benefitPlanNameSuffix, ""), Fieldname = "ElctrncProcsngDayLim" });
                        }

                        if (popGrpBnftPlan == null || popGrpBnftPlan.ClmReversalDayLim == null)
                        {
                            messages.Add(new Message() { MessageText = string.Format("A Reversal Window must be picked" + benefitPlanNameSuffix, ""), Fieldname = "ClmReversalDayLim" });
                        }

                        if (popGrpBnftPlan == null || popGrpBnftPlan.PaperProcsngDayLim == null)
                        {
                            messages.Add(new Message() { MessageText = string.Format("A Paper Submission Window must be picked" + benefitPlanNameSuffix, ""), Fieldname = "PaperProcsngDayLim" });
                        }

                        if (bnftPlan.FrmlrySK==null || bnftPlan.FrmlrySK==0)
                        {
                            messages.Add(new Message() { MessageText = string.Format("A formulary must be picked"+ benefitPlanNameSuffix, ""), Fieldname = "FrmlrySK" });
                        }

                        if (bnftPlan.OneMthDaySuplAmt==null)
                        {
                            messages.Add(new Message() { MessageText = string.Format("One Month Day Supply Amount" + benefitPlanNameSuffix, ""), Fieldname = "OneMthDaySuplAmt" });
                        }

                        BnftPlanPharmType bnftPlanPharmType = _repoFactory.BenefitPlanPharmacyType().FindOne(f=>f.BnftPlanSK==bnftPlan.BnftPlanSK);
                        if (bnftPlanPharmType == null)
                        {
                            messages.Add(new Message() { MessageText = string.Format("At least one pharmacy type must be filled out " + benefitPlanNameSuffix, ""), Fieldname = "OneMthDaySuplAmt" });
                        }

                        break;
                    default:
                        messages.AddRange(ValidatePBPServiceArea(popGrpPBP.PBPSK, benefitPlanNameSuffix));
                        break;
                }


            }

            // messages.Add(new Message() { MessageText = string.Format("ToGrpSK: field is required.", itemToValidate.ToGrpSK), Fieldname = "ToGrpSK" });

            return messages;
        }

        /// <summary>
        /// Return a list of messages for when a submit for approval action happens
        /// </summary>
        /// <param name="popGrpPBPSK"></param>
        /// <returns>List of Validation Messages</returns>
        public List<Message> ValidatePopGrpPBPServiceArea(long popGrpPBPSK)
        {
            List<Message> messages = new List<Message>();
            PopGrpPBP popGrpPBP = _repoFactory.PopulationGroupPlanBenefitPackage().FindOne(q => q.PopGrpPBPSK == popGrpPBPSK);
            PBP pbp = _repoFactory.PlanBenefitPackage().FindOne(a => a.PBPSK == popGrpPBP.PBPSK);
            IQueryable<BnftPlan> bnftPlans = _repoFactory.PlanBenefitPackageBenefitPlan().FindAll(a => a.PBPSK == popGrpPBP.PBPSK).Select(s => s.BnftPlan);
            foreach (BnftPlan bnftPlan in bnftPlans)
            {
                string benefitPlanNameSuffix = " for " + bnftPlan.BnftPlanName;
                string benefitPlanType = _repoFactory.BenefitPlan().FindAll(w => w.BnftPlanSK == bnftPlan.BnftPlanSK)
                     .Select(s => s.BnftPlanType.BnftPlanTypeCode).FirstOrDefault();

                switch (benefitPlanType)
                {
                    case "Pharmacy":
                        break;
                    default:
                        messages.AddRange(ValidatePBPServiceArea(popGrpPBP.PBPSK, benefitPlanNameSuffix));
                        break;
                }
            }

            return messages;
        }

        /// <summary>
        /// Return a list of messages for when a submit for approval action happens
        /// </summary>
        /// <param name="popGrpPBPSK"></param>
        /// <returns>List of Validation Messages</returns>
        public List<Message> ValidatePBPServiceArea(long PBPSK, string benefitPlanNameSuffix = null)
        {
            List<Message> messages = new List<Message>();
            SvcArea svcArea = _repoFactory.ServiceArea().FindOne(q => q.PBPSK == PBPSK);
            SvcAreaStPrvncCode svcAreaStPrvncCode = null;
            if (svcArea != null)
            {
                svcAreaStPrvncCode = _repoFactory.ServiceAreaStateProvince()
                    .FindOne(q => q.SvcAreaSK == svcArea.SvcAreaSK && (q.StPrvncCode.StPrvncCode1 == "MI" || q.StPrvncCode.StPrvncCode1 == "IL"));
            }

            if (svcArea == null || svcAreaStPrvncCode == null)
            {
                messages.Add(new Message() { MessageText = string.Format("At least one state (MI or IL) must be selected for the service area " + benefitPlanNameSuffix, ""), Fieldname = "SvcAreaStPrvncCodeSK" });
            }

            return messages;
        }

        #endregion " Population Group - Plan Benefit Package "

        #region " Private Methods - Population Group "

        /// <summary>
        /// Get population Group with PBP List by GrpSK
        /// </summary>
        /// <param name="grpSK">the group ID</param>
        /// <returns>List of Population Group with PBP</returns>
        private List<GroupCopyContentsVM> PopulatePopulationGroup(long grpSK)
        {
            List<GroupCopyContentsVM> popGroupList = new List<GroupCopyContentsVM>();
            popGroupList = _repoFactory.PopulationGroupPlanBenefitPackage().FindAll(w => w.PopGrp.GrpSK == grpSK)
                .Select(s => new GroupCopyContentsVM()
                {
                    GrpSK = grpSK,
                    ToGrpSK = null,
                    PopGrpSK = s.PopGrpSK,
                    PopGrpName = s.PopGrp.PopGrpName,
                    PBPSK = s.PBPSK,
                    EfctvStartDt = s.EfctvStartDt,
                    EfctvEndDt = s.EfctvEndDt,
                    PBPName = s.PBP.PBPName,
                    PBPID = s.PBP.PBPID,
                    PlanPgmCode = s.PlanPgmCode,
                    NewPlanPgmCode = null
                }).ToList();

            return popGroupList;
        }

        #endregion " Private Methods - Population Group "

        #region " Private Methods - Plan Benefit Package "

        /// <summary>
        /// Get the Default Plan Benefit Package for a Population Group - New Skeleton
        /// </summary>
        /// <param name="popGrpSK">the Population Group SK</param>
        /// <param name="pbpSK">the Plan Benefit Package SK</param>
        /// <returns>Population Group Plan Benefit Packages</returns>
        private PopulationGroupPlanBenefitPackageVM GetDefaultPlanBenefitPackage(long popGrpSK, long pbpSK)
        {
            PopulationGroupPlanBenefitPackageVM planBenefitPackage = _repoFactory.PlanBenefitPackage().FindAll(pbp => pbp.PBPSK == pbpSK)
                .Select(p => new PopulationGroupPlanBenefitPackageVM()
                {
                    PopGrpSK = popGrpSK,
                    PBPSK = p.PBPSK,
                    PBPName = p.PBPName,
                    PBPID = p.PBPID,
                    PBPEfctvStartDt = p.EfctvStartDt,
                    PBPEfctvEndDt = p.EfctvEndDt,
                    WorkFlowStatus = this.CurrentWorkFlowStatus
                }).FirstOrDefault();

            return planBenefitPackage;
        }

        /// <summary>
        /// Get a Plan Benefit Packages for a Population Group
        /// </summary>
        /// <param name="popGrpPBPSK">the Population Group Plan Benefit Package SK</param>
        /// <returns>Population Group Plan Benefit Packages</returns>
        private PopulationGroupPlanBenefitPackageVM GetPlanBenefitPackage(long popGrpPBPSK)
        {
            PopGrpPBP popGrpPBP = _repoFactory.PopulationGroupPlanBenefitPackage().FindOne(p => p.PopGrpPBPSK == popGrpPBPSK);
            PBP pbp = _repoFactory.PlanBenefitPackage().FindOne(p => p.PBPSK == popGrpPBP.PBPSK);

            PopulationGroupPlanBenefitPackageVM planBenefitPackage = new PopulationGroupPlanBenefitPackageVM()
            {
                PopGrpPBPSK = popGrpPBP.PopGrpPBPSK,
                PopGrpSK = popGrpPBP.PopGrpSK,
                PopGrpPBPEfctvStartDt = popGrpPBP.EfctvStartDt,
                PopGrpPBPEfctvEndDt = popGrpPBP.EfctvEndDt,
                PBPSK = popGrpPBP.PBPSK,
                PBPName = pbp.PBPName,
                PBPID = pbp.PBPID,
                PBPEfctvStartDt = pbp.EfctvStartDt,
                PBPEfctvEndDt = pbp.EfctvEndDt,
                PlanPgmCode = popGrpPBP.PlanPgmCode,
                AccumtrRestartMth = popGrpPBP.AccumtrRestartMth,
                AccumtrRestartDay = popGrpPBP.AccumtrRestartDay,
                DOSProcsngStartDt = popGrpPBP.DOSProcsngStartDt,
                DOSProcsngEndDt = popGrpPBP.DOSProcsngEndDt,
                WorkFlowStatus = this.CurrentWorkFlowStatus
            };

            return planBenefitPackage;
        }

        /// <summary>
        /// Populate a New Plan Benefit Package for a Population Group - New Skeleton
        /// </summary>
        /// <param name="popGrpSK">the Population Group SK</param>
        /// <param name="pbpSK">the Plan Benefit Package SK</param>
        /// <returns>Population Group Plan Benefit Packages</returns>
        private PopulationGroupPlanBenefitPackageVM PopulateNewPlanBenefitPackage(long popGrpSK, long pbpSK)
        {
            PopulationGroupPlanBenefitPackageVM planBenefitPackage = GetDefaultPlanBenefitPackage(popGrpSK, pbpSK);
            planBenefitPackage.BenefitPlans = PopulateNewBenefitPlans(pbpSK);
            return planBenefitPackage;
        }

        /// <summary>
        /// Populate a Plan Benefit Packages for a Population Group
        /// </summary>
        /// <param name="popGrpPBPSK">the Population Group Plan Benefit Package SK</param>
        /// <returns>Population Group Plan Benefit Packages</returns>
        private PopulationGroupPlanBenefitPackageVM PopulatePlanBenefitPackage(long popGrpPBPSK)
        {
            PopulationGroupPlanBenefitPackageVM planBenefitPackage = GetPlanBenefitPackage(popGrpPBPSK);
            planBenefitPackage.BenefitPlans = PopulateAllBenefitPlans(popGrpPBPSK);
            return planBenefitPackage;
        }

        /// <summary>
        /// Populate the Plan Benefit Packages for a Population Group
        /// </summary>
        /// <param name="popGrpSK">the Population Group SK</param>
        /// <returns>List of Population Group Plan Benefit Packages</returns>
        private List<PopulationGroupPlanBenefitPackageList> PopulatePlanBenefitPackages(long popGrpSK)
        {
            return _repoFactory.AtlasBenefitPlanStoredProcs().GetPopulationGroupPBPList(popGrpSK)
                .Select(
                    n => new PopulationGroupPlanBenefitPackageList()
                    {
                        PopGrpPBPSK = n.PopGrpPBPSK,
                        PopGrpSK = n.PopGrpSK,
                        PBPSK = n.PBPSK,
                        PBPName = n.PBPName,
                        PBPID = n.PBPID,
                        PlanPgmCode = n.PlanPgmCode,
                        EfctvStartDt = n.EfctvStartDt,
                        EfctvEndDt = n.EfctvEndDt,
                        DOSProcsngStartDt = n.DOSProcsngStartDt,
                        DOSProcsngEndDt = n.DOSProcsngEndDt,
                        CurrentStatus = n.StatDesc,
                        Active = n.isActive == 1,
                        isLocked = n.isLocked == 1
                    }
                ).ToList();
        }

        /// <summary>
        /// Check to see if the Plan Benefit Package Locked from any structural changes (i.e. New Benefit Plans, Tiers, etc...)
        /// </summary>
        /// <returns>is the PBP Plan Benefit Package Locked</returns>
        private bool isPlanBenefitPackageLocked()
        {
            return !UnlockedWorkFlowStatus.Contains(CurrentWorkFlowStatus);
        }

        /// <summary>
        /// Set the Work Flow Status for the Population Group Plan Benefit Package
        /// </summary>
        /// <param name="popGrpPBPSK">the Population Group Plan Benefit Package SK</param>
        /// <returns>the WorkFlow Status</returns>
        private void SetWorkFlowStatus(long popGrpPBPSK)
        {
            CurrentWorkFlowStatus = _repoFactory.PopulationGroupPlanBenefitPlanStatusCurrent().GetCurrentStatus(popGrpPBPSK);
        }

        /// <summary>
        /// Validate if a Population Group and Plan Benefit Packages is a Valid Assignment
        /// </summary>
        /// <param name="pbp">The PBP.</param>
        /// <param name="popGrp">The pop GRP.</param>
        /// <returns>Population Group Plan Benefit Packages</returns>
        private bool ValidatePlanBenefitPackageAssignment(PBP pbp, PopGrp popGrp)
        {
            return (pbp == null || popGrp == null) ? false : ((popGrp.EfctvStartDt <= pbp.EfctvStartDt) && (pbp.EfctvEndDt <= popGrp.EfctvEndDt));
        }

        #endregion " Private Methods - Plan Benefit Package "

        #region " Private Methods - Benefit Plans "

        /// <summary>
        /// Get a list of all Benefit Plans for a Plan Benefit Package
        /// </summary>
        /// <param name="pbpSK">the Plan Benefit Package ID</param>
        /// <returns>list of Benefit Plans for a the Plan Benefit Package</returns>
        private List<PopulationGroupBenefitPlanVM> GetDefaultBenefitPlans(long pbpSK)
        {
            List<PopulationGroupBenefitPlanVM> populationGroupBenefitPlans = new List<PopulationGroupBenefitPlanVM>();
            IQueryable<PBPBnftPlan> pbpBenefitPlans = _repoFactory.PlanBenefitPackageBenefitPlan().FindAll(w => w.PBPSK == pbpSK).AsQueryable();

            populationGroupBenefitPlans = pbpBenefitPlans
                  .Select(bp => new PopulationGroupBenefitPlanVM()
                  {
                      PBPBnftPlanSK = bp.PBPBnftPlanSK,
                      BnftPlanSK = bp.BnftPlanSK,
                      BenefitPlanType = bp.BnftPlan.BnftPlanType.BnftPlanTypeCode,
                      BnftPlanName = bp.BnftPlan.BnftPlanName,
                      BnftPlanID = bp.BnftPlan.BnftPlanID
                  }).ToList();

            return populationGroupBenefitPlans;
        }

        /// <summary>
        /// Get List of all the Benefit Plan in a Plan Benefit Package - Before being lock
        /// </summary>
        /// <param name="popGrpPBPSK">the Population Group Plan Benefit Package SK</param>
        /// <returns>list of Benefit Plans for a the Population Group Plan Benefit Package</returns>
        private List<PopulationGroupBenefitPlanVM> GetDraftBenefitPlans(long popGrpPBPSK)
        {
            List<PopulationGroupBenefitPlanVM> populationGroupBenefitPlans = new List<PopulationGroupBenefitPlanVM>();
            long pbpSK = _repoFactory.PopulationGroupPlanBenefitPackage().FindAll(w => w.PopGrpPBPSK == popGrpPBPSK).FirstOrDefault().PBPSK;

            IQueryable<PBPBnftPlan> pbpBenefitPlans = _repoFactory.PlanBenefitPackageBenefitPlan().FindAll(w => w.PBPSK == pbpSK).AsQueryable();
            IQueryable<PopGrpBnftPlan> popGrpBenefitPlans = _repoFactory.PopulationGroupBenefitPlan().FindAll(w => w.PopGrpPBPSK == popGrpPBPSK).AsQueryable();

            var query = from mstr in pbpBenefitPlans
                        join dtl in popGrpBenefitPlans on mstr.PBPBnftPlanSK equals dtl.PBPBnftPlanSK into p
                        from rslt in p.DefaultIfEmpty()
                        select new { mstr, rslt };

            populationGroupBenefitPlans = query
                .Select(bp => new PopulationGroupBenefitPlanVM
                {
                    PopGrpBnftPlanSK = bp.rslt != null ? bp.rslt.PopGrpBnftPlanSK : 0,
                    PopGrpPBPSK = popGrpPBPSK,
                    PBPBnftPlanSK = bp.mstr.PBPBnftPlanSK,
                    BnftPlanSK = bp.mstr.BnftPlanSK,
                    BenefitPlanType = bp.mstr.BnftPlan.BnftPlanType.BnftPlanTypeCode,
                    BnftPlanName = bp.mstr.BnftPlan.BnftPlanName,
                    BnftPlanID = bp.mstr.BnftPlan.BnftPlanID,
                    AcctRXBINSK = bp.rslt != null ? bp.rslt.AcctRXBINSK : null,
                    AcctPCNSK = bp.rslt != null ? bp.rslt.AcctPCNSK : null,
                    DMRProcsngDayLim = bp.rslt != null ? bp.rslt.DMRProcsngDayLim : null,
                    UCFProcsngWindowDayLim = bp.rslt != null ? bp.rslt.UCFProcsngWindowDayLim : null,
                    PaperProcsngDayLim = bp.rslt != null ? bp.rslt.PaperProcsngDayLim : null,
                    ElctrncProcsngDayLim = bp.rslt != null ? bp.rslt.ElctrncProcsngDayLim : null,
                    ClmReversalDayLim = bp.rslt != null ? bp.rslt.ClmReversalDayLim : null,
                    PrcsOutofNtwrkClaimsInd = bp.rslt != null ? bp.rslt.PrcsOutofNtwrkClaimsInd : false,
                    PayblPatRespCodes = bp.rslt != null ? bp.rslt.PayblPatRespCodes : null
                }).ToList();

            return populationGroupBenefitPlans;
        }

        /// <summary>
        /// Get List of all the Benefit Plan in a Plan Benefit Package - that has been sent for approval for the Population Group
        /// </summary>
        /// <param name="popGrpPBPSK">the Population Group Plan Benefit Package SK</param>
        /// <returns>list of Benefit Plans for a the Population Group Plan Benefit Package</returns>
        private List<PopulationGroupBenefitPlanVM> GetFinalBenefitPlans(long popGrpPBPSK)
        {
            List<PopulationGroupBenefitPlanVM> populationGroupBenefitPlans = new List<PopulationGroupBenefitPlanVM>();
            IQueryable<PopGrpBnftPlan> popGrpBenefitPlans = _repoFactory.PopulationGroupBenefitPlan().FindAll(w => w.PopGrpPBPSK == popGrpPBPSK).AsQueryable();

            populationGroupBenefitPlans = popGrpBenefitPlans
                .Select(bp => new PopulationGroupBenefitPlanVM
                {
                    PopGrpBnftPlanSK = bp.PopGrpBnftPlanSK,
                    PopGrpPBPSK = bp.PopGrpPBPSK,
                    PBPBnftPlanSK = bp.PBPBnftPlanSK,
                    BnftPlanSK = bp.PBPBnftPlan.BnftPlanSK,
                    BenefitPlanType = bp.PBPBnftPlan.BnftPlan.BnftPlanType.BnftPlanTypeCode,
                    BnftPlanName = bp.PBPBnftPlan.BnftPlan.BnftPlanName,
                    BnftPlanID = bp.PBPBnftPlan.BnftPlan.BnftPlanID,
                    AcctRXBINSK = bp.AcctRXBINSK,
                    AcctPCNSK = bp.AcctPCNSK,
                    DMRProcsngDayLim = bp.DMRProcsngDayLim,
                    UCFProcsngWindowDayLim = bp.UCFProcsngWindowDayLim,
                    PaperProcsngDayLim = bp.PaperProcsngDayLim,
                    ElctrncProcsngDayLim = bp.ElctrncProcsngDayLim,
                    ClmReversalDayLim = bp.ClmReversalDayLim,
                    PrcsOutofNtwrkClaimsInd = bp.PrcsOutofNtwrkClaimsInd,
                    PayblPatRespCodes = bp.PayblPatRespCodes
                }).ToList();

            return populationGroupBenefitPlans;
        }

        /// <summary>
        /// Get List of all the Benefit Plan in a Plan Benefit Package
        /// </summary>
        /// <param name="popGrpPBPSK">the Population Group Plan Benefit Package SK</param>
        /// <returns>list of Benefit Plans for a the Population Group Plan Benefit Package</returns>
        private List<PopulationGroupBenefitPlanVM> PopulateAllBenefitPlans(long popGrpPBPSK)
        {
            List<PopulationGroupBenefitPlanVM> benefitPlans = isPlanBenefitPackageLocked() ? GetFinalBenefitPlans(popGrpPBPSK) : GetDraftBenefitPlans(popGrpPBPSK);
            foreach (PopulationGroupBenefitPlanVM benefitPlan in benefitPlans)
            {
                benefitPlan.ProviderNetworkTiers = PopulateAllBenefitPlanNetworkTiers(benefitPlan.PopGrpBnftPlanSK, benefitPlan.BnftPlanSK);
            }

            return benefitPlans;
        }

        /// <summary>
        /// Get a list of all Benefit Plans for a Plan Benefit Package
        /// </summary>
        /// <param name="pbpSK">the Plan Benefit Package ID</param>
        /// <returns>list of Benefit Plans for a the Plan Benefit Package</returns>
        private List<PopulationGroupBenefitPlanVM> PopulateNewBenefitPlans(long pbpSK)
        {
            List<PopulationGroupBenefitPlanVM> benefitPlans = GetDefaultBenefitPlans(pbpSK);
            foreach (PopulationGroupBenefitPlanVM benefitPlan in benefitPlans)
            {
                benefitPlan.PrcsOutofNtwrkClaimsInd = true;
                benefitPlan.ProviderNetworkTiers = PopulateNewBenefitPlanNetworkTiers(benefitPlan.BnftPlanSK);
            }

            return benefitPlans;
        }

        #endregion " Private Methods - Benefit Plans "

        #region " Private Methods - Network Tiers "

        /// <summary>
        /// Get the Default Network Tiers for a Benefit Plan
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan ID</param>
        /// <returns>list of Network Tiers for a  Benefit Plan</returns>
        private List<NetworkNetworkTierVM> GetDefaultNetworkTiers(long bnftPlanSK)
        {
            List<NetworkNetworkTierVM> benefitPlanNetworkTiers = new List<NetworkNetworkTierVM>();
            IQueryable<NtwrkTier> ntwrkTiers = _repoFactory.NetworkTier()
                .FindAll(w => w.BnftPlanSK == bnftPlanSK && w.NtwrkTierType.NtwrkTierName != OutOfNetworkTier)
                .AsQueryable();

            benefitPlanNetworkTiers = ntwrkTiers
                  .Select(nt => new NetworkNetworkTierVM()
                  {
                      NtwrkTierSK = nt.NtwrkTierSK,
                      BnftPlanSK = nt.BnftPlanSK,
                      NtwrkTierName = nt.NtwrkTierType.NtwrkTierName
                  }).ToList();

            return benefitPlanNetworkTiers;
        }

        /// <summary>
        /// Get the Network Tiers for a Population Group Benefit Plan - Before being locked
        /// </summary>
        /// <param name="popGrpBnftPlanSK">the Population Group Benefit Plan ID</param>
        /// <param name="bnftPlanSK">The BNFT plan sk.</param>
        /// <returns>list of Network Tiers for a the Population Group Benefit Plan</returns>
        private List<NetworkNetworkTierVM> GetDraftBenefitPlanNetworkTiers(long popGrpBnftPlanSK, long bnftPlanSK)
        {
            List<NetworkNetworkTierVM> benefitPlanNetworkTiers = new List<NetworkNetworkTierVM>();
            IQueryable<NtwrkTier> ntwrkTiers = _repoFactory.NetworkTier()
                .FindAll(w => w.BnftPlanSK == bnftPlanSK && w.NtwrkTierType.NtwrkTierName != OutOfNetworkTier)
                .AsQueryable();
            IQueryable<NtwrkNtwrkTier> ntwrkNtwrkTiers = _repoFactory.NetworkNetworkTier()
                .FindAll(w => w.PopGrpBnftPlanSK == popGrpBnftPlanSK && w.NtwrkTier.NtwrkTierType.NtwrkTierName != OutOfNetworkTier)
                .AsQueryable();

            var query = from mstr in ntwrkTiers
                        join dtl in ntwrkNtwrkTiers on mstr.NtwrkTierSK equals dtl.NtwrkTierSK into p
                        from rslt in p.DefaultIfEmpty()
                        select new { mstr, rslt };

            benefitPlanNetworkTiers = query
                  .Select(nt => new NetworkNetworkTierVM()
                  {
                      NtwrkNtwrkTierSK = nt.rslt != null ? nt.rslt.NtwrkNtwrkTierSK : 0,
                      PopGrpBnftPlanSK = popGrpBnftPlanSK,
                      BnftPlanSK = nt.mstr.BnftPlanSK,
                      NtwrkTierSK = nt.mstr.NtwrkTierSK,
                      NtwrkTierName = nt.mstr.NtwrkTierType.NtwrkTierName,
                      NtwrkSK = nt.rslt != null ? nt.rslt.NtwrkSK : 0,
                      MACListSK = nt.rslt != null ? nt.rslt.MACListSK : null,
                      EfctvStartDt = nt.rslt != null ? nt.rslt.EfctvStartDt : DateTime.MinValue,
                      EfctvEndDt = nt.rslt != null ? nt.rslt.EfctvEndDt : DateTime.MinValue
                  }).ToList();
            return benefitPlanNetworkTiers;
        }

        /// <summary>
        /// Get the Network Tiers for a Population Group Benefit Plan - that has been sent for approval for the Population Group
        /// </summary>
        /// <param name="popGrpBnftPlanSK">the Population Group Benefit Plan ID</param>
        /// <returns>list of Network Tiers for a the Population Group Benefit Plan</returns>
        private List<NetworkNetworkTierVM> GetFinalBenefitPlanNetworkTiers(long popGrpBnftPlanSK)
        {
            List<NetworkNetworkTierVM> benefitPlanNetworkTiers = new List<NetworkNetworkTierVM>();
            IQueryable<NtwrkNtwrkTier> ntwrkNtwrkTiers = _repoFactory.NetworkNetworkTier()
                .FindAll(w => w.PopGrpBnftPlanSK == popGrpBnftPlanSK && w.NtwrkTier.NtwrkTierType.NtwrkTierName != OutOfNetworkTier).AsQueryable();

            benefitPlanNetworkTiers = ntwrkNtwrkTiers
                  .Select(nt => new NetworkNetworkTierVM()
                  {
                      NtwrkNtwrkTierSK = nt.NtwrkNtwrkTierSK,
                      PopGrpBnftPlanSK = nt.PopGrpBnftPlanSK,
                      BnftPlanSK = nt.NtwrkTier.BnftPlanSK,
                      NtwrkTierSK = nt.NtwrkTierSK,
                      NtwrkTierName = nt.NtwrkTier.NtwrkTierType.NtwrkTierName,
                      NtwrkSK = nt.NtwrkSK,
                      MACListSK = nt.MACListSK,
                      EfctvStartDt = nt.EfctvStartDt,
                      EfctvEndDt = nt.EfctvEndDt
                  }).ToList();

            return benefitPlanNetworkTiers;
        }

        /// <summary>
        /// Get the Network Tiers for a Population Group Benefit Plan
        /// </summary>
        /// <param name="popGrpBnftPlanSK">the Population Group Benefit Plan ID</param>
        /// <param name="bnftPlanSK">The BNFT plan sk.</param>
        /// <returns>list of Network Tiers for a the Population Group Benefit Plan</returns>
        private List<NetworkNetworkTierVM> PopulateAllBenefitPlanNetworkTiers(long popGrpBnftPlanSK, long bnftPlanSK)
        {
            return popGrpBnftPlanSK == 0
                ? GetDefaultNetworkTiers(bnftPlanSK)
                : isPlanBenefitPackageLocked() ? GetFinalBenefitPlanNetworkTiers(popGrpBnftPlanSK) : GetDraftBenefitPlanNetworkTiers(popGrpBnftPlanSK, bnftPlanSK); ;
        }

        /// <summary>
        /// Get the Network Tiers for a Benefit Plan
        /// </summary>
        /// <param name="bnftPlanSK">the Benefit Plan ID</param>
        /// <returns>list of Network Tiers for a Benefit Plan</returns>
        private List<NetworkNetworkTierVM> PopulateNewBenefitPlanNetworkTiers(long bnftPlanSK)
        {
            return GetDefaultNetworkTiers(bnftPlanSK);
        }

        #endregion " Private Methods - Network Tiers "

        #region " Private Methods - Utility "

        /// <summary>
        /// Get the Plan Benefit Package Record
        /// </summary>
        /// <param name="pbpSK">the Plan Benefit Package SK</param>
        /// <returns>a PBP</returns>
        private IQueryable<PBP> GetPlanBenefitPackageRecord(long pbpSK)
        {
            return _repoFactory.PlanBenefitPackage().FindAll(w => w.PBPSK == pbpSK);
        }

        /// <summary>
        /// Get Status Type by Status Description
        /// </summary>
        /// <param name="statDesc">the Status Description</param>
        /// <returns>the Status Type Record</returns>
        private StatType GetStatusType(string statDesc)
        {
            StatType statusType = _repoFactory.StatusType().FindAll(w => w.StatDesc == statDesc).FirstOrDefault();
            return statusType ?? new StatType();
        }

        #endregion " Private Methods - Utility "

        #region " Private Methods - Set "

        /// <summary>
        /// Create a New Population Group Plan Benefit Package Status Record
        /// </summary>
        /// <param name="repository">the Population Group Benefit Plan Repository</param>
        /// <param name="repositoryNetworkNetworkTier">the Network Network Tier Repository</param>
        /// <param name="planBenefitPackage">the PopGrop PBP EF Entity</param>
        /// <param name="itemToAddOrUpdate">the PopulationGroupBenefitPlan View Model to Update From</param>
        private void SetBenefitPlan(IPopulationGroupBenefitPlanRepository repository, INetworkNetworkTierRepository repositoryNetworkNetworkTier, PopGrpPBP planBenefitPackage, PopulationGroupBenefitPlanVM itemToAddOrUpdate)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            PopGrpBnftPlan benefitPlan = itemToAddOrUpdate.PopGrpBnftPlanSK != 0
                ? repository.FindOne(p => p.PopGrpBnftPlanSK == itemToAddOrUpdate.PopGrpBnftPlanSK)
                : new PopGrpBnftPlan()
                {
                    PopGrpPBPSK = itemToAddOrUpdate.PopGrpPBPSK,
                    PBPBnftPlanSK = itemToAddOrUpdate.PBPBnftPlanSK,
                    EfctvStartDt = planBenefitPackage.EfctvStartDt,
                    EfctvEndDt = planBenefitPackage.EfctvEndDt,
                    CreatedBy = itemToAddOrUpdate.CurrentUser,
                    CreatedTs = timeStamp
                };

            benefitPlan.AcctRXBINSK = itemToAddOrUpdate.AcctRXBINSK;
            benefitPlan.AcctPCNSK = itemToAddOrUpdate.AcctPCNSK;
            benefitPlan.AccumtrRestartMth = planBenefitPackage.AccumtrRestartMth;
            benefitPlan.AccumtrRestartDay = planBenefitPackage.AccumtrRestartDay;
            benefitPlan.DOSProcsngStartDt = planBenefitPackage.DOSProcsngStartDt;
            benefitPlan.DOSProcsngEndDt = planBenefitPackage.DOSProcsngEndDt;
            benefitPlan.DMRProcsngDayLim = itemToAddOrUpdate.DMRProcsngDayLim;
            benefitPlan.UCFProcsngWindowDayLim = itemToAddOrUpdate.UCFProcsngWindowDayLim;
            benefitPlan.PaperProcsngDayLim = itemToAddOrUpdate.PaperProcsngDayLim;
            benefitPlan.ElctrncProcsngDayLim = itemToAddOrUpdate.ElctrncProcsngDayLim;
            benefitPlan.ClmReversalDayLim = itemToAddOrUpdate.ClmReversalDayLim;
            benefitPlan.PrcsOutofNtwrkClaimsInd = itemToAddOrUpdate.PrcsOutofNtwrkClaimsInd;
            benefitPlan.PayblPatRespCodes = itemToAddOrUpdate.PayblPatRespCodes;
            benefitPlan.LastModfdBy = itemToAddOrUpdate.CurrentUser;
            benefitPlan.LastModfdTs = timeStamp;

            foreach (NetworkNetworkTierVM item in itemToAddOrUpdate.ProviderNetworkTiers)
            {
                SetBenefitPlanNetworkTier(repositoryNetworkNetworkTier, benefitPlan, item);
            }

            repository.AddOrUpdate(benefitPlan);

            itemToAddOrUpdate.PopGrpBnftPlanSK = benefitPlan.PopGrpBnftPlanSK;
            benefitPlan.PopGrpPBP = planBenefitPackage;
            planBenefitPackage.PopGrpBnftPlan.Add(benefitPlan);
        }

        /// <summary>
        /// Add or Update a Population Group Network Tier
        /// </summary>
        /// <param name="repository">the Network Network Tier Repository</param>
        /// <param name="benefitPlan">The benefit plan.</param>
        /// <param name="itemToAddOrUpdate">the PopulationGroup Network Tier to Add or Update</param>
        public void SetBenefitPlanNetworkTier(INetworkNetworkTierRepository repository, PopGrpBnftPlan benefitPlan, NetworkNetworkTierVM itemToAddOrUpdate)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            NtwrkNtwrkTier networkNetworkTier = itemToAddOrUpdate.NtwrkNtwrkTierSK != 0
                ? repository.FindOne(p => p.NtwrkNtwrkTierSK == itemToAddOrUpdate.NtwrkNtwrkTierSK)
                : new NtwrkNtwrkTier()
                {
                    PopGrpBnftPlanSK = itemToAddOrUpdate.PopGrpBnftPlanSK,
                    NtwrkTierSK = itemToAddOrUpdate.NtwrkTierSK,
                    CreatedBy = itemToAddOrUpdate.CurrentUser,
                    CreatedTs = timeStamp
                };

            networkNetworkTier.NtwrkSK = itemToAddOrUpdate.NtwrkSK;
            networkNetworkTier.MACListSK = itemToAddOrUpdate.MACListSK;
            networkNetworkTier.EfctvStartDt = itemToAddOrUpdate.EfctvStartDt;
            networkNetworkTier.EfctvEndDt = itemToAddOrUpdate.EfctvEndDt;
            networkNetworkTier.LastModfdBy = itemToAddOrUpdate.CurrentUser;
            networkNetworkTier.LastModfdTs = timeStamp;
            networkNetworkTier.DelTs = itemToAddOrUpdate.Deleted ? (DateTime?)timeStamp : null;

            repository.AddOrUpdate(networkNetworkTier);

            itemToAddOrUpdate.NtwrkNtwrkTierSK = networkNetworkTier.NtwrkNtwrkTierSK;
            networkNetworkTier.PopGrpBnftPlan = benefitPlan;
            benefitPlan.NtwrkNtwrkTier.Add(networkNetworkTier);
        }

        /// <summary>
        /// Add or Update a Set Plan Benefit Package for a Population Group
        /// </summary>
        /// <param name="itemToAddOrUpdate">the PopulationGroup Plan Benefit Package Entry to Add or Update</param>
        /// <returns>PopulationGroupPlanBenefitPackageVM.</returns>
        private PopulationGroupPlanBenefitPackageVM SetPlanBenefitPackage(PopulationGroupPlanBenefitPackageVM itemToAddOrUpdate)
        {
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            using (var repository = _repoFactory.PopulationGroupPlanBenefitPackage())
            using (var repoStatus = _repoFactory.PopulationGroupPlanBenefitPackageStatus())
            using (var repoBenfitPlan = _repoFactory.PopulationGroupBenefitPlan())
            using (var repoNetworkTier = _repoFactory.NetworkNetworkTier())
            {
                PopGrpPBP populationGroupPlanBenefitPackage = itemToAddOrUpdate.PopGrpPBPSK != 0
                    ? repository.FindOne(p => p.PopGrpPBPSK == itemToAddOrUpdate.PopGrpPBPSK)
                    : new PopGrpPBP()
                    {
                        PopGrpSK = itemToAddOrUpdate.PopGrpSK,
                        PBPSK = itemToAddOrUpdate.PBPSK,
                        CreatedBy = itemToAddOrUpdate.CurrentUser,
                        CreatedTs = timeStamp
                    };

                populationGroupPlanBenefitPackage.PlanPgmCode = itemToAddOrUpdate.PlanPgmCode;
                populationGroupPlanBenefitPackage.AccumtrRestartMth = itemToAddOrUpdate.AccumtrRestartMth;
                populationGroupPlanBenefitPackage.AccumtrRestartDay = itemToAddOrUpdate.AccumtrRestartDay;
                populationGroupPlanBenefitPackage.DOSProcsngStartDt = itemToAddOrUpdate.DOSProcsngStartDt;
                populationGroupPlanBenefitPackage.DOSProcsngEndDt = itemToAddOrUpdate.DOSProcsngEndDt;
                populationGroupPlanBenefitPackage.LastModfdBy = itemToAddOrUpdate.CurrentUser;
                populationGroupPlanBenefitPackage.LastModfdTs = timeStamp;

                if (itemToAddOrUpdate.PopGrpPBPSK == 0)
                {
                    SetPlanBenefitPackageStatus(repoStatus, populationGroupPlanBenefitPackage, itemToAddOrUpdate);
                }

                foreach (PopulationGroupBenefitPlanVM item in itemToAddOrUpdate.BenefitPlans)
                {
                    SetBenefitPlan(repoBenfitPlan, repoNetworkTier, populationGroupPlanBenefitPackage, item);
                }

                repository.AddOrUpdate(populationGroupPlanBenefitPackage);
                repository.SaveChanges();

                itemToAddOrUpdate.PopGrpPBPSK = populationGroupPlanBenefitPackage.PopGrpPBPSK;
                return itemToAddOrUpdate;
            }
        }

        /// <summary>
        /// Create a New Population Group Plan Benefit Package Status Record
        /// </summary>
        /// <param name="repository">the Population Group Plan Benefit Package Status Repository</param>
        /// <param name="populationGroupPlanBenefitPackage">the PopGrop PBP EF Entity</param>
        /// <param name="itemToAddOrUpdate">the PopulationGroupPlanBenefitPackage View Model to Update From</param>
        private void SetPlanBenefitPackageStatus(IPopulationGroupPlanBenefitPackageStatusRepository repository, PopGrpPBP populationGroupPlanBenefitPackage, PopulationGroupPlanBenefitPackageVM itemToAddOrUpdate)
        {
            // Set the PopGrpPBP Effective Start and End Date to the PBP
            DateTime timeStamp = UtilityFunctions.GetTimeStamp();

            PBP pbp = GetPlanBenefitPackageRecord(itemToAddOrUpdate.PBPSK).FirstOrDefault();
            populationGroupPlanBenefitPackage.EfctvStartDt = pbp.EfctvStartDt;
            populationGroupPlanBenefitPackage.EfctvEndDt = pbp.EfctvEndDt;

            // Create a PopGrpPBPStat Record
            StatType draftWorkStatus = GetStatusType(DraftWorkFlowStatus);
            PopGrpPBPStat statusRecord = new PopGrpPBPStat()
            {
                StatTypeSK = draftWorkStatus.StatTypeSK,
                StatType = draftWorkStatus,
                EfctvStartDt = populationGroupPlanBenefitPackage.EfctvStartDt,
                EfctvEndDt = populationGroupPlanBenefitPackage.EfctvEndDt,
                CreatedBy = itemToAddOrUpdate.CurrentUser,
                CreatedTs = timeStamp,
                LastModfdBy = itemToAddOrUpdate.CurrentUser,
                LastModfdTs = timeStamp
            };

            repository.AddOrUpdate(statusRecord);

            statusRecord.PopGrpPBP = populationGroupPlanBenefitPackage;
            populationGroupPlanBenefitPackage.PopGrpPBPStat.Add(statusRecord);
        }

        #endregion " Private Methods - Set "

        #region " Private Methods - Validation "

        /// <summary>
        /// Validate the Accumulator Restart Date
        /// </summary>
        /// <param name="itemToValidate">the PopulationGroup Plan Benefit Package Entry to Validate</param>
        /// <param name="validationDateRange">the Effective Date Range for Validation</param>
        /// <returns>the Validation Message</returns>
        private List<Message> ValidateAccumulatorRestartDate(PopulationGroupPlanBenefitPackageVM itemToValidate, DateTimeRange validationDateRange)
        {
            List<Message> messages = new List<Message>();
            //if (itemToValidate.AccumtrRestartDt != null)
            //{
            //    if ((itemToValidate.AccumtrRestartDt < validationDateRange.Start) || (validationDateRange.End < itemToValidate.AccumtrRestartDt))
            //    {
            //        messages.Add(new Message()
            //        {
            //            MessageText = string.Format("Invalid Accumulator Restart Date, value must be between {0:d} and {1:d}.", validationDateRange.Start, validationDateRange.End),
            //            Fieldname = "AccumtrRestartDt"
            //        });
            //    }
            //}
            return messages;
        }

        /// <summary>
        /// Validate a Benefit Plan for a Plan Benefit Package
        /// </summary>
        /// <param name="itemToValidate">the PopulationGroup Plan Benefit Package Entry to Validate</param>
        /// <param name="validationDateRange">the Effective Date Range for Validation</param>
        /// <returns>a List of Validate Error Messages</returns>
        private List<Message> ValidateBenefitPlan(PopulationGroupPlanBenefitPackageVM itemToValidate, DateTimeRange validationDateRange)
        {
            List<Message> messages = new List<Message>();
            int index = 0;
            foreach (PopulationGroupBenefitPlanVM item in itemToValidate.BenefitPlans)
            {
                messages.AddRange(ValidateNetworkTiers(item, index, validationDateRange));
                index++;
            }
            return messages;
        }

        /// <summary>
        /// Validate a Network Tiers for a Benefit Plan
        /// </summary>
        /// <param name="itemToValidate">the PopulationGroup Plan Benefit Package Entry to Validate</param>
        /// <param name="validationDateRange">the Effective Date Range for Validation</param>
        /// <returns>a List of Validate Error Messages</returns>
        private List<Message> ValidateDOSProcsngDates(PopulationGroupPlanBenefitPackageVM itemToValidate, DateTimeRange validationDateRange)
        {
            List<Message> messages = new List<Message>();
            if (!(new DateTimeRange(itemToValidate.DOSProcsngStartDt, itemToValidate.DOSProcsngEndDt).Inside(validationDateRange)))
            {
                messages.Add(new Message()
                {
                    MessageText = string.Format("Invalid Effective Start ({0:d}) and End Date ({1:d}) for DOS Processing Dates.", validationDateRange.Start, validationDateRange.End),
                    Fieldname = string.Format("DOSProcsngStartDt")
                });
            }
            return messages;
        }

        /// <summary>
        /// Populate the Effectives dates in the View Model
        /// </summary>
        /// <param name="itemToValidate">the Population Group Plan Benefit Package View Model</param>
        /// <returns>DateTimeRange.</returns>
        private DateTimeRange ValidateGetEffectiveDateRange(PopulationGroupPlanBenefitPackageVM itemToValidate)
        {
            DateTimeRange returnValue = itemToValidate.PopGrpPBPSK == 0
                ? GetPlanBenefitPackageRecord(itemToValidate.PBPSK)
                    .Select(s => new DateTimeRange() { Start = s.EfctvStartDt, End = s.EfctvEndDt }).FirstOrDefault()
                : _repoFactory.PopulationGroupPlanBenefitPackage().FindAll(w => w.PopGrpPBPSK == itemToValidate.PopGrpPBPSK)
                        .Select(s => new DateTimeRange() { Start = s.EfctvStartDt, End = s.EfctvEndDt }).FirstOrDefault();
            return returnValue;
        }

        /// <summary>
        /// Validate a Network Tiers for a Benefit Plan
        /// </summary>
        /// <param name="itemToValidate">the PopulationGroup Plan Benefit Package Entry to Validate</param>
        /// <param name="bpIndex">Index of the bp.</param>
        /// <param name="validationDateRange">the Effective Date Range for Validation</param>
        /// <returns>a List of Validate Error Messages</returns>
        private List<Message> ValidateNetworkTiers(PopulationGroupBenefitPlanVM itemToValidate, int bpIndex, DateTimeRange validationDateRange)
        {
            List<Message> messages = new List<Message>();
            int index = 0;
            foreach (NetworkNetworkTierVM item in itemToValidate.ProviderNetworkTiers)
            {
                if (!(new DateTimeRange(item.EfctvStartDt, item.EfctvEndDt).Inside(validationDateRange)))
                {
                    messages.Add(new Message()
                    {
                        MessageText = string.Format("Invalid Effective Start ({0:d}) and End Date ({1:d}) for Network Tier. The range is outside the bounds of either the Benefit Plan Package or the intersection between the Benefit Plan Package and the Population Group.", validationDateRange.Start, validationDateRange.End),
                        Fieldname = string.Format("BenefitPlans[{0}].ProviderNetworkTiers[{1}].EfctvStartDt", bpIndex, index)
                    });
                    index++;
                }
            }
            return messages;
        }

        /// <summary>
        /// Validate a PlanBenefitPackage for a Population Group
        /// </summary>
        /// <param name="itemToValidate">the PopulationGroup Plan Benefit Package Entry to Validate</param>
        /// <returns>a List of Validate Error Messages</returns>
        private List<Message> ValidatePlanBenefitPackage(PopulationGroupPlanBenefitPackageVM itemToValidate)
        {
            List<Message> messages = new List<Message>();
            DateTimeRange validationDateRange = ValidateGetEffectiveDateRange(itemToValidate);

            messages.AddRange(ValidatePlanProgramCode(itemToValidate, validationDateRange));
            //messages.AddRange(ValidateAccumulatorRestartDate(itemToValidate, validationDateRange));
            messages.AddRange(ValidateDOSProcsngDates(itemToValidate, validationDateRange));
            messages.AddRange(ValidateBenefitPlan(itemToValidate, validationDateRange));
            return messages;
        }

        /// <summary>
        /// Validate the Plan Program Code
        /// </summary>
        /// <param name="itemToValidate">the PopulationGroup Plan Benefit Package Entry to Validate</param>
        /// <param name="validationDateRange">the Effective Date Range for Validation</param>
        /// <returns>the Validation Message</returns>
        private List<Message> ValidatePlanProgramCode(PopulationGroupPlanBenefitPackageVM itemToValidate, DateTimeRange validationDateRange)
        {
            List<Message> messages = new List<Message>();
            if ((itemToValidate.PlanPgmCode ?? string.Empty) != string.Empty)
            {
                List<PopGrpPBP> planBenefitPackages = _repoFactory.PopulationGroupPlanBenefitPackage()
                    .FindAll(p => p.PopGrpPBPSK != itemToValidate.PopGrpPBPSK && p.PlanPgmCode.ToLower() == itemToValidate.PlanPgmCode.ToLower())
                    .ToList();

                if (planBenefitPackages.Count() > 0)
                {
                    foreach (PopGrpPBP item in planBenefitPackages)
                    {
                        if (validationDateRange.Intersects(new DateTimeRange(item.EfctvStartDt, item.EfctvEndDt)))
                        {
                            messages.Add(new Message() { MessageText = string.Format("Plan Program Code already exists."), Fieldname = "PlanPgmCode" });
                            break;
                        }
                    }
                }
            }
            return messages;
        }

        #endregion " Private Methods - Validation "
    }
}