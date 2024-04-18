public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
    public string Password { get; set; } 
    public string FullName { get; set; }
    public string Role { get; set; }
    public string Phone { get; set; }
    public string CreatedBy { get; set; }

    // Navigation property for related notifications
    public ICollection<Notification> Notifications { get; set; } = new List<Notification>();
}
