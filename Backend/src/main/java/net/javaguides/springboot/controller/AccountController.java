package net.javaguides.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.javaguides.springboot.memoryDB.MemoryDB;
import net.javaguides.springboot.model.Appointment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.Account;
import net.javaguides.springboot.repository.AccountRepository;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class AccountController
{

	private MemoryDB memoryDB = new MemoryDB();

	@Autowired
	private AccountRepository accountRepository;

	@GetMapping("/accounts")
	public List<Account> getAllaccounts(){
		return accountRepository.findAll();
	}
	@GetMapping("/accounts/doctors")
	public List<Account> getAllDoctoraccounts(){
		String doctorType = "Doctor";
        return accountRepository.findByType(doctorType);
	}	
	
	@PostMapping("/accounts/doctors/type")
	public List<Account> getDoctorsBySubType(String subtype)
	{
		return accountRepository.findBySubtype(subtype);
	}

	@PostMapping("/accounts")
	public ResponseEntity<Account> createAccount(@RequestBody Account account)
	{
		Account newAccount = accountRepository.save(account);
		return ResponseEntity.ok(newAccount);
	}
	
	
	@GetMapping("/accounts/{id}")
	public ResponseEntity<Account> getaccountById(@PathVariable Long id) {
		Account account = accountRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("account not exist with id :" + id));
		return ResponseEntity.ok(account);
	}
	
	 
	
	@PutMapping("/accounts/{id}")
	public ResponseEntity<Account> updateaccount(@PathVariable Long id, @RequestBody Account accountDetails){
		Account account = accountRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("account not exist with id :" + id));
		//account.setFirstName(accountDetails.getFirstName());
		//account.setLastName(accountDetails.getLastName());
		//account.setEmailId(accountDetails.getEmailId());
		account.merge(accountDetails);
		System.out.println(accountDetails);
		Account updatedaccount = accountRepository.save(account);
		return ResponseEntity.ok(updatedaccount);
	}
	
	
	@DeleteMapping("/accounts/{id}")
	public String deleteaccount(@PathVariable Long id){
		Account account = accountRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("account not exist with id :" + id));
		
		accountRepository.delete(account);
		return "deleted";
	}

	@PostMapping("/accounts/login")
	public ResponseEntity<Account> login(String email, String password)
	{
		List<Account> accountList = accountRepository.findByEmailIdAndPassword(email,password);
		if(accountList.size() != 1)
		{
			return ResponseEntity.ok(null);
		}
		else
		{
			if(accountList.get(0).getType().equals("DOCTOR"))
			{
				memoryDB.onlineDoctorList.add(accountList.get(0));
			}
			return ResponseEntity.ok(accountList.get(0));
		}
	}

	@PostMapping("/accounts/logout")
	public String logOut(String email, String password)
	{
		List<Account> accountList = accountRepository.findByEmailIdAndPassword(email,password);
		if(accountList.size() != 1)
		{
			return "failed";
		}
		else
		{
			for (Account a: memoryDB.onlineDoctorList)
			{
				if(a.getId() == accountList.get(0).getId())
				{
					memoryDB.onlineDoctorList.remove(a);
				}
			}
			return "success";
		}
	}

	@PostMapping("/accounts/search")
	public List<Account> searchAccount(Long id, String firstName, String lastName, String  emailId, String  phone, String  birthday, String  gender, String type)
	{
		return accountRepository.search(id, firstName, lastName, emailId, phone, birthday, gender, type);
	}

	@GetMapping("/accounts/doctors/online")
	public List<Account> getOnlineAccounts()
	{
		return memoryDB.onlineDoctorList;
	}
}
