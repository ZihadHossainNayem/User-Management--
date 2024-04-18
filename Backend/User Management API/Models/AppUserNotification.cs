namespace User_Management_API.Models
{
    public class AppUserNotification
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; } // Navigation property back to User

        public int NotificationId { get; set; }
        public Notification Notification { get; set; } // Navigation property back to Notification

        public bool IsRead { get; set; } = false; // Defaults to false when created
    }
}
