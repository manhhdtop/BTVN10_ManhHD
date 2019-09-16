<%--
  User: ManhHd
  Date: 10/09/2019
--%>
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
		<div class="container">
			<header class="row bg-light">
				<div class="col-12 p-4 text-center">
					<h2 class="text-primary">Quản lý sinh viên</h2>
				</div>
			</header>

			<section class="row main">
				<div class="col-12 p-2 border rounded">
					<div class="col-12">
						<div class="row justify-content-between">
							<div class="col-9 bg-primary p-1">
								<h3>Danh sách sinh viên</h3>
							</div>
							<div class="col-3 bg-primary text-right p-3">
								<span id="insert-button" class="btn"
								      role="button">
									<i class="fas fa-plus-circle text-white"></i>
								</span>
								<span id="filter-button" class="btn"
								      role="button">
									<i class="fas fa-filter text-white"></i>
								</span>
							</div>
						</div>
					</div>
					<div class="col-12 py-3 filter-block"
					     id="filter-block" data-id="0">
						<label for="filter-keyword"></label>
						<input type="text" class="form-control"
						       id="filter-keyword"
						       placeholder="Tìm kiếm sinh viên"/>
					</div>
					<table id="container"
					       class="table table-bordered">

					</table>
					<div id="table">

					</div>
				</div>
			</section>

			<footer class="row bg-dark p-3">
				<div class="col-12 text-center">
					<div class="copyright_text text-center">
						Copyright &copy;
						<jsp:useBean id="date" class="java.util.Date"/>
						<fmt:formatDate value="${date}" pattern="yyyy"/>
						All rights reserved
					</div>
				</div>
			</footer>
		</div>
		<!-- Modal -->
		<div class="modal fade" id="delete-modal" tabindex="-1" role="dialog"
		     aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title">Bạn có chắc không?</h5>
						<button type="button" class="close" data-dismiss="modal"
						        aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body"> Bạn có chắc xóa sinh viên này
						không. Dữ liệu sau
						khi xóa sẽ không thể khôi phục.
					</div>
					<div class="modal-footer">
						<button class="btn btn-secondary"
						        data-dismiss="modal">Không
						</button>
						<button id="deleteBtn"
						        class="btn btn-danger">
							Đồng ý
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- Modal -->
		<div class="modal fade" id="update-modal" tabindex="-1" role="dialog"
		     aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="title">Cập nhật</h5>
						<button type="button" class="close" data-dismiss="modal"
						        aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body">
						<form>
							<div class="form-group">
								<label for="id">ID</label>
								<input class="form-control" id="id" readonly
								       placeholder="Nhập id...">
							</div>
							<div class="form-group">
								<label for="name">Tên sinh viên</label>
								<input class="form-control" id="name"
								       placeholder="Nhập họ tên...">
							</div>
							<div class="form-group">
								<label for="birthdayPicker">Ngày sinh</label>
								<input class="form-control"
								       id="birthdayPicker" type="text"
								       placeholder="Nhập ngày sinh...">
							</div>
							<div class="form-group">
								<label for="gender">Giới tính</label>
								<select id="gender" class="form-control">
									<option value="1">Nam</option>
									<option value="0">Nữ</option>
									<option value="2">Khác</option>
								</select>
							</div>
							<div class="form-group">
								<label for="enrollDatePicker">Ngày nhập học
								</label>
								<input class="form-control"
								       id="enrollDatePicker"
								       type="text"
								       placeholder="Chọn ngày nhập học">
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<button class="btn btn-secondary"
						        data-dismiss="modal">Hủy
						</button>
						<button id="updateBtn"
						        class="btn btn-primary">
							Thêm mới
						</button>
					</div>
				</div>
			</div>
		</div>
		<script type="text/javascript"
		        src="${pageContext.request.contextPath}/resource/js/jquery.3.2.1.min.js"></script>
		<script type="text/javascript"
		        src="${pageContext.request.contextPath}/resource/js/jquery-ui.min.js"></script>
		<script type="text/javascript"
		        src="${pageContext.request.contextPath}/resource/js/pagination.min.js"></script>
		<script type="text/javascript"
		        src="${pageContext.request.contextPath}/resource/js/bootstrap.min.js"></script>
		<script type="text/javascript"
		        src="${pageContext.request.contextPath}/resource/js/alert.js"></script>
		<script type="text/javascript"
		        src="${pageContext.request.contextPath}/resource/js/main.js"></script>
	</body>
</html>
