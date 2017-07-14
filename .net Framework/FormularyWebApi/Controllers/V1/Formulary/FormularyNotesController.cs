using Atlas.Core.WebApi.Services;
using Atlas.Formulary.DAL;
using Atlas.Formulary.DAL.ViewModels;
using System;
using System.Linq;
using System.Web.Http;

namespace AtlasWebApi.Controllers.V1.Formulary
{
    public class FormularyNotesController : ApiController
    {
        private IFormularyRepositoryFactory _repoFactory;
        private IExceptionMessageGenerator _exceptionResponseGenerator;
  

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="repoFactory">Formulary repositry factory</param>
        /// <param name="exceptionResponseGenerator">Exception handler</param>
        public FormularyNotesController(IFormularyRepositoryFactory repoFactory, IExceptionMessageGenerator exceptionResponseGenerator)
        {
            _repoFactory = repoFactory;
            _exceptionResponseGenerator = exceptionResponseGenerator;
        }

        [HttpGet]
        public IHttpActionResult GetFormularyNotes(long formularySK)
        {
            try
            {
                using (var repo = _repoFactory.Formulary())
                {
                    var result = repo.GetFormularyNotes(formularySK);
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpPut]
        public IHttpActionResult PutFormularyNotes(FormularyNotesVM notes)
        {
            try
            {
                using (var repo = _repoFactory.Formulary())
                {
                    string userId = Request.Headers.GetValues("username").FirstOrDefault();
                    if (string.IsNullOrEmpty(userId))
                    {
                        throw new Exception("userId not found in header.");
                    }
                    
                    var result = repo.PutFormularyNotes(notes, userId);

                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }

        [HttpPost]
        public IHttpActionResult PostFormularyNotes(FormularyNotesVM notes)
        {
            try
            {
                using (var repo = _repoFactory.Formulary())
                {
                    string userId = Request.Headers.GetValues("username").FirstOrDefault();
                    if (string.IsNullOrEmpty(userId))
                    {
                        throw new Exception("userId not found in header.");
                    }
                    notes.FrmlryNoteSK = null;
                    var result = repo.PutFormularyNotes(notes, userId);                  

                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(_exceptionResponseGenerator.GetExceptionMessage(ex));
            }
        }       
    }
}
