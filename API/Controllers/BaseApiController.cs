using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class BaseApiController : ControllerBase
  {

    // Create a class that will expose _mediator to all child.. inheritence
    // Create protect class that will provide mediator else if null will fetch IMediator service using the httpContext.requestservice api endpoint
    private IMediator _mediator;

    // null coalesing assigment operator, if null then assign what ever is to the right of the Null coaalesing assigment operator.
    protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
  }
}