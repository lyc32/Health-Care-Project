package net.javaguides.springboot.model;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity
@Table(name = "appointments")
public class Appointment {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
	private Long id;
	@Column(name = "doctor_id")
	private Long doctorId;
	@Column(name = "doctor_name")
	private String doctor_name;
	@Column(name = "person_id")
	private Long personId;
	@Column(name = "person_name")
	private String person_name;
	@Column(name = "fee")
	private Long fee;
	@Column(name="date")
	private String date;
	@Column(name = "time")
	private Long time;
	@Column(name = "details")
	private String details;

	public Appointment() {
	}

	public Appointment(Long id, Long doctorId, String doctor_name, Long personId, String person_name, Long fee, String date, Long time, String details) {
		this.id = id;
		this.doctorId = doctorId;
		this.doctor_name = doctor_name;
		this.personId = personId;
		this.person_name = person_name;
		this.fee = fee;
		this.date = date;
		this.time = time;
		this.details = details;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(Long doctorId) {
		this.doctorId = doctorId;
	}

	public String getDoctor_name() {
		return doctor_name;
	}

	public void setDoctor_name(String doctor_name) {
		this.doctor_name = doctor_name;
	}

	public Long getPersonId() {
		return personId;
	}

	public void setPersonId(Long personId) {
		this.personId = personId;
	}

	public String getPerson_name() {
		return person_name;
	}

	public void setPerson_name(String person_name) {
		this.person_name = person_name;
	}

	public Long getFee() {
		return fee;
	}

	public void setFee(Long fee) {
		this.fee = fee;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public Long getTime() {
		return time;
	}

	public void setTime(Long time) {
		this.time = time;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	@Override
	public String toString() {
		return "Appointment{" +
				"id=" + id +
				", doctorId=" + doctorId +
				", doctor_name='" + doctor_name + '\'' +
				", personId=" + personId +
				", person_name='" + person_name + '\'' +
				", fee=" + fee +
				", date='" + date + '\'' +
				", time=" + time +
				", details='" + details + '\'' +
				'}';
	}

	public void merge(Appointment appointment)
	{
		if(appointment.date != null)
		{
			this.date = appointment.date;
		}

		if(appointment.time != null)
		{
			this.time = appointment.time;
		}

		if(appointment.details != null)
		{
			this.details = appointment.details;
		}
	}
}
