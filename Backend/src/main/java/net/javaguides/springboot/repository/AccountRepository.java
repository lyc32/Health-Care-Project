package net.javaguides.springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import net.javaguides.springboot.model.Account;
import net.javaguides.springboot.model.Appointment;


@Repository
public interface AccountRepository extends JpaRepository<Account, Long>{
	List<Account> findByType(String type);
	List<Account> findByEmailIdAndPassword(String emailId, String password);
	List<Account> findBySubtype(String subType);

	/***********************************/
	@Query(value = "select * from accounts where if(?1 != -1, id=?1,1=1) and if(IFNULL(?2,'') !='',first_name=?2,1=1) and if(IFNULL(?3,'') !='',last_name=?3,1=1)  and if(IFNULL(?4,'') !='',email_id=?4,1=1)  and if(IFNULL(?5,'') !='',phone=?5,1=1) and if(IFNULL(?6,'') !='',birthday=?6,1=1) and if(IFNULL(?7,'') !='',gender=?7,1=1) and if(IFNULL(?8,'') !='', type=?8,1=1)",nativeQuery = true)
	List<Account> search(Long id, String first_name, String last_name, String email_id, String phone, String birthday, String gender, String type);
	/***********************************/
	
}
