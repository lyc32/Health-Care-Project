package net.javaguides.springboot.memoryDB;

import java.util.List;
import java.util.concurrent.*;

public class MemoryDB
{
    public static ConcurrentHashMap<Integer, CopyOnWriteArrayList<Message>> sendMessageDB = new ConcurrentHashMap<>();
    public static ConcurrentHashMap<Integer, CopyOnWriteArrayList<Message>> receiveMessageDB = new ConcurrentHashMap<>();
    public static Long onlineAccount = 0L;
    public static Long onlineDoctor = 0L;
    public static Long onlineAdmin = 0L;
}
