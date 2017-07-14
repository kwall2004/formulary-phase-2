using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.Models.Containers;
using System;
using System.Linq;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.DrugList
{
    public class DrugListCriteriaGroupController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;

        public DrugListCriteriaGroupController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        [HttpGet]
        public IHttpActionResult GetAllDrugListCriteriaGroup(long drugListSK, bool isNewRequest, int startIndex,
                int count)
        {
            try
            {
                var userId = Request.Headers.GetValues("username").FirstOrDefault();
                var sessionIdString = Request.Headers.GetValues("sessionid").FirstOrDefault();

                if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(sessionIdString))
                {
                    throw new Exception("userId or sessionId missing from header of request!");
                }

                var sessionId = Guid.Parse(sessionIdString);

                using (var repo = _repoFactory.DrugList())
                {
                    var result = repo.GetDrugListsDetailPaged(drugListSK, isNewRequest, startIndex, count, userId, sessionId);
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpGet]
        public IHttpActionResult GetDrugListCriteriaGroup(long drugListDetailSK)
        {
            try
            {
                using (var repo = _repoFactory.DrugList())
                {
                    var result = repo.GetDrugListDetailCriteriaGroup(drugListDetailSK);
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpPost]
        public IHttpActionResult PostDrugListCriteriaGroup(DrugListDtlCrtriaGrpSP data)
        {
            //data.DrugListDtlSK = 0;

            foreach (var tbl in data.tblRules)
            {
                tbl.CrtriaPrity = 5;
            }

            return SetDrugListCriteriaGroup(data);
        }

        [HttpPut]
        public IHttpActionResult PutDrugListCriteriaGroup(DrugListDtlCrtriaGrpSP data)
        {
            return SetDrugListCriteriaGroup(data);
        }

        private IHttpActionResult SetDrugListCriteriaGroup(DrugListDtlCrtriaGrpSP data)
        {
            try
            {
                using (var repo = _repoFactory.DrugList())
                {
                    repo.SetDrugListDetailCriteriaGroup(data);
                    return Ok("Successful");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }

        }

        [HttpDelete]
        public IHttpActionResult DeleteDrugListDetail(long DrugListDetailSK)
        {
            try
            {
                using (var repo = _repoFactory.DrugList())
                {
                    repo.DeleteDrugListDetail(DrugListDetailSK);
                    return Ok("Delete Successful");
                }
            }
            catch(Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

    }
}
