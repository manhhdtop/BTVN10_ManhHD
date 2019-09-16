package vn.topica.itlab4.controller;

import vn.topica.itlab4.bean.ApiPacket;
import vn.topica.itlab4.bean.Student;
import vn.topica.itlab4.model.StudentModel;
import vn.topica.itlab4.utils.Utils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

/**
 * This servlet is controller to process api request url '/edit' to edit
 * information of a student
 */
@WebServlet(urlPatterns = "/edit")
public class EditServlet extends HttpServlet
{
	/**
	 * Method doGet() to process get request
	 * Method get parameters from request, after convert them to Student
	 * class send it to Model to update student information
	 */
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
	{
		ApiPacket packet;
		try
		{
			Student s = new Student();
			s.setId(Integer.parseInt(req.getParameter("id")));
			String name = req.getParameter("name");
			byte[] bytes = name.getBytes(StandardCharsets.ISO_8859_1);
			name = new String(bytes, StandardCharsets.UTF_8);
			s.setName(name);
			s.setBirthday(req.getParameter("birthday"));
			s.setGender(Integer.parseInt(req.getParameter("gender")));
			s.setEnrollDate(req.getParameter("enrollDate"));
			StudentModel.update(s);
			packet = Utils.getPackets("Edit Student", 200,
					"Edit student successful.");
		}
		catch (NumberFormatException e)
		{
			System.out.println("ID: " + req.getParameter("id"));
			packet = Utils.getPackets("Edit Student", 404,
					"Student not exist");
		}
		Utils.sendResult(resp, packet);
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
	{
		doGet(req, resp);
	}
}
