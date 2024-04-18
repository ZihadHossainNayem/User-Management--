using Microsoft.AspNetCore.SignalR;

public class NotificationHub : Hub
{
    public async Task AddUserToRoleGroup(string userRole)
    {
        if (userRole == "Admin")
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "Admin");
        }
    }

    
}
