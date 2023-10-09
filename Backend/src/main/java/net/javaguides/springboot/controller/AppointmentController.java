package net.javaguides.springboot.controller;

import java.util.List;

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
import net.javaguides.springboot.model.Appointment;

import net.javaguides.springboot.repository.AppointmentRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class AppointmentController {
	@Autowired
	private AppointmentRepository appointmentRepository;


	@GetMapping("/appointments")
	public List<Appointment> getAllAppointment(){
		return appointmentRepository.findAll();
	}
	@GetMapping("/appointments/date/{date}")
	public List<Appointment> getAllAppointmentByDate(@PathVariable String date){
		return appointmentRepository.findByDate(date);
	}
	@GetMapping("/appointments/person/{person_id}")
	public List<Appointment> getAllAppointmentByPersonId(@PathVariable Long person_id){
		return appointmentRepository.findByPersonId(person_id);
	}
	@GetMapping("/appointments/person/date/{person_id}/{date}")
	public List<Appointment> getAllAppointmentByPersonIdAndDate(@PathVariable Long person_id,@PathVariable String date){
		return appointmentRepository.findByPersonIdAndDate(person_id, date);
	}
	@GetMapping("/appointments/person/doctor/{personId}/{doctorId}")
	public List<Appointment> getAllAppointmentByPersonIdAndDoctorId(@PathVariable Long personId,@PathVariable Long doctorId){
		return appointmentRepository.findByPersonIdAndDoctorId(personId, doctorId);
	}
	@GetMapping("/appointments/doctor/{doctorId}")
	public List<Appointment> getAllAppointmentByDoctorId(@PathVariable Long doctorId){
		return appointmentRepository.findByDoctorId(doctorId);
	}
	@GetMapping("/appointments/doctor/date/{doctor_Id}/{date}")
	public List<Appointment> getAllAppointmentByDoctorIdAndDate(@PathVariable Long doctor_Id, @PathVariable String date){
		return appointmentRepository.findByDoctorIdAndDate(doctor_Id, date);
	}


	@PostMapping("/appointments")
	public Appointment createAppointment(@RequestBody Appointment appointment)
	{
		return appointmentRepository.save(appointment);
	}


	@GetMapping("/appointments/appointment/{id}")
	public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {
		Appointment appointment = appointmentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Appointment not exist with id :" + id));
		return ResponseEntity.ok(appointment);
	}



	@PutMapping("/appointments/{id}")
	public ResponseEntity<Appointment> updateAppointment(@PathVariable Long id, @RequestBody Appointment appointmentDetails){
		Appointment appointment = appointmentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Appointment not exist with id :" + id));
		//appointment.setDoctorId(appointmentDetails.getDoctorId());
		//appointment.setDoctor_name(appointmentDetails.getDoctor_name());
		//appointment.setFee(appointmentDetails.getFee());
		//appointment.setPersonId(appointmentDetails.getPersonId());
		//appointment.setPerson_name(appointmentDetails.getPerson_name());
//
		//appointment.setTime(appointmentDetails.getTime());
		//appointment.setDate(appointmentDetails.getDate());

		appointment.merge(appointmentDetails);

		Appointment updatedappointmentDetails = appointmentRepository.save(appointment);
		return ResponseEntity.ok(updatedappointmentDetails);
	}


	@DeleteMapping("/appointments/{id}")
	public String deleteAppointment(@PathVariable Long id){
		System.out.println(id);
		Appointment appointment = appointmentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Appointment not exist with id :" + id));

		appointmentRepository.delete(appointment);
		return "deleted";
	}

	@PostMapping("/appointments/search")
	public List<Appointment> searchAppintment(Long doctorId, String doctorName, String personName, String date, Long time, Long fee)
	{
		return appointmentRepository.search(doctorId, doctorName, personName, date, time, fee);
	}

}
