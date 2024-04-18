public class Notification
{
    public int Id { get; set; }
    public string Content { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Foreign Key
    public int UserId { get; set; }

    // Navigation property
    public User User { get; set; }
}
