using Atlas.Configuration;
using Atlas.Core.DAL.Repositories;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.Models.Containers;
using Atlas.Formulary.DAL.Repositories.Interfaces;
using Atlas.Formulary.DAL.ViewModels.ProgramVM;
using EntityFrameworkExtras.EF6;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Atlas.Formulary.DAL.Repositories
{
    public class ProgramRepository : EFRepositoryBase<StepThrpyPgm, FormularyEntities>, IProgramRepository
    {
        public ProgramRepository(IConfig config, FormularyEntities db) : base(config, db) { }
        
        public List<spCvrgPrptyPgm_GetAll_Result> GetAllCoveragePropertyPrograms()
        {
            var result = _db.spCvrgPrptyPgm_GetAll().ToList();
            return result;
        }

        public List<spCvrgPrptyPgm_GetFormularies_Result> GetCoveragePropertyProgramFormularies(long coveragePropertyProgramSK)
        {
            var result = _db.spCvrgPrptyPgm_GetFormularies(coveragePropertyProgramSK).ToList();
            return result;
        }

        public void DeleteCoveragePropertyProgram(long coveragePropertyProgramSK, string userId)
        {
            var result = _db.spCvrgPrptyPgm_Delete(coveragePropertyProgramSK, userId).FirstOrDefault();
            if (result.ErrorNumber != 0)
            {
                throw new Exception(result.ErrorMessage);
            }
        }
        
        public long CopyCoveragePropertyProgram(long coveragePropertyProgramSK, string userId)
        {
            var result = _db.spCvrgPrptyPgm_Copy(coveragePropertyProgramSK, userId).FirstOrDefault();
            if (result.ErrorNumber != 0)
            {
                throw new Exception(result.ErrorMessage);
            }
            return result.ErrorSeverity.Value;
        }

        public spStepThrpyPgm_Get_Result GetStepTherapyHeader(long coveragePropertyProgramSK)
        {
            var result = _db.spStepThrpyPgm_Get(coveragePropertyProgramSK).FirstOrDefault();
            return result;
        }

        public long SetStepTherapyHeader(StepTherapyProgramVM data, string userId)
        {
            var result = _db.spStepThrpyPgm_Put(data.StepThrpyPgmSK, 
                                                data.CvrgPrptyPgmSK, 
                                                data.DrugRefDbSK, 
                                                data.CvrgPrptyPgmName, 
                                                data.ClaimsMsgCode, 
                                                data.ClaimsMsgText, 
                                                data.StepCnt, 
                                                userId).FirstOrDefault();
            if (result.ErrorNumber != 0)
            {
                throw new Exception(result.ErrorMessage);
            }
            return result.ErrorSeverity.Value;
        }

        public spPAPgm_Get_Result GetPriorAuthorizationHeader(long coveragePropertyProgramSK)
        {
            var result = _db.spPAPgm_Get(coveragePropertyProgramSK).FirstOrDefault();
            return result;
        }

        public long SetPriorAuthorizationHeader(PriorAuthorizationProgramVM data, string userId)
        {
            var result = _db.spPAPgm_Put(data.PAPgmSK, 
                                         data.CvrgPrptyPgmSK, 
                                         data.FrmlrySK,
                                         data.DrugRefDbSK, 
                                         data.CvrgPrptyPgmName, 
                                         data.ClaimsMsgCode, 
                                         data.ClaimsMsgText, 
                                         data.CvrgDurn, 
                                         data.ExclCrtria,
                                         data.ReqMedclInfo, 
                                         data.AgeRstrctn, 
                                         data.PrescbrRstrctn, 
                                         data.OthCrtria, 
                                         data.CvrdUses,
                                         userId).FirstOrDefault(); 

            if (result.ErrorNumber != 0)
            {
                throw new Exception(result.ErrorMessage);
            }
            return result.ErrorSeverity.Value;
        }

        public void SetCoveragePropertyProgramCriteriaGroup(CvrgPrptyPgmCrtriaGrpSP programCriteriaGroup)
        {
            _db.Database.ExecuteStoredProcedure(programCriteriaGroup);
        }

        public List<spCvrgPrptyPgmCrtriaGrp_GetAll_Result> GetCoveragePropertyProgramCriteriaGroup(long coveragePropertyProgramSK)
        {
            var result = _db.spCvrgPrptyPgmCrtriaGrp_GetAll(coveragePropertyProgramSK).ToList();
            return result;
        }

        public void DeleteCoveragePropertyProgramCriteriaGroup(long coveragePropertyProgramSK, string userId)
        {
            var result = _db.spCvrgPrptyPgmCrtriaGrp_CascadeDelete(coveragePropertyProgramSK, userId).FirstOrDefault();
            if (result.ErrorNumber != 0)
            {
                throw new Exception(result.ErrorMessage);
            }
        }

        public void ActivateCoveragePropertyProgram(long coveragePropertyProgramSK, string userId)
        {
            _db.spCvrgPrptyPgm_Finish(coveragePropertyProgramSK, userId);
        }

        public List<spCvrgPrptyPgm_FullTextSearch_Result> SmartSearchCoveragePropertyProgram(string searchString)
        {
            var result = _db.spCvrgPrptyPgm_FullTextSearch(searchString).ToList();
            return result;
        }

        public List<spFormulary_GetAllWithPA_Result> GetFormulariesWithPA()
        {
            var result = _db.spFormulary_GetAllWithPA().ToList();
            return result;
        }
    }
}
