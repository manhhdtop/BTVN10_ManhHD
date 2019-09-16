package vn.topica.itlab4.bean;

import vn.topica.itlab4.utils.Constant;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * This class is entity class to save information of Student
 *
 */

public class Student
{
	private int id;
	private String name;
	private Date birthday;
	private int gender;
	private Date enrollDate;
	
	private static SimpleDateFormat sdf =
			new SimpleDateFormat(Constant.DATE_FORMAT);
	
	public Student()
	{
		this.id = -1;
		this.name = "";
		this.birthday = new Date();
		this.gender = 1;
		this.enrollDate = new Date();
	}
	
	public Student(int id, String name, Date birthday, int gender, Date enrollDate)
	{
		this.id = id;
		this.name = name;
		this.birthday = birthday;
		this.gender = gender;
		this.enrollDate = enrollDate;
	}
	
	public Student(int id, String name, String birthday, int gender,
			String enrollDate)
	{
		this.id = id;
		this.name = name;
		try
		{
			this.birthday = sdf.parse(birthday);
		}
		catch (ParseException e)
		{
			this.birthday = new Date();
		}
		this.gender = gender;
		try
		{
			this.enrollDate = sdf.parse(enrollDate);
		}
		catch (ParseException e)
		{
			this.enrollDate = new Date();
		}
	}
	
	public int getId()
	{
		return id;
	}
	
	public void setId(int id)
	{
		this.id = id;
	}
	
	public String getName()
	{
		return name;
	}
	
	public void setName(String name)
	{
		this.name = name;
	}
	
	public Date getBirthday()
	{
		return birthday;
	}
	
	public String getBirthdayToString()
	{
		return sdf.format(birthday);
	}
	
	public void setBirthday(Date birthday)
	{
		this.birthday = birthday;
	}
	
	public void setBirthday(String birthday)
	{
		try
		{
			this.birthday = sdf.parse(birthday);
		}
		catch (ParseException e)
		{
			this.birthday = new Date();
		}
	}
	
	public int getGender()
	{
		return gender;
	}
	
	public String getGenderToString()
	{
		switch (this.gender)
		{
			case Constant.FEMALE:
				return "Nữ";
			case Constant.MALE:
				return "Nam";
			case Constant.OTHER:
				return "Khác";
			default:
				return "";
		}
	}
	
	public void setGender(int gender)
	{
		this.gender = gender;
	}
	
	public String getEnrollDateToString()
	{
		return sdf.format(enrollDate);
	}
	
	public Date getEnrollDate()
	{
		return enrollDate;
	}
	
	public void setEnrollDate(Date enrollDate)
	{
		this.enrollDate = enrollDate;
	}
	
	public void setEnrollDate(String enrollDate)
	{
		try
		{
			this.enrollDate = sdf.parse(enrollDate);
		}
		catch (ParseException e)
		{
			this.enrollDate = new Date();
		}
	}
}
