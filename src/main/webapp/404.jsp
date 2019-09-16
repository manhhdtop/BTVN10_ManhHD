<%@ page contentType="text/html;charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>

<html>
	<head>
		<title>Student Management by Takatori</title>
		<meta charset="utf-8">
		<link rel="icon" type="image/x-icon"
		      href="${pageContext.request.contextPath}/resource/icon/favicon.png">
		<link rel="stylesheet" type="text/css"
		      href="${pageContext.request.contextPath}/resource/css/bootstrap.min.css"/>
		<link rel="stylesheet" type="text/css"
		      href="${pageContext.request.contextPath}/resource/css/jquery-ui.min.css"/>
		<link rel="stylesheet" type="text/css"
		      href="${pageContext.request.contextPath}/resource/css/all.min.css">
		<link rel="stylesheet" type="text/css"
		      href="${pageContext.request.contextPath}/resource/css/style.css">
	</head>
	<body>
		<section class="page_error">
			<div class="container">
				<div class="row">
					<div class="page_error_iner">
						<div class="page_error_item">
							<div class="error mx-auto" data-text="404">404</div>
							<div class="mb-4 lead">Trang web bạn yêu cầu không
								tồn tại
								hoặc đã bị xóa.
							</div>
							<a href="/" class="btn btn-link">Quay về Trang chủ
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	</body>
</html>
