using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
  public class Edit
  {
    public class Command : IRequest
    {
      public Activity Activity { get; set; }
    }

    public class Handler : IRequestHandler<Command>
    {
      private readonly DataContext _context;
      public Handler(DataContext context)
      {
        _context = context;
      }

      public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
      {
        var activity = request.Activity;
        var activityInDb = await _context.Activities.FindAsync(activity.Id);

        if (activityInDb == null) throw new Exception("Unable to find activity with the id: " + activity.Id);

        activityInDb.Title = activity.Title ?? activityInDb.Title;
        // activityInDb.Description = activity.Description ?? activityInDb.Description;
        // activityInDb.Category = activity.Category ?? activityInDb.Category;
        // activityInDb.City = activity.City ?? activityInDb.City;
        // activityInDb.Venue = activity.Venue ?? activityInDb.Venue;

        await _context.SaveChangesAsync();

        return Unit.Value;
      }
    }
  }
}