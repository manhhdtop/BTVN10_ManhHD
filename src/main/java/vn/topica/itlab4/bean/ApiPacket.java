package vn.topica.itlab4.bean;

/**
 * This class is an object result of api
 * variable method is name of api
 * variable code is status of api
 * variable message is message of api
 * variable datas is list object to return for api
 */
public class ApiPacket
{
	private String method;
	private int code;
	private String message;
	private Object datas;
	
	public String getMethod()
	{
		return method;
	}
	
	public void setMethod(String method)
	{
		this.method = method;
	}
	
	public int getCode()
	{
		return code;
	}
	
	public void setCode(int code)
	{
		this.code = code;
	}
	
	public String getMessage()
	{
		return message;
	}
	
	public void setMessage(String message)
	{
		this.message = message;
	}
	
	public Object getDatas()
	{
		return datas;
	}
	
	public void setDatas(Object datas)
	{
		this.datas = datas;
	}
}
