using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.Models.Containers;
using Atlas.Formulary.DAL.ViewModels.ProgramVM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.Repositories.Interfaces
{
    public interface IProgramRepository : IRepository<StepThrpyPgm>
    {
        List<spCvrgPrptyPgm_GetAll_Result> GetAllCoveragePropertyPrograms();
        List<spCvrgPrptyPgm_GetFormularies_Result> GetCoveragePropertyProgramFormularies(long coveragePropertyProgramSK);
        void DeleteCoveragePropertyProgram(long coveragePropertyProgramSK, string userId);
        long CopyCoveragePropertyProgram(long coveragePropertyProgramSK, string userId);

        spStepThrpyPgm_Get_Result GetStepTherapyHeader(long coveragePropertyProgramSK);
        long SetStepTherapyHeader(StepTherapyProgramVM data, string userId);

        spPAPgm_Get_Result GetPriorAuthorizationHeader(long coveragePropertyProgramSK);
        long SetPriorAuthorizationHeader(PriorAuthorizationProgramVM data, string userId);

        void SetCoveragePropertyProgramCriteriaGroup(CvrgPrptyPgmCrtriaGrpSP programCriteriaGroup);
        List<spCvrgPrptyPgmCrtriaGrp_GetAll_Result> GetCoveragePropertyProgramCriteriaGroup(long coveragePropertyProgramSK);
        void DeleteCoveragePropertyProgramCriteriaGroup(long coveragePropertyProgramSK, string userId);
        void ActivateCoveragePropertyProgram(long coveragePropertyProgramSK, string userId);
        List<spCvrgPrptyPgm_FullTextSearch_Result> SmartSearchCoveragePropertyProgram(string searchString);
        List<spFormulary_GetAllWithPA_Result> GetFormulariesWithPA();
    }
}
