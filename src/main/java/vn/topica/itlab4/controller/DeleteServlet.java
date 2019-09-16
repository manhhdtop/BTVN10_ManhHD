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
 * This servlet is controller to process api request url '/delete' to delete
 * a student
 */
@WebServlet(urlPatterns = "/delete")
public class DeleteServlet extends HttpServlet
{
	/**
	 * Method doGet() to process get request
	 * Method get ID parameter from request send it to Model to delete an
	 * student
	 */
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
	{
		String id = req.getParameter("id");
		ApiPacket packet;
		try
		{
			StudentModel.delete(Integer.parseInt(id));
			packet = Utils.getPackets("Delete Student", 200,
					"Delete student " + id + " successful.");
		}
		catch (NumberFormatException e)
		{
			packet = Utils.getPackets("Delete Student", 404,
					"Delete student " + id + " not exist.");
		}
		Utils.sendResult(resp, packet);
	}
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException
	{
		super.doPost(req, resp);
	}
}
