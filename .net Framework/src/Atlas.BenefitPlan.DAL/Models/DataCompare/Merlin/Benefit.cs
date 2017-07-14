using Atlas.BenefitPlan.DAL.Models.DataCompare.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Atlas.BenefitPlan.DAL.Models.DataCompare.Merlin
{
    /// <summary>
    /// the Merlin Benefit Class for Data Compare
    /// </summary>
    public class Benefit : CompareEntity
    {
        public string AtlasRecordId { get; set; }
        public long? AtlasPlanGroupId { get; set; }
        public long? AtlasBenefitId { get; set; }
        public string PlanBenefitCode { get; set; }
        public string BenefitName { get; set; }
        public string BenefitStatus { get; set; }
        public string PlanBenefitType { get; set; }
        public DateTime? EffDate { get; set; }
        public DateTime? TermDate { get; set; }
        public bool? AllowEmergencyFill { get; set; }
        public bool? AllowOutOfNetworkClaims { get; set; }
        public bool? AllowTransitionRefill { get; set; }
        public bool? ApplyPlanPricing { get; set; }
        public bool? CopayRequired { get; set; }
        public bool? CSHCSPlan { get; set; }
        public int? DaysAllowedOnline { get; set; }
        public int? DaysAllowedPaper { get; set; }
        public int? DaysAllowedReversal { get; set; }
        public string HelpDeskPhone { get; set; }
        public bool? LicsSubsidy { get; set; }
        public string NonPrefPharmExclTierCodes { get; set; }
        public decimal? PartBCopayPct { get; set; }
        public bool? PassThroughPricing { get; set; }
        public string PlanDedExclTierCodes { get; set; }
        public string PrefPharmExclTierCodes { get; set; }
        public DateTime? RenewalDate { get; set; }
        public bool? SpecDrugAtSpecPharm { get; set; }
        public bool? EmbeddedDeductible { get; set; }
        public decimal? DeductAmountIndv { get; set; }
        public decimal? DeductAmountFmly { get; set; }
        public decimal? CoInsuranceStartAmt { get; set; }
        public decimal? CoInsOOPMaxIndiv { get; set; }
        public decimal? CoInsOOPMaxFamily { get; set; }
        public string ApplicableCoveragePhases { get; set; }
        public decimal? OutOfPocketAmountIndv { get; set; }
        public decimal? OutOfPocketAmountFmly { get; set; }
        public decimal? MaxBenefitIndv { get; set; }
        public decimal? MaxBenefitFmly { get; set; }
        public bool? AccumDAWPenaltyInOOP { get; set; }
        public string PBSpareField01 { get; set; }
        public string PLSpareField01 { get; set; }

        /// <summary>
        /// the Children Nodes for Benefit
        /// </summary>
        public List<Copay> Copay { get; set; }
        public List<CopayDistribution> CopayDistribution { get; set; }
        public List<DAWCopay> DAWCopay { get; set; }
        public List<CoveragePhase> CoveragePhase { get; set; }
        public List<PharmaLimits> PharmaLimits { get; set; }
        public List<ProgramCode> ProgramCode { get; set; }

        /// <summary>
        /// the Constructor for Benefit
        /// </summary>
        public Benefit()
        {
            this.Copay = new List<Copay>();
            this.CopayDistribution = new List<CopayDistribution>();
            this.DAWCopay = new List<DAWCopay>();
            this.CoveragePhase = new List<CoveragePhase>();
            this.PharmaLimits = new List<PharmaLimits>();
            this.ProgramCode = new List<ProgramCode>();

            this.ExcludedEntity.AddRange(new List<string>() { "Copay", "CopayDistribution", "DAWCopay", "CoveragePhase", "PharmaLimits", "ProgramCode" });
        }

        public List<CompareResults> Compare(Benefit another)
        {
            List<CompareResults> results = new List<CompareResults>();

            results.AddRange(CompareCoveragePhase(another));
            results.AddRange(CompareCopay(another));
            results.AddRange(CompareCopayDistribution(another));
            results.AddRange(CompareDAWCopay(another));
            results.AddRange(ComparePharmaLimits(another));
            results.AddRange(CompareProgramCode(another));

            return results;
        }

        private List<CompareResults> CompareCoveragePhase(Benefit another)
        {
            List<CompareResults> results = new List<CompareResults>();

            if (this.CoveragePhase.Count() != another.CoveragePhase.Count())
            {
                results.Add(CompareFunctions.PopulateErrorMessage(
                    atlasRecordId: this.AtlasRecordId
                    , className: this.GetType().Name
                    , message: string.Format("CoveragePhase does not have the same number of entries ({0}) ({1})", this.CoveragePhase.Count().ToString(), another.CoveragePhase.Count().ToString())
                    , atlasValue: this.CoveragePhase.Count().ToString()
                    , systemValue: another.CoveragePhase.Count().ToString()));
            }

            foreach (CoveragePhase item in this.CoveragePhase)
            {
                CoveragePhase checkCoveragePhase = another.CoveragePhase.Where(s => s.CoveragePhaseName == item.CoveragePhaseName).First();
                results.AddRange((checkCoveragePhase != null)
                    ? item.CompareEx(checkCoveragePhase)
                    : new List<CompareResults>() {
                        CompareFunctions.PopulateErrorMessage(
                            atlasRecordId: item.AtlasRecordId
                            , className: "CoveragePhase"
                            , message: string.Format("{0} does not exists in Target Benefit Plan", item.CoveragePhaseName)) }
                    );
            }

            return results;
        }

        private List<CompareResults> CompareCopay(Benefit another)
        {
            List<CompareResults> results = new List<CompareResults>();

            if (this.Copay.Count() != another.Copay.Count())
            {
                results.Add(CompareFunctions.PopulateErrorMessage(
                    atlasRecordId: this.AtlasRecordId
                    , className: this.GetType().Name
                    , message: string.Format("Copay does not have the same number of entries ({0}) ({1})", this.Copay.Count().ToString(), another.Copay.Count().ToString())
                    , atlasValue: this.Copay.Count().ToString()
                    , systemValue: another.Copay.Count().ToString()));
            }

            foreach (Copay item in another.Copay)
            {
                CoveragePhase merlinCoveragePhase = another.CoveragePhase.Where(w => w.AtlasCoveragePhaseId == item.CoveragePhaseId).FirstOrDefault();
                CoveragePhase atlasCoveragePhase = this.CoveragePhase.Where(w => w.CoveragePhaseName == merlinCoveragePhase.CoveragePhaseName).FirstOrDefault();
                item.AtlasCoveragePhaseId = atlasCoveragePhase.AtlasCoveragePhaseId;
            }

            foreach (Copay item in this.Copay)
            {
                Copay checkCopay = another.Copay.Where(s =>
                            s.FulfillmentType == item.FulfillmentType &&
                            s.PharmNetworkId == item.PharmNetworkId &&
                            s.FormularyTierId == item.FormularyTierId &&
                            s.AtlasCoveragePhaseId == item.AtlasCoveragePhaseId &&
                            s.Maintenance == item.Maintenance).First();

                results.AddRange((checkCopay != null)
                    ? item.CompareEx(checkCopay)
                    : new List<CompareResults>() {
                        CompareFunctions.PopulateErrorMessage(
                            atlasRecordId: item.AtlasRecordId
                            , className: "Copay"
                            , message: string.Format("{0} does not exists in Target Benefit Plan", item.AtlasRecordId)) }
                    );
            }

            return results;
        }

        private List<CompareResults> CompareCopayDistribution(Benefit another)
        {
            List<CompareResults> results = new List<CompareResults>();

            if (this.CopayDistribution.Count() != another.CopayDistribution.Count())
            {
                results.Add(CompareFunctions.PopulateErrorMessage(
                    atlasRecordId: this.AtlasRecordId
                    , className: this.GetType().Name
                    , message: string.Format("CopayDistribution does not have the same number of entries ({0}) ({1})", this.CopayDistribution.Count().ToString(), another.CopayDistribution.Count().ToString())
                    , atlasValue: this.CopayDistribution.Count().ToString()
                    , systemValue: another.CopayDistribution.Count().ToString()));
            }

            // =============================================================================
            //  TODO:  Once the Copay Distribution is fixed by IT Ticket, then add the 
            //         Lookup for Copay Distribution
            // =============================================================================

            //foreach (CopayDistribution item in this.CopayDistribution)
            //{
            //    CopayDistribution checkCopayDistribution = another.CopayDistribution.Where(s =>
            //                s.FulfillmentType == item.FulfillmentType &&
            //                s.PharmNetworkId == item.PharmNetworkId &&
            //                s.FormularyTierId == item.FormularyTierId &&
            //                s.AtlasCoveragePhaseId == item.AtlasCoveragePhaseId &&
            //                s.Maintenance == item.Maintenance).First();

            //    results.AddRange((checkCopayDistribution != null)
            //        ? item.CompareEx(checkCopayDistribution)
            //        : new List<CompareResults>() {
            //            CompareFunctions.PopulateErrorMessage(
            //                atlasRecordId: item.AtlasRecordId
            //                , className: "CopayDistribution"
            //                , message: string.Format("{0} does not exists in Target Benefit Plan", item.AtlasRecordId)) }
            //        );
            //}
            return results;
        }

        private List<CompareResults> CompareDAWCopay(Benefit another)
        {
            List<CompareResults> results = new List<CompareResults>();

            if (this.DAWCopay.Count() != another.DAWCopay.Count())
            {
                results.Add(CompareFunctions.PopulateErrorMessage(
                    atlasRecordId: this.AtlasRecordId
                    , className: this.GetType().Name
                    , message: string.Format("DAWCopay does not have the same number of entries ({0}) ({1})", this.DAWCopay.Count().ToString(), another.DAWCopay.Count().ToString())
                    , atlasValue: this.DAWCopay.Count().ToString()
                    , systemValue: another.DAWCopay.Count().ToString()));
            }

            foreach (DAWCopay item in this.DAWCopay)
            {
                DAWCopay checkDAWCopay = another.DAWCopay.Where(s =>
                            s.PharmNetworkId == item.PharmNetworkId &&
                            s.Maintenance == item.Maintenance &&
                            s.FormularyTierId == item.FormularyTierId &&
                            s.DAWType == item.DAWType).First();

                results.AddRange((checkDAWCopay != null)
                    ? item.CompareEx(checkDAWCopay)
                    : new List<CompareResults>() {
                        CompareFunctions.PopulateErrorMessage(
                            atlasRecordId: item.AtlasRecordId
                            , className: "DAWCopay"
                            , message: string.Format("{0} does not exists in Target Benefit Plan", item.AtlasRecordId)) }
                    );
            }

            return results;
        }

        private List<CompareResults> ComparePharmaLimits(Benefit another)
        {
            List<CompareResults> results = new List<CompareResults>();

            if (this.PharmaLimits.Count() != another.PharmaLimits.Count())
            {
                results.Add(CompareFunctions.PopulateErrorMessage(
                    atlasRecordId: this.AtlasRecordId
                    , className: this.GetType().Name
                    , message: string.Format("PharmaLimits does not have the same number of entries ({0}) ({1})", this.PharmaLimits.Count().ToString(), another.PharmaLimits.Count().ToString())
                    , atlasValue: this.PharmaLimits.Count().ToString()
                    , systemValue: another.PharmaLimits.Count().ToString()));
            }

            foreach (PharmaLimits item in this.PharmaLimits)
            {
                PharmaLimits checkPharmaLimits = another.PharmaLimits.Where(s => s.FulfillmentType == item.FulfillmentType).First();
                results.AddRange((checkPharmaLimits != null)
                    ? item.CompareEx(checkPharmaLimits)
                    : new List<CompareResults>() {
                        CompareFunctions.PopulateErrorMessage(
                            atlasRecordId: item.AtlasRecordId
                            , className: "PharmaLimits"
                            , message: string.Format("{0} does not exists in Target Benefit Plan", item.FulfillmentType)) }
                    );
            }
            return results;
        }

        private List<CompareResults> CompareProgramCode(Benefit another)
        {
            List<CompareResults> results = new List<CompareResults>();

            if (this.ProgramCode.Count() != another.ProgramCode.Count())
            {
                results.Add(CompareFunctions.PopulateErrorMessage(
                    atlasRecordId: this.AtlasRecordId
                    , className: this.GetType().Name
                    , message: string.Format("ProgramCode does not have the same number of entries ({0}) ({1})", this.ProgramCode.Count().ToString(), another.ProgramCode.Count().ToString())
                    , atlasValue: this.ProgramCode.Count().ToString()
                    , systemValue: another.ProgramCode.Count().ToString()));
            }

            foreach (ProgramCode item in this.ProgramCode)
            {
                ProgramCode checkProgramCode = another.ProgramCode.Where(s => s.ProgGroupCode == item.ProgGroupCode).First();
                results.AddRange((checkProgramCode != null)
                    ? item.CompareEx(checkProgramCode)
                    : new List<CompareResults>() {
                        CompareFunctions.PopulateErrorMessage(
                            atlasRecordId: item.AtlasRecordId
                            , className: "ProgramCode"
                            , message: string.Format("{0} does not exists in Target Benefit Plan", item.ProgGroupCode)) }
                    );
            }

            return results;
        }
    }
}