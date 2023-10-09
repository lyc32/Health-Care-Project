package net.javaguides.springboot.memoryDB;

public class Message
{
    public String id;
    public Long fromAccountId;
    public String fromAccountName;
    public Long toAccountId;
    public String toAccountName;
    public String type;
    public String time;
    public String title;
    public String message;
    public String obj;
    public int read;

    @Override
    public String toString() {
        return "Message{" +
                "id='" + id + '\'' +
                ", fromAccountId=" + fromAccountId +
                ", fromAccountName='" + fromAccountName + '\'' +
                ", toAccountId=" + toAccountId +
                ", toAccountName='" + toAccountName + '\'' +
                ", Type='" + type + '\'' +
                ", time='" + time + '\'' +
                ", title='" + title + '\'' +
                ", message='" + message + '\'' +
                ", obj='" + obj + '\'' +
                '}';
    }
}
