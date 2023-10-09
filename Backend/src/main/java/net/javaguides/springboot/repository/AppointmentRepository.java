package net.javaguides.springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.javaguides.springboot.model.Account;
import net.javaguides.springboot.model.Appointment;

/***********************************/
import org.springframework.data.jpa.repository.Query;
/***********************************/

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long>{
	List<Appointment> findByDate(String date);
	List<Appointment> findByPersonId(Long person_Id);
	List<Appointment> findByPersonIdAndDate(Long person_Id, String date);
	List<Appointment> findByPersonIdAndDoctorId(Long person_Id, Long doctor_Id);
	List<Appointment> findByDoctorId(Long doctor_Id);
	List<Appointment> findByDoctorIdAndDate(Long doctor_Id,String date);

	/***********************************/
	@Query(value = "select * from appointments where if(?1 != -1, doctor_id=?1,1=1) and if(?2 !='',doctor_name=?2,1=1)"+
			" and if(IFNULL(?3,'') !='',person_name=?3,1=1) and if(IFNULL(?4,'') !='',date=?4,1=1)  and if(IFNULL(?5,'') !=-1,time=?5,1=1)  and if(IFNULL(?6,'') !=-1,fee=?6,1=1) ",nativeQuery = true)
	List<Appointment> search(Long doctor_id, String doctor_name, String person_name, String date, Long time, Long fee);
	/***********************************/
}
