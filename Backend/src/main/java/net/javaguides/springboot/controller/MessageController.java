package net.javaguides.springboot.controller;

import net.javaguides.springboot.memoryDB.Message;
import net.javaguides.springboot.memoryDB.MemoryDB;
import net.javaguides.springboot.model.Appointment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/message")
public class MessageController
{
    private MemoryDB memoryDB = new MemoryDB();

    @GetMapping("/receive/{id}")
    public List<Message> getAllReceiveMassageByAccountId(@PathVariable int id)
    {
        List<Message> tmp = memoryDB.receiveMessageDB.get(id);
        if(tmp == null)
        {
            memoryDB.receiveMessageDB.put(id, new CopyOnWriteArrayList<Message>());
        }
        return memoryDB.receiveMessageDB.get(id);
    }
    @GetMapping("/send/{id}")
    public List<Message> getAllSendMassageByAccountId(@PathVariable int id)
    {
        List<Message> tmp = memoryDB.sendMessageDB.get(id);
        if(tmp == null)
        {
            memoryDB.sendMessageDB.put(id, new CopyOnWriteArrayList<Message>());
        }
        return memoryDB.sendMessageDB.get(id);
    }

    @GetMapping("/delete/{id}/receive/{m_id}")
    public List<Message> deleteReceiveMassageByAccountId(@PathVariable int id, @PathVariable String m_id)
    {
        for( Message m :memoryDB.receiveMessageDB.get(id))
        {
            if(m.id.equals(m_id))
            {
                memoryDB.receiveMessageDB.get(id).remove(m);
                break;
            }
        }
        return memoryDB.receiveMessageDB.get(id);
    }

    @GetMapping("/delete/{id}/send/{m_id}")
    public List<Message> deleteSendMassageByAccountId(@PathVariable int id, @PathVariable String m_id)
    {
        for( Message m :memoryDB.sendMessageDB.get(id))
        {
            if(m.id.equals(m_id))
            {
                memoryDB.sendMessageDB.get(id).remove(m);
                break;
            }
        }
        return memoryDB.sendMessageDB.get(id);
    }

    @PostMapping("/add/{id1}/to/{id2}")
    public ResponseEntity<Message> addReceiveMassageByAccountId(@PathVariable int id1, @PathVariable int id2, @RequestBody Message message)
    {
        if(memoryDB.sendMessageDB.get(id1) == null)
        {
            memoryDB.sendMessageDB.put(id1, new CopyOnWriteArrayList<Message>());
        }
        memoryDB.sendMessageDB.get(id1).add(message);

        if(memoryDB.receiveMessageDB.get(id2) == null)
        {
            memoryDB.receiveMessageDB.put(id2, new CopyOnWriteArrayList<Message>());
        }
        memoryDB.receiveMessageDB.get(id2).add(message);
        return ResponseEntity.ok(message);

    }




}
