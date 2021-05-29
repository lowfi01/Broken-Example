using Microsoft.AspNetCore.Http;

namespace Infrastructure.Security
{
  public class UserAccessor
  {
    public UserAccessor(IHttpContextAccessor accessor)
    {
    }
  }
}