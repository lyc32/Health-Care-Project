package net.javaguides.springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.javaguides.springboot.model.Account;
import net.javaguides.springboot.model.Appointment;


@Repository
public interface AccountRepository extends JpaRepository<Account, Long>{
	List<Account> findByType(String type);
	List<Account> findByEmailIdAndPassword(String emailId, String password);
	List<Account> findBySubtype(String subType);
	
}
