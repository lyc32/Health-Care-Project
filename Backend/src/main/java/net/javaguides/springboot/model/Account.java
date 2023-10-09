package net.javaguides.springboot.model;

import jakarta.persistence.*;

@Entity
@Table(name = "accounts")
public class Account {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private long id;
	@Column(name = "first_name")
	private String firstName;
	@Column(name = "last_name")
	private String lastName;
	@Column(name = "email_id")
	private String emailId;
	@Column(name = "phone")
	private String phone;
	@Column(name = "password")
	private String password;
	@Column(name = "gender")
	private String gender;
	@Column(name = "birthday")
	private String birthday;
	@Column(name = "details")
	private String details;

	@Column(name = "photo")
	private String photo;

	@Column(name = "type")
	private String type;
	/****************************************************/
	@Column(name = "subtype")
	private String subtype;
	/****************************************************/

	public Account() {
		// Default constructor required by JPA
	}

	/****************************************************/
	public Account(long id, String firstName, String lastName, String emailId, String phone, String password, String gender, String birthday, String details, String photo, String type, String subtype) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.emailId = emailId;
		this.phone = phone;
		this.password = password;
		this.gender = gender;
		this.birthday = birthday;
		this.details = details;
		this.photo = photo;
		this.type = type;
		this.subtype = subtype;
	}
	/****************************************************/

	// Getters and setters (including the ID getter)

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getBirthday() {
		return birthday;
	}

	public void setBirthday(String birthday) {
		this.birthday = birthday;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	/****************************************************/
	public String getSubtype() {
		return subtype;
	}

	public void setSubtype(String subtype) {
		this.subtype = subtype;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public void merge(Account account)
	{
		if(account.emailId != null)
		{
			this.emailId = account.emailId;
		}

		if(account.phone != null)
		{
			this.phone = account.phone;
		}

		if(account.gender != null)
		{
			this.gender = account.gender;
		}

		if(account.birthday != null)
		{
			this.birthday = account.birthday;
		}

		if(account.password != null)
		{
			this.password = account.password;
		}
		if(account.subtype != null)
		{
			this.subtype = account.subtype;
		}
		if(account.details != null)
		{
			this.details = account.details;
		}

		if(account.photo != null)
		{
			this.photo = account.photo;
		}
	}

	@Override
	public String toString() {
		return "Account{" +
				"id=" + id +
				", firstName='" + firstName + '\'' +
				", lastName='" + lastName + '\'' +
				", emailId='" + emailId + '\'' +
				", phone='" + phone + '\'' +
				", password='" + password + '\'' +
				", gender='" + gender + '\'' +
				", birthday='" + birthday + '\'' +
				", details='" + details + '\'' +
				", photo='" + photo + '\'' +
				", type='" + type + '\'' +
				", subtype='" + subtype + '\'' +
				'}';
	}
	/****************************************************/
}
