package vn.topica.itlab4.utils;

import com.google.gson.Gson;
import vn.topica.itlab4.bean.ApiPacket;
import vn.topica.itlab4.bean.Student;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;


public class Utils
{
	private static Random r = new Random();
	private static SimpleDateFormat sdf =
			new SimpleDateFormat(Constant.DATE_FORMAT);
	
	/**
	 * This method generate random student
	 * within @value minStudent and @valuemaxStudent
	 *
	 * @return a map of list Student
	 */
	public static Map<Integer, Student> generateStudent()
	{
		int n = r.nextInt(Constant.maxStudent - Constant.minStudent + 1) +
				Constant.minStudent;
		Map<Integer, Student> students = new HashMap<>();
		Student s;
		int lengthName = Constant.NAMES.length;
		for (int i = 0; i < n; i++)
		{
			s = new Student();
			s.setId(i + 1);
			s.setName(Constant.NAMES[r.nextInt(lengthName)]);
			s.setBirthday(nextBirthday());
			s.setGender(r.nextInt(3));
			s.setEnrollDate(nextEnrollDate());
			students.put(i + 1, s);
		}
		
		return students;
	}
	
	/**
	 * This method to generate a Date for birthday within
	 * max date and min date by timestamp in second
	 * Default min date: 01/01/1996
	 * Default max date: 31/12/2000
	 *
	 * @return random date
	 */
	private static Date nextBirthday()
	{
		String minDate = Constant.MIN_BIRTHDAY_DATE;
		String maxDate = Constant.MAX_BIRTHDAY_DATE;
		return nextDate(minDate, maxDate);
	}
	
	/**
	 * This method to generate a Date for enroll date within
	 * max date and min date by timestamp in second
	 * Default min date: 01/01/2018
	 * Default max date: 31/12/2019
	 *
	 * @return random date
	 */
	private static Date nextEnrollDate()
	{
		String minDate = Constant.MIN_ENROLL_DATE;
		String maxDate = Constant.MAX_ENROLL_DATE;
		return nextDate(minDate, maxDate);
	}
	
	
	/**
	 * This method to generate a Date within
	 * max date and min date by String value
	 *
	 * @return random date
	 */
	private static Date nextDate(String minDate, String maxDate)
	{
		Date d1 = new Date();
		Date d2 = new Date();
		try
		{
			d1 = sdf.parse(minDate);
			d2 = sdf.parse(maxDate);
		}
		catch (ParseException ignored)
		{
		}
		
		int min = (int) (d1.getTime() / 1000);
		int max = (int) (d2.getTime() / 1000);
		long timestamp = (r.nextInt(max - min + 1) + min) * 1000L;
		return new Date(timestamp);
	}
	
	/**
	 * This method create result to send result for api
	 *
	 * @param method is name of api
	 * @param code   is status of result
	 * @param datas  is list object to return
	 * @return object ApiPacket to Client
	 */
	public static ApiPacket getPackets(String method, int code, Object datas)
	{
		ApiPacket packet = new ApiPacket();
		
		packet.setMethod(method);
		packet.setCode(code);
		packet.setDatas(datas);
		
		return packet;
	}
	
	public static void sendResult(HttpServletResponse resp, ApiPacket packet)
	{
		resp.setContentType("application/json; charset=UTF-8");
		resp.setCharacterEncoding("UTF-8");
		PrintWriter out = null;
		try
		{
			out = resp.getWriter();
			String json = new Gson().toJson(packet);
			out.print(json);
			out.flush();
			out.close();
		}
		catch (IOException e)
		{
			e.printStackTrace();
		}
	}
}
