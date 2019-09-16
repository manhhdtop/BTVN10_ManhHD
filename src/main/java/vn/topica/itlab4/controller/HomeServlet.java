package vn.topica.itlab4.controller;

import vn.topica.itlab4.bean.ApiPacket;
import vn.topica.itlab4.model.StudentModel;
import vn.topica.itlab4.utils.Utils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * This servlet is controller to process api request url '/get-student' to
 * get list student
 */
@WebServlet(urlPatterns = "/get-student")
public class HomeServlet extends HttpServlet
{
	/**
	 * Method doGet() to process get request
	 * Method get list student from Model and send it to client
	 */
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
	{
		ApiPacket packet = Utils.getPackets("Get list Student", 200, "Get " +
						"list Student successful",
				StudentModel.getStudents());
		Utils.sendResult(resp, packet);
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
	{
		doGet(req, resp);
	}
}
