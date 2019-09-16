package vn.topica.itlab4.model;

import vn.topica.itlab4.bean.Student;
import vn.topica.itlab4.utils.Utils;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Map;

/**
 * This class is Model, it has some method and a field:
 *
 * @Field students is a Map of student to save list Student by key is ID of
 * student
 * @Method getStudents() to return list student
 * @Method delete() to delete a student
 * @Method update() to add or edit an student
 */
public class StudentModel
{
	/**
	 * Map student save list student
	 */
	private static Map<Integer, Student> students = Utils.generateStudent();
	
	/**
	 * This method to convert map to students, sort them by id and return them
	 *
	 * @return ArrayList of map students
	 */
	public synchronized static ArrayList<Student> getStudents()
	{
		ArrayList<Student> result = new ArrayList<>(students.values());
		result.sort(Comparator.comparingInt(Student::getId));
		return result;
	}
	
	/**
	 * This method delete a student from map students by ID
	 *
	 * @param id is id of student need to delete from map students
	 */
	public synchronized static void delete(int id)
	{
		students.remove(id);
	}
	
	/**
	 * This method add new student or edit information of a student
	 * if student has in map student @param s wil replace same student in map
	 * else put it to map
	 *
	 * @param s is student to update
	 */
	public synchronized static void update(Student s)
	{
		students.put(s.getId(), s);
	}
}
