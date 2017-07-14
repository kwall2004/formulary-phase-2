using Atlas.Core.DAL.Models.Containers;
using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.Models;
using Atlas.Formulary.DAL.ViewModels;
using Atlas.Reference.DAL;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.DrugDetail
{
    public class NDCNotesController : ApiController
    {
        private IExceptionMessageGenerator _exceptionResponseGenerator;
        private IFormularyRepositoryFactory _repoFactory;
        private IReferenceRepositoryFactory _refRepo;

        public NDCNotesController( IExceptionMessageGenerator exceptionResponseGenerator, IFormularyRepositoryFactory NDCFactory, IReferenceRepositoryFactory refRepo)
        {
            _exceptionResponseGenerator = exceptionResponseGenerator;
            _repoFactory = NDCFactory;
            _refRepo = refRepo;
        }

        [HttpGet]
        public IHttpActionResult GetAllNDCNotes(string NDC)
        {
            try
            {
                using (var repo = _repoFactory.NDCNotes())
                {
                    List<spNDCNotes_GetAll_Result> NDCNotes = repo.GetAll(NDC);
                    var result = new QueryResult<spNDCNotes_GetAll_Result>() { Rows = NDCNotes, Count = NDCNotes.Count };
                    return Ok(NDCNotes);
                }
            }
            catch(Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

         private IHttpActionResult SetNDCNotes(NDCNoteVM NDC)
        {
            try
            {
                using (var repo = _repoFactory.NDCNotes())
                {
                    var result = repo.PutNDCNotes(NDC);
                    var SK = NDC.NDCNoteSK;
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
    
        }

        [HttpPost]
        public IHttpActionResult AddNDCNote(NDCNoteVM NDC)
        {
            NDC.NDCNoteSK = null;
            return SetNDCNotes(NDC);
        }

        [HttpPut]
        public IHttpActionResult UpdateNDCNote(NDCNoteVM NDC)
        {
            return SetNDCNotes(NDC);
        }    

    }
}
