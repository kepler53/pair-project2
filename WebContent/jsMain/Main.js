

  $(document).ready(function(){
		
	  	//db가 존재한다면
	  
	  	//궁금한 점 모든 화면에서 login 유지하려면???
		
		
		//2. login submit 부분 파트
		$('#login-btn').click(function() {
			$.ajax({
				url :'jsMain/userlist.jsp',
				type : 'GET',
				dataType : 'xml',
				success: function(response){
					checkLogin(response);
				}	
			});
		});
  
  		function checkLogin(response){
  			
  				//id : login-id,login-pwd
				let id = $('#login-id').val();
				let pwd = $('#login-pwd').val();
				
//				console.log("뭘까?")
				
// 				console.log(id);
// 				console.log(pwd);
  			
  			$(response).find('user').each(function(index,item){
  				var dbId = $(this).find('id').text();
  				var dbPwd = $(this).find('password').text();
  				
 
  				if(id==dbId && pwd==dbPwd){
  					alert('로그인 성공');
  					// 궁금한 점 break로 each문 못 빠져나가나?
  					//해야할 것 : logout button 만들고 login, Signup의 css invisible로 만들기
  					$('.login').css('display','none');
  					$('.logout').css('display','inline-block');
  					$('.user').text(dbId+'님 환영합니다.');
  					$('.user').css('color','white');
  					return false;
  				}
  				
  			});
  		}
		
  		//3. 로그아웃 버튼 만들기
  		$('#btn-logout').click(function() {
				$('.logout').css('display','none');
				$('.login').css('display','inline-block');
  		})
	
//  		//4. 검색 을 누르면 다른 html로 넘어가야한다.
//  		$('#btn-search').click(function(){
//  			//사용자의 이름을 가져오고 작성 제목,작성 내용을 넘긴다. 이후에 DB에 저장
//  		});
  		
  		// 등록 버튼 누를 시 회원가입
  		$('#enroll-btn').click(function() {
  			alert('회원가입되었습니다.')
  		})
  		
  		
  		//
  		$('#btn-search').on('click', function() {
  			
  			window.open('http://localhost:8080/0312_pair_project/searchResult.html');


  		});
  		
  		// 비밀번호 길이 체크
		$('#pwd').keyup(function() {
//			if($(this).val()=='' || $(this).val().length==0){
//				$('#pw-msg').text('패스워드를 입력하세요');
//				$('#pw-msg').css('color', 'red');
//			}else if($(this).val().length<4){
//				$('#pw-msg').text('안전도 낮음');
//				$('#pw-msg').css('color', 'red');
//			}else{
//				$('#pw-msg').text('안전도 높음');
//				$('#pw-msg').css('color', 'green');
//			}
			
			
			
			 var pw = $("#pwd").val();
			 var num = pw.search(/[0-9]/g);
			 var eng = pw.search(/[a-z]/ig);
			 var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

			 if(pw.length < 8 || pw.length > 20){
				 $('#pw-msg').text('길이가 너무 길거나 짧습니다.');
				 $('#pw-msg').css('color', 'red');
				 return false;
			 }else if(pw.search(/\s/) != -1){
				 $('#pw-msg').text("비밀번호는 공백 없이 입력해주세요.");
				 $('#pw-msg').css('color', 'blue');
				 return false;
			 }else if(num < 0 || eng < 0 || spe < 0 ){
				 $('#pw-msg').text("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
				 $('#pw-msg').css('color', 'blue');
				 return false;
			 }else {
				 $('#pw-msg').text("사용가능합니다."); 
				 $('#pw-msg').css('color', 'green');
			    return true;
			 }
			
			
			
			
		})
		

		//비밀번호 체크
		$('#btn-find-pwd').click(function() {
			
			$.ajax({
				url :'jsMain/userlist.jsp',
				type : 'GET',
				dataType : 'xml',
				success: function(response){
					checkPwd(response);
				}	
			});
		});
  
		function checkPwd(response){
			let id = $('#pwd-find').val();
			
  			$(response).find('user').each(function(index,item){
  				var dbId = $(this).find('id').text();
  				var dbPwd = $(this).find('password').text();
  				if(id==dbId){
  					alert('비밀번호는'+dbPwd+'입니다.');
  					return false;
  				}
  				//존재하지않으면 아예 존재하지 창이 아예 닫힌다.
  			});
			
			
		}
  		
  		
  		
  		
  		
	});
