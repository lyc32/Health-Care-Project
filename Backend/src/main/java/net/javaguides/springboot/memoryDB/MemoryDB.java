package net.javaguides.springboot.memoryDB;

import net.javaguides.springboot.model.Account;

import java.util.List;
import java.util.concurrent.*;

public class MemoryDB
{
    public static ConcurrentHashMap<Integer, CopyOnWriteArrayList<Message>> sendMessageDB = new ConcurrentHashMap<>();
    public static ConcurrentHashMap<Integer, CopyOnWriteArrayList<Message>> receiveMessageDB = new ConcurrentHashMap<>();
    public static CopyOnWriteArrayList<Account> onlineDoctorList = new CopyOnWriteArrayList<>();
}
